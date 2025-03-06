import { readFileSync } from 'fs';
import { resolve } from 'path';

export default defineEventHandler(async (event) => {
    // Extract the 'file' query parameter from the URL
    const { file } = getQuery(event);

    // Validate the 'file' query parameter
    if (!file || typeof file !== 'string') {
        throw createError({
            statusCode: 400,
            statusMessage: 'File parameter is required and must be a string.',
        });
    }

    // Determine the file path based on the query parameter
    const geoJsonFilePath = resolve('./server/routes/data', `${file}.geojson`);

    try {
        // Read the GeoJSON file
        const fileContent = readFileSync(geoJsonFilePath, 'utf-8');
        // Return the parsed GeoJSON data
        return JSON.parse(fileContent);
    } catch (error) {
        // Handle errors (e.g., file not found)
        throw createError({
            statusCode: 404,
            statusMessage: `GeoJSON file '${file}.geojson' not found.`,
        });
    }
});