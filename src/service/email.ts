import { createTransport, Transporter } from "nodemailer";

class EmailService {
    transporter: Transporter<any>;

    constructor() {
        this.transporter = createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_APP_PASSWORD,
            },
        });
    }

    async sendActivationMail(to: string, link: string) {
        // await this.transporter.sendMail({
        //     from: process.env.SMTP_USER,
        //     to,
        //     subject: "Активация аккаунта на BoardFriends",
        //     text: "",
        //     html: `
        //     <div>
        //         <h1>Для активации перейдите по ссылке</h1>
        //         <a href="${link}">${link}</a>
        //     </div>
        //     `,
        // });
    }
}

export default new EmailService();
