import type {RuntimeConfig} from "nuxt/schema";

export default defineNuxtPlugin((nuxtApp) => {
    const config: RuntimeConfig = useRuntimeConfig()

    // Create a custom $fetch instance
    const $apiFetch = $fetch.create({
        baseURL: '/api',
        onRequest({ options }) {
            // Apply only if the request URL starts with `/api`
            if (options.baseURL?.startsWith('/api')) {
                const customHeaders = options?.headers ? new Headers(options.headers) : new Headers();
                // customHeaders.set('Accept-Language', locale);
                customHeaders.set('x-internal-token', config.public.internalApiSecret);

                options.headers = customHeaders;
            }
        },
    });

    // Override the global $fetch instance with the custom instance
    return {
        provide: {
            apiFetch: $apiFetch
        }
    }
});