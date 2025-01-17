/**
 * todo : export interface
 */
interface IFormContact {
    name: string;
    email: string;
    message: string
}

interface ResponseData {
    success: boolean;
    error?: string;
    result?: object;
}

export default defineEventHandler(async (event): Promise<ResponseData> => {
    const config = useRuntimeConfig(event)
    const { sendMail } = useNodeMailer()

    const body: Partial<IFormContact> = await readBody(event);
    console.log(body);
    const { name, email, message } = body;
    try {
        const result = await sendMail({
            to: config.public.mailerTo,
            subject: `[NCN] Message de ${name} - ${email}`,
            text: message,
        });

        return {success: true, result };
    } catch (error: any) {
        console.log(error);
        return { success: false, error: error.message };
    }
});