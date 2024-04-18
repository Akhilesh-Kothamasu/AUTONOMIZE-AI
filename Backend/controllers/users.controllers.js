const axios = require('axios');
const User = require('../models/users.model');

const getUserByUserName = async (req, res) => {
    const { username } = req.params;

    try {
        let user = await User.findOne({ username });

        if (!user) {
            const response = await axios.get(`https://api.github.com/users/${username}`);
            const userData = response.data;

            user = new User({
                username: userData.login,
                name: userData.name,
                avatarUrl: userData.avatar_url,
                location: userData.location,
                blog: userData.blog,
                bio: userData.bio,
                followers: userData.followers,
                following: userData.following
            });
            await user.save();
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error saving user data:', error);
        res.status(500).json({ error: 'Failed to save user data' });
    }
};


const findMutualFollowers = async ()=> {
    try {
        // Query users who mutually follow each other
        const mutualFollowers = await User.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'username',
                    foreignField: 'followers.username',
                    as: 'friends'
                }
            },
            {
                $match: {
                    'friends.followers.username': '$username'
                }
            }
        ]);

        // Save mutual followers as friends in the database
        // Note: You cannot directly save aggregation results, so you might need to process the results accordingly
        // For example, iterate over the results and save each friendship individually

        // Code to handle mutual followers…
        return mutualFollowers;
    } catch (error) {
        console.error('Error finding mutual followers:', error);
        throw error;
    }
}



const searchUserData = async(req,res)=>{
    
    const { username, location } = req.query;

    try {
        // Search user data in the database based on username and/or location
        const users = await User.find({
            $or: [
                { username: { $regex: username, $options: 'i' } }, // Case-insensitive search
                { location: { $regex: location, $options: 'i' } }
            ]
        });

        res.status(200).json(users);
    } catch (error) {
        console.error('Error searching user data:', error);
        res.status(500).json({ error: 'Failed to search user data' });
    }

}

const softDeleteByUsername = async (req,res)=>{
    
    const { username } = req.params;

    try {
        // Soft delete user record based on username
        await User.findOneAndUpdate({ username }, { deleted: true });

        res.status(200).json({ message: 'User record soft deleted successfully' });
    } catch (error) {
        console.error('Error soft deleting user record:', error);
        res.status(500).json({ error: 'Failed to soft delete user record' });
    }

}

const updateFieldsByUsername = async (req,res)=>{
   
    const { username } = req.params;
    const { location, blog, bio } = req.body;

    try {
        // Update user fields for a given username
        await User.findOneAndUpdate({ username }, { location, blog, bio });

        res.status(200).json({ message: 'User fields updated successfully' });
    } catch (error) {
        console.error('Error updating user fields:', error);
        res.status(500).json({ error: 'Failed to update user fields' });
    }

}

const sortFields = async (req,res)=>{
    
    const { sortBy } = req.query;

    try {
        // Fetch all users from the database and sort them by the given field
        const users = await User.find().sort(sortBy);

        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }

}

module.exports = { getUserByUserName,searchUserData,softDeleteByUsername,updateFieldsByUsername,sortFields,findMutualFollowers };
