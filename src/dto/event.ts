import { City, Event, Location, User } from "@prisma/client";
import LocationDto from "./location";
import UserDto from "./user";

type EventDtoType = Event & {
    location: Location & {
        city: City | null;
    };
    author: User;
};

class EventDto {
    public id: number;
    public title: string;
    public description: string;
    public location: LocationDto;
    public createdAt: Date;
    public author: UserDto;

    constructor(model: EventDtoType) {
        this.id = model.id;
        this.title = model.title;
        this.description = model.description;
        this.createdAt = model.createdAt;

        this.location = new LocationDto(model.location);
        this.author = new UserDto(model.author);
    }
}

export default EventDto;
