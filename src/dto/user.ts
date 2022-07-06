import { User } from "@prisma/client";

export interface IUserCreate {
    email: string;
    firstName: string;
    lastName: string;
    cityId: number;
    about?: string;
    password: string;
}

class UserDto {
    public id: number;
    public email: string;
    public firstName: string;
    public lastName: string;
    public city: number | null;
    public about: string | null;
    public isActivated: boolean;

    constructor(model: User) {
        this.email = model.email;
        this.id = model.id;
        this.firstName = model.firstName;
        this.lastName = model.lastName;
        this.about = model.about;
        this.city = model.cityId;
        this.isActivated = model.isActivated;
    }
}

export default UserDto;
