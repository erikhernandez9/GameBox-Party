import express from 'express';
import * as UserModel from '../models/users';
import * as ProposalModel from '../models/proposals';
import { getRoleByName, getRolesByIds } from '../models/roles';
import { comparePassword } from '../utils/auth.utils';

export const getUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await UserModel.getUsers();

        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const getUserById = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Id is required' });
        }

        const user = await UserModel.getUserById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const roles = await getRolesByIds(user.role);

        const permissions = roles.map((role) => role.name);

        const userData = {
            id: user.id,
            username: user.username,
            email: user.email,
            permissions: permissions
        }

        return res.status(200).json(userData);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const getUserByEmail = async (req: express.Request, res: express.Response) => {
    try {
        const { email } = req.params;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const user = await UserModel.getUserByEmail(email);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const deleteUserById = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Id is required' });
        }

        const user = await UserModel.getUserById(id).select('+password master');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.master && user.master === true) {
            return res.status(400).json({ message: 'Cannot delete master account' });
        }

        const proposals = await ProposalModel.getProposalsByIdUser(user.id);

        proposals.forEach(async (proposal) => {
            await ProposalModel.deleteProposalById(proposal.id);
        });

        const deletedUser = await UserModel.deleteUserById(id);

        return res.status(200).json(deletedUser);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const updateUserById = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { username, email, role } = req.body;
        let roleIds: any[] = [];

        if (!id) {
            return res.status(400).json({ message: 'Id is required' });
        }

        if (!username || !email || !role) {
            return res.status(400).json({ message: 'Username, email, and roles are required' });
        }

        if (!role.includes('user') || role.length < 1) {
            return res.status(400).json({ message: 'Invalid role' });
        }

        const user = await UserModel.getUserById(id).select('+password master');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.master && user.master === true) {
            return res.status(400).json({ message: 'Cannot edit master account' });
        }

        const existingUser = await UserModel.getUserByUsername(username);

        if (existingUser && existingUser.id !== id) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        for (const roleName of role) {
            const roleDoc = await getRoleByName(roleName);

            if (roleDoc) {
                roleIds.push(roleDoc._id);
            } else {
                return res.status(400).json({ message: `Role not found: ${roleName}` });
            }
        }

        const newUser = await UserModel.updateUserById(id, {
            username,
            email,
            role: roleIds
        });

        const proposals = await ProposalModel.getProposalsByIdUser(newUser.id);

        proposals.forEach(async (proposal) => {
            await ProposalModel.updateProposalById(proposal.id, {
                createdByUsername: newUser.username
            });
        });

        const roles = await getRolesByIds(newUser.role);

        const permissions = roles.map((role) => role.name);

        const userData = {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            permissions: permissions
        }

        return res.status(200).json(userData);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

// User exclusive
export const deleteAccountById = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { password } = req.body;

        if (!id) {
            return res.status(400).json({ message: 'Id is required' });
        }

        if (!password) {
            return res.status(400).json({ message: 'Password is required' });
        }

        const user = await UserModel.getUserById(id).select('+password master');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.master && user.master === true) {
            return res.status(400).json({ message: 'Cannot delete master account' });
        }

        const matchPassword = await comparePassword(password, user.password);

        if (!matchPassword) return res.status(403).json({ message: 'Invalid password' });

        const proposals = await ProposalModel.getProposalsByIdUser(user.id);

        proposals.forEach(async (proposal) => {
            await ProposalModel.deleteProposalById(proposal.id);
        });

        const deletedUser = await UserModel.deleteUserById(id);

        return res.status(200).json(deletedUser);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const updateAccountById = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { username, email, password } = req.body;

        if (!id) {
            return res.status(400).json({ message: 'Id is required' });
        }

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Username, email, and password are required' });
        }

        const user = await UserModel.getUserById(id).select('+password master');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.master && user.master === true ) {
            return res.status(400).json({ message: 'Cannot edit master account' });
        }

        const existingUser = await UserModel.getUserByUsername(username);

        if (existingUser && existingUser.id !== id) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const matchPassword = await comparePassword(password, user.password);

        if (!matchPassword) return res.status(403).json({ message: 'Invalid password' });

        const newUser = await UserModel.updateUserById(id, {
            username,
            email
        });

        const proposals = await ProposalModel.getProposalsByIdUser(newUser.id);

        proposals.forEach(async (proposal) => {
            await ProposalModel.updateProposalById(proposal.id, {
                createdByUsername: newUser.username
            });
        });

        const roles = await getRolesByIds(newUser.role);

        const permissions = roles.map((role) => role.name);

        const userData = {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            permissions: permissions
        }

        return res.status(200).json(userData);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}
