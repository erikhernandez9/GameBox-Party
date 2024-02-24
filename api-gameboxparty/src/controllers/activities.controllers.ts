import 'dotenv/config';
import express from 'express';
import * as ActivityModel from '../models/activities';
import * as ProposalModel from '../models/proposals';
import fs from 'fs';
import path from 'path';

export const getActivities = async (req: express.Request, res: express.Response) => {
    try {
        const activities = await ActivityModel.getActivities();
        return res.status(200).json(activities).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const getActivityById = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Id is required' });
        }

        const activity = await ActivityModel.getActivityById(id);

        if (!activity) {
            return res.status(404).json({ message: 'Activity not found' });
        }

        return res.status(200).json(activity).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const createActivity = async (req: express.Request, res: express.Response) => {
    try {
        const { name, description } = req.body;
        let image = undefined;

        if (req.file) {
            image = req.file.filename;
        }

        if (!name || !description) {
            return res.status(400).json({ message: 'Name and description are required' });
        }

        const activity = await ActivityModel.createActivity({
            name,
            description,
            image
        })

        return res.status(200).json(activity).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const deleteActivityById = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Id is required' });
        }

        const activity = await ActivityModel.getActivityById(id);

        if (!activity) {
            return res.status(404).json({ message: 'Activity not found' });
        }

        await ProposalModel.updateActivities(id);

        if (activity.image) {
            const imagePath = path.join(__dirname, '..', '..', 'uploads', 'img', activity.image);

            if (activity.image && fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }

            activity.image = undefined;
        }

        await ActivityModel.deleteActivityById(id);

        return res.status(200).json({ message: 'Activity deleted successfully' }).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const updateActivityById = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { name, description, image } = req.body;
        let newImage = undefined;

        if (req.file) {
            newImage = req.file.filename;
        }

        if (!name || !description) {
            return res.status(400).json({ message: 'Name and description are required' });
        }

        const activity = await ActivityModel.getActivityById(id);

        if (!activity) {
            return res.status(404).json({ message: 'Activity not found' });
        }

        if (activity.image && newImage) {
            const imagePath = path.join(__dirname, '..', '..', 'uploads', 'img', activity.image);
            fs.unlinkSync(imagePath);
        }

        const updatedActivity = await ActivityModel.updateActivityById(id, {
            name,
            description,
            image: newImage
        });

        if (image !== activity.image && activity.image) {
            if (!newImage) {
                const imagePath = path.join(__dirname, '..', '..', 'uploads', 'img', activity.image);
                fs.unlinkSync(imagePath);
                await ActivityModel.deleteActivityImageById(id);
            }
        }


        return res.status(200).json(updatedActivity).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}
