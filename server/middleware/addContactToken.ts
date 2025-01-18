export default defineEventHandler((event) => {
    const config = useRuntimeConfig();
    const apiSideRoutes = event.path.startsWith('/api');
    if (!apiSideRoutes) {
        return;
    }

    const internalToken = getHeader(event, 'x-internal-token');

    // Reject requests without the token or with an invalid token
    if (internalToken !== config.public.internalApiSecret) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized access: Invalid or missing token.',
        });
    }
});