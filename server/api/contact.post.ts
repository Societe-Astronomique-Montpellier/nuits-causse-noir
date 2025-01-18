import nodemailer from 'nodemailer';

interface IFormContact {
    name: string;
    email: string;
    message: string
}

interface ResponseData {
    success: boolean;
    message?: string;
    result?: object;
}

export default defineEventHandler(async (event): Promise<ResponseData> => {
    const config = useRuntimeConfig(event);
    // Retrieve data body
    const body: Partial<IFormContact> = await readBody(event);
    const {
        name,
        email,
        message
    } = body;
    if (!name || !email || !message) {
        return { success: false, message: 'All fields are required.' };
    }
    
    try {
        const transporter = nodemailer.createTransport({
            host: config.smtpHost,
            port: config.smtpPort,
            secure: true,
            auth: {
                user: config.smtpUser,
                pass: config.smtpPwd,
            },
        });
        const result = await transporter.sendMail({
            to: config.public.mailerTo,
            subject: `[NCN] Message de ${name} - ${email}`,
            text: message,
        });
        
        return { success: true, message: 'Le message a bien été envoyé, nous vous répondrons au plus vite.', result};
    } catch (error: any) {
        return { success: false, message: error.message };
    }
});