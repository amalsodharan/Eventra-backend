import initDb from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import emailService from '../services/emailService.js';

dotenv.config();

const SALT_ROUNDS = 10;

const createUser = async (req, res) => {
    try {
        const { User } = await initDb();
        let { email, password, first_name, last_name, phone, role } = req.body;

        if (!email || !password || !first_name || !last_name || !phone) {
            return res.status(400).json({ status: 'Failed', message: 'All fields are required' });
        }
        if (!role) role = 'user';

        const fetchUser = await User.findOne({ where: { email: email } });
        if (fetchUser) return res.status(400).json({ status: 'Failed', message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const input = {
            email,
            password: hashedPassword,
            first_name,
            last_name,
            phone,
            role,
            is_deleted: false
        };

        const user = await User.create(input);

        const token = jwt.sign(
            { id: user.id, role: user.role, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        // Send welcome email — fire and forget (don't block the response)
        emailService.sendWelcomeEmail(email, first_name).catch(err => {
            console.error('Welcome email failed:', err.message);
        });

        return res.status(201).json({
            status: 'Success',
            message: 'User created successfully',
            token
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'Failed', message: `Some error occurred due to ${error}` });
    }
};

const login = async (req, res) => {
    try {
        const { User } = await initDb();
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ status: 'Failed', message: 'All fields are required' });
        }

        const userFetch = await User.findOne({ where: { email: email } });

        if (!userFetch) {
            return res.status(400).json({ status: 'Failed', message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, userFetch.password);

        if (!isMatch) {
            return res.status(400).json({ status: 'Failed', message: 'Wrong password' });
        }

        const token = jwt.sign(
            { id: userFetch.id, role: userFetch.role, email: userFetch.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        return res.status(200).json({
            status: 'Success',
            message: 'Login successful',
            token
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'Failed', message: `Some error occurred due to ${error}` });
    }
};

export default { createUser, login };
