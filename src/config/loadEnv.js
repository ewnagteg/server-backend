import dotenv from 'dotenv';
const result = dotenv.config();

// need this to prevent node from hoisting db above loading env
if (result.error) {
    console.error('Failed to load .env:', result.error);
}