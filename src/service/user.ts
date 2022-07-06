import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { v4 } from "uuid";
import EmailService from "./email";
import TokenService from "./token";
import UserDto, { IUserCreate } from "../dto/user";
import ApiError from "../exceptions/apiError";

class UserService {
    private prisma = new PrismaClient();

    async registration(userCreateDto: IUserCreate) {
        const candidate = await this.prisma.user.findUnique({
            where: { email: userCreateDto.email },
        });

        if (candidate) {
            throw ApiError.BadRequest(
                "Пользователь с таким email уже существует"
            );
        }

        const hashPassword = await bcrypt.hash(userCreateDto.password, 3);
        const activationLink = v4();

        const user = await this.prisma.user.create({
            data: {
                ...userCreateDto,
                password: hashPassword,
                activationLink,
            },
        });
        await EmailService.sendActivationMail(
            user.email,
            `${process.env.API_URL}/api/activate/${activationLink}`
        );

        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens(userDto);
        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto,
        };
    }

    async activate(activationLink: string) {
        const user = await this.prisma.user.findFirst({
            where: {
                activationLink,
            },
        });

        if (!user) {
            throw ApiError.BadRequest("Некоректная ссылка");
        }
        user.isActivated = true;
        await this.prisma.user.update({ where: { id: user.id }, data: user });
    }

    async login(email: string, password: string) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw ApiError.BadRequest("Пользователь не найден");
        }

        const isPass = await bcrypt.compare(password, user.password);

        if (!isPass) {
            throw ApiError.BadRequest("Неверный пароль");
        }

        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens(userDto);
        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto,
        };
    }

    async logout(refreshToken: string) {
        const token = await TokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken: string | null | undefined) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }

        const userDate = await TokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await TokenService.findToken(refreshToken);

        if (!!userDate || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }

        const user = await this.prisma.user.findUnique({
            where: { id: tokenFromDb.userId },
        });

        if (!user) {
            throw ApiError.BadRequest("Пользователь не найден");
        }

        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens(userDto);
        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto,
        };
    }

    async getAllUsers() {
        const users = await this.prisma.user.findMany();
        return users;
    }
}

export default new UserService();
