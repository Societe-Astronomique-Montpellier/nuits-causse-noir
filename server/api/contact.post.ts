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
        return { success: false, message: 'Tous les champs sont obligatoire.' };
    }

    try {
        const transporter = nodemailer.createTransport({
            host: config.smtpHost,
            port: config.smtpPort,
            secure: true,
            auth: {
                user: config.smtpUser,
                pass: config.smtpPassword,
            },
        });

        transporter.verify((err) => {
            if (err) {
                throw new Error(err.message)
            }
        })

        const result = await transporter.sendMail({
            from: `"Societe-Astronomique-Montpellier" <${config.smtpUser}>`,
            to: config.public.receiverMail,
            replyTo: email,
            subject: `[NCN] Message de ${name} - ${email}`,
            text: message,
            html: `
                <div>
                    <div>${message}</div>
                    <div>
                        <img class="background-color: #27272a;" width="150" src="https://demo.nuits-causse-noir.fr/img/LOGO_NCN_NOIR.png" alt="Nuits du causse noir" />
                    </div>     
                </div>`
        });

        return { success: true, message: 'Le message a bien été envoyé, nous vous répondrons au plus vite.', result};
    } catch (error: any) {
        return { success: false, message: error.message };
    }
});