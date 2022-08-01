import UserDto from "../../dto/user";

export interface IUserService {
    registration: (
        email: string,
        password: string
    ) => Promise<{
        user: UserDto;
        accessToken: string;
        refreshToken: string;
    }>;
}
