import 'dotenv/config'
import express from 'express';
import jwt from 'jsonwebtoken';
import { getUserById } from '../models/users';
import { getRolesByIds } from '../models/roles';

export const verifyToken = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const token = req.headers['x-access-token'];

    if (!token) return res.status(401).json({ message: 'No token provided' });

    const decoded = jwt.decode(token.toString()) as jwt.JwtPayload;

    if (!decoded || !decoded.exp || Date.now() >= decoded.exp * 1000) {
        return res.status(401).json({ message: 'Token expired' });
    }

    try {

        req.params.userId = decoded.userData.id;

        const user = await getUserById(req.params.userId);

        if (!user) return res.status(404).json({ message: 'No user found' });

        try {
            jwt.verify(token.toString(), process.env.JWT_SECRET);
        } catch (error) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        next();
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const isAdmin = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const user = await getUserById(req.params.userId);
        const roles = await getRolesByIds(user.role);

        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === 'admin') {
                next();
                return;
            }
        }

        return res.status(401).json({ permissions: 'user', message: 'Unauthorized' });
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

export const isUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const user = await getUserById(req.params.userId);
        const roles = await getRolesByIds(user?.role);

        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === 'user') {
                next();
                return;
            }
        }

        return res.status(401).json({ permissions: 'guest', message: 'Unauthorized' });
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Unauthorized' });
    }
}