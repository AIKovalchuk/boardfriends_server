import { PrismaClient } from "@prisma/client";
import EventDto from "../dto/event";
import { IEventCreate } from "../dto/eventCreate";
import ApiError from "../exceptions/apiError";

class EventService {
    private readonly prisma = new PrismaClient();

    async create(createDto: IEventCreate, userId: number) {
        await this.prisma.event.create({
            data: {
                ...createDto,
                authorId: userId,
            },
        });
    }

    async getAllEvents(offset: number, take: number) {
        const events = await this.prisma.event.findMany({
            skip: offset,
            take,
            include: {
                location: {
                    include: {
                        city: true,
                    },
                },
                author: true,
            },
        });
        const eventDtos = events.map((event) => new EventDto(event));
        return eventDtos;
    }

    async getEvent(id: number) {
        const event = await this.prisma.event.findUnique({
            where: { id },
            include: {
                location: {
                    include: {
                        city: true,
                    },
                },
                author: true,
            },
        });

        if (!event) {
            throw ApiError.NotFound();
        }

        return new EventDto(event);
    }
}

export default new EventService();
