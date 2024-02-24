import express from 'express';
import mongoose from 'mongoose';
import * as ProposalModel from '../models/proposals';
import * as UserModel from '../models/users';

export const getProposals = async (req: express.Request, res: express.Response) => {
    try {
        const proposals = await ProposalModel.getProposals();
        res.status(200).json(proposals);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const getProposalById = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Id is required' });
        }

        const proposal = await ProposalModel.getProposalById(id);

        if (!proposal) {
            return res.status(404).json({ message: 'Proposal not found' });
        }

        return res.status(200).json(proposal);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const createProposal = async (req: express.Request, res: express.Response) => {
    try {
        const { name, description, createdBy, activities } = req.body;

        if (!name || !description || !createdBy || !activities || activities.length == 0) {
            return res.status(400).json({ message: 'Name, description and activities are required' });
        }

        const user = await UserModel.getUserById(createdBy);

        const proposal = await ProposalModel.createProposal({
            name,
            description,
            createdById: createdBy,
            createdByUsername: user.username,
            activities
        })

        return res.status(200).json(proposal);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

//Admin exclusive
export const deleteProposalById = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Id is required' });
        }

        const proposal = await ProposalModel.deleteProposalById(id);

        if (!proposal) {
            return res.status(404).json({ message: 'Proposal not found' });
        }

        return res.status(200).json(proposal);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const updateProposalById = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { name, description, activities} = req.body;

        if (!id || !name || !description || !activities || activities.length == 0) {
            return res.status(400).json({ message: 'Name, description and activities are required' });
        }

        const proposal = await ProposalModel.updateProposalById(id, {
            name,
            description,
            activities
        });

        if (!proposal) {
            return res.status(404).json({ message: 'Proposal not found' });
        }

        return res.status(200).json(proposal);
    } catch (error) {
        console.log(error);
        return res.send(500);
    }
}

//User exclusive
export const getProposalByIdUser = async (req: express.Request, res: express.Response) => {
    try {
        const { userId, proposalId } = req.params;

        if (!userId || !proposalId) {
            return res.status(400).json({ message: 'userId and proposalId are required' });
        }

        const proposal = await ProposalModel.getProposalByIdUser(userId, proposalId);

        if (!proposal) {
            return res.status(404).json({ message: 'Proposal not found' });
        }

        return res.status(200).json(proposal);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const getProposalsByIdUser = async (req: express.Request, res: express.Response) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ message: 'userId  is required' });
        }

        const proposals = await ProposalModel.getProposalsByIdUser(userId);

        if (!proposals) {
            return res.status(404).json({ message: 'Proposals not found' });
        }

        return res.status(200).json(proposals);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const deleteProposalByIdUser = async (req: express.Request, res: express.Response) => {
    try {
        const { userId, proposalId } = req.params;

        if (!userId || !proposalId) {
            return res.status(400).json({ message: 'UserId and proposalId are required' });
        }

        const proposal = await ProposalModel.deleteProposalByIdUser(userId, proposalId);

        if (!proposal) {
            return res.status(404).json({ message: 'Proposal not found' });
        }

        return res.status(200).json(proposal);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const updateProposalByIdUser = async (req: express.Request, res: express.Response) => {
    try {
        const { userId, proposalId } = req.params;
        const { name, description } = req.body;
        let activities = req.body.activities;

        if (activities.length == 0) {
            activities = undefined;
        }

        if (!userId || !proposalId || !name || !description) {
            return res.status(400).json({ message: 'Name, description and activities are required' });
        }

        const proposal = await ProposalModel.updateProposalByIdUser(userId, proposalId, {
            name,
            description,
            activities
        });

        if (!proposal) {
            return res.status(404).json({ message: 'Proposal not found' });
        }

        return res.status(200).json(proposal);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}