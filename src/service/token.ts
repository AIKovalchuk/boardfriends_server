import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

class TokenService {
    private readonly prisma = new PrismaClient();

    generateTokens(payload: any) {
        const accessToken = jwt.sign(
            { ...payload },
            process.env.JWT_ACCESS_SECRET || "",
            { expiresIn: "30m" }
        );
        const refreshToken = jwt.sign(
            { ...payload },
            process.env.JWT_REFRESH_SECRET || "",
            { expiresIn: "30d" }
        );

        return {
            accessToken,
            refreshToken,
        };
    }

    async saveToken(userId: number, refreshToken: string) {
        const tokenData = await this.prisma.token.findUnique({
            where: {
                userId,
            },
        });

        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return this.prisma.token.update({
                where: {
                    userId,
                },
                data: tokenData,
            });
        }

        const token = await this.prisma.token.create({
            data: { userId, refreshToken },
        });
        return token;
    }
}

export default new TokenService();
