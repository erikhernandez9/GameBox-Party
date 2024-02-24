import 'dotenv/config';
import express from 'express';
import { createUser, getUserByUsername, getUserByEmail } from '../models/users';
import { encryptPassword, comparePassword } from '../utils/auth.utils';
import jwt from 'jsonwebtoken';
import { getRoleByName, getRolesByIds } from '../models/roles';

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { username, password, keepSigned } = req.body;

        if (!username || !password) return res.status(400).json({ message: 'Username and password are required' });
        
        const user = await getUserByUsername(username).select('+password');

        if (!user) return res.status(400).json({ message: 'User not found' });
        
        const matchPassword = await comparePassword(password, user.password);

        if (!matchPassword) return res.status(403).json({ message: 'Invalid password' });
        
        const roles = await getRolesByIds(user.role);

        const permissions = roles.map((role) => role.name);

        const userData = {
            id: user.id,
            username: user.username,
            email: user.email,
            permissions: permissions
        }

        const token = jwt.sign({ userData }, process.env.JWT_SECRET, {
            expiresIn: keepSigned ? '7d' : '2h'
        })

        return res.status(200).json({ token: token, user: userData}).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(404);
    }
}

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { email, username, password } = req.body;

        if (!email || !username || !password) {
            return res.status(400).json({ message: 'Email, username and password are required' });
        }

        const existingEmail = await getUserByEmail(email)
        const existingUsername = await getUserByUsername(username)
        
        if (existingEmail) {
            return res.status(400).json({ message: 'Email is already in use' });
        }

        if (existingUsername) {
            return res.status(400).json({ message: 'Username is already in use' });
        }

        const role = await getRoleByName('user');

        await createUser({
            email,
            username,
            password: await encryptPassword(password),
            role: [role._id],
            master: false
        })

        return res.status(201).json({ message: "User created" }).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(404);
    }
}

export const validateEndpoint = async (req: express.Request, res: express.Response) => {
    try {
        res.status(200).json({ message: 'Valid' }).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(404);
    }
}