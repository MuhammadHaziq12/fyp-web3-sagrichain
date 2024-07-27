const User = require('../models/users.model');
const jwt = require('jsonwebtoken');
const ethers = require('ethers');
const crypto = require('crypto');
const secretKey = 'mySecretKeyHaziq'

const signup = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const { name, role, email, username, cnic, city } = req.body;

            // Check if the user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            // Generate a random wallet address and private key
            const wallet = ethers.Wallet.createRandom();
            const blockchainPrivateKey = wallet.privateKey;
            const blockchainAddress = wallet.address;

            // Create a new user instance
            const newUser = new User({
                name,
                role,
                email,
                username,
                cnic,
                city,
                blockchainAddress
            });

            // Save the new user to the database
            await newUser.save();

            // Prepare response data including privateKey and email
            const responseData = {
                privateKey: blockchainPrivateKey,
                email: email,
            };

            res.status(200).json(responseData);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        res.status(405).json({ message: "Method Not Allowed" });
    }
};
// const signup = async (req, res) => {
//     if (req.method === 'POST') {
//         try {
//             const { name, role, email, username, cnic, city } = req.body;

//             // Check if the user already exists
//             const existingUser = await User.findOne({ email });
//             if (existingUser) {
//                 return res.status(400).json({ message: 'User already exists' });
//             }

//             // Generate a random wallet address and private key
//             const wallet = ethers.Wallet.createRandom();
//             const blockchainAddress = wallet.address;
//             const blockchainPrivateKey = wallet.privateKey;

//             // Create a new user instance
//             const newUser = new User({
//                 name,
//                 role,
//                 email,
//                 username,
//                 cnic,
//                 city,
//                 blockchainAddress
//             });

//             // Save the new user to the database
//             await newUser.save();

//             res.status(200).json({ message: blockchainPrivateKey });
//         } catch (error) {
//             console.error(error);
//             res.status(500).json({ message: 'Internal server error' });
//         }
//     } else {
//         res.status(405).json({ message: "Method Not Allowed" });
//     }
// };

const login = async (req, res) => {
    try {
        const { signedMessage, nonce, address } = req.body;

        // Recover the address from the signed message and nonce
        const recoveredAddress = ethers.utils.verifyMessage(nonce, signedMessage);

        if (recoveredAddress !== address) {
            return res.status(401).json({ message: 'Invalid Signature' });
        }

        // Find the user by blockchain address
        const user = await User.findOne({ blockchainAddress: address });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Generate a JWT token
        const token = jwt.sign({ address, role: user.role }, secretKey, { expiresIn: '10s' });

        res.status(200).json({ token, user }); // Return both token and user
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getUserById = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getNonce = async (req, res) => {
    if (req.method === 'POST') {
        const { address } = req.body;
        try {
            const addressExists = await User.findOne({ blockchainAddress: address });
            if (!addressExists) {
                return res.status(400).json({ message: "Please register first" });
            }
            const nonce = crypto.randomBytes(32).toString('hex');
            res.status(200).json({ message: nonce });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'An error occurred' });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
};

const verify = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Invalid token' });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Verify the JWT token
        const decoded = jwt.verify(token, secretKey);
        const currentTime = Math.floor(Date.now() / 1000);

        if (decoded.exp < currentTime) {
            res.json({ message: 'Expired' });
        } else {
            res.json({ message: 'Valid' });
        }
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
}


const getUsersByRole = async (req, res) => {
    try {
        const { role } = req.params;
        const users = await User.find({ role });
        if (!users.length) {
            return res.status(404).json({ message: 'No users found with this role' });
        }
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getUserCount = async (req, res) => {
    try {
        const count = await User.countDocuments();
        res.status(200).json({ count });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// module.exports = {
//     // other exports
//     getUserCount
// };


const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;

        // Find the user by ID and delete it
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const editUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { name, role, email, username, cnic, city } = req.body;

        const updatedUser = await User.findByIdAndUpdate(userId, { name, role, email, username, cnic, city }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    signup,
    login,
    getAllUsers,
    getUserById,
    getNonce,
    verify,
    getUsersByRole,
    getUserCount,
    deleteUser,
    editUser
};
