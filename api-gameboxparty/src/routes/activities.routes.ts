import express from 'express';
import * as ActivitiesController from '../controllers/activities.controllers';
import { authJwt } from '../middlewares/index';
import multer from '../libs/multer.libs';

export default (router: express.Router) => {
    router.get('/activities', [authJwt.verifyToken, authJwt.isUser], ActivitiesController.getActivities);
    router.get('/activities/:id', [authJwt.verifyToken, authJwt.isUser], ActivitiesController.getActivityById);
    router.post('/admin/activities', [authJwt.verifyToken, authJwt.isAdmin], (multer.single('image')), ActivitiesController.createActivity);
    router.delete('/admin/activities/:id', [authJwt.verifyToken, authJwt.isAdmin], ActivitiesController.deleteActivityById);
    router.put('/admin/activities/:id', [authJwt.verifyToken, authJwt.isAdmin], (multer.single('image')), ActivitiesController.updateActivityById);
}
