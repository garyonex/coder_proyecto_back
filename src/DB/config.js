import { config } from 'dotenv';
config();
export default {
    mongodbURL: process.env.MONGODB_URI,
};

// viene del env para proteger codigo
