import { City, Location } from "@prisma/client";

type ILocationDto = Location & {
    city: City | null;
};

class LocationDto {
    public id: number;
    public title: string;
    public address: string;
    public city: City | null;

    constructor(model: ILocationDto) {
        this.id = model.id;
        this.title = model.title;
        this.address = model.address;
        this.city = model.city;
    }
}

export default LocationDto;
