class UserDto {
    public email: string;
    public id: number;
    public isActivated: boolean;

    constructor(model: any) {
        this.email = model.email;
        this.id = model.id;
        this.isActivated = model.isActivated;
    }
}

export default UserDto;
