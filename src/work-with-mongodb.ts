// Write a script that:
// 1. Connects to MongoDB.
// 2. Creates the 'users' collection.
// 3. Adds new users.
// 4. Finds users with duplicate emails.

// Use Mongoose library

type DuplicatedUsers = {
    email: string
}

async function manageUsers(): Promise<DuplicatedUsers[]> {
    // Your code goes here  
    try {
        // Connect to MongoDB
        await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');

        // Define user schema and model
        const userSchema = new mongoose.Schema({
            name: String,
            email: String,
        });
        const User = mongoose.model('User', userSchema);

        // Create 'users' collection and add new users
        await User.create([
            { name: 'Alice', email: 'alice@example.com' },
            { name: 'Bob', email: 'bob@example.com' },
            { name: 'Charlie', email: 'alice@example.com' }, // Duplicate email
        ]);

        // Find users with duplicate emails
        const duplicates = await User.aggregate([
            {
                $group: {
                    _id: '$email',
                    count: { $sum: 1 },
                },
            },
            {
                $match: {
                    count: { $gt: 1 },
                },
            },
            {
                $project: {
                    email: '$_id',
                    _id: 0,
                },
            },
        ]);

        return duplicates;
    } catch (error) {
        console.error('Error managing users:', error);
        return [];
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
    return []
}

module.exports = { manageUsers }
