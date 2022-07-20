import { PrismaClient } from "@prisma/client";
import LocationDto from "../dto/location";

class PlaceService {
    private readonly prisma = new PrismaClient();

    async getAllCities() {
        const city = await this.prisma.city.findMany();
        return city;
    }

    async getAllLocations() {
        const locations = await this.prisma.location.findMany({
            include: {
                city: true,
            },
        });

        const locationDtos = locations.map(
            (location) => new LocationDto(location)
        );
        return locationDtos;
    }
}

export default new PlaceService();
