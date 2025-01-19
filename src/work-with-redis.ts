// // Write a script that:
// // 1. Connects to Redis.
// // 2. Saves the keys with their values.
// // 3. Reads and outputs values for a given key.

// // Use redis library

// async function manageRedis(): Promise<void> {
//     // Your code goes here
// }

// module.exports = { manageRedis };
// Import the Redis library
const { createClient } = require('redis');

// Async function to manage Redis operations
async function manageRedis() {
    // Create a Redis client
    const client = createClient();

    // Handle connection errors
    client.on('error', (err) => console.error('Redis Client Error', err));

    try {
        // Connect to the Redis server
        await client.connect();
        console.log('Connected to Redis');

        // Define key-value pairs to save
        const keyValues = {
            key1: 'value1',
            key2: 'value2',
            key3: 'value3',
        };

        // Save keys with their values
        for (const [key, value] of Object.entries(keyValues)) {
            await client.set(key, value);
            console.log(`Set ${key} = ${value}`);
        }

        // Specify the key to read
        const keyToRead = 'key1';

        // Read and output the value for the given key
        const value = await client.get(keyToRead);
        console.log(`Value for ${keyToRead}: ${value}`);
    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        // Disconnect from the Redis server
        await client.disconnect();
        console.log('Disconnected from Redis');
    }
}

module.exports = { manageRedis };
