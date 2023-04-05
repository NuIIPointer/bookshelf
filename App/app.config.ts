import * as dotenv from 'dotenv';
import { ExpoConfig } from 'expo/config';
dotenv.config();

// In SDK 46 and lower, use the following import instead:
// import { ExpoConfig } from '@expo/config-types';

const config: ExpoConfig = {
    name: 'BookShelf',
    slug: 'BookShelf',
    extra: {
        googleBooksApiKey: process.env.GOOGLE_BOOKS_API_KEY,
        openAiKey: process.env.OPEN_AI_KEY,
        openAiOrg: process.env.OPEN_AI_ORG,
        eas: {
            projectId: '0f41a5ef-9961-4a02-aa55-5d0ef7105e7b',
        },
    },
};

export default config;
