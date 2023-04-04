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
    },
};

export default config;
