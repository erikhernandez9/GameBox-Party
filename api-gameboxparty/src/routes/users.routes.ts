import express from 'express';
import * as UsersController from '../controllers/users.controllers';
import { authJwt } from '../middlewares/index';

export default (router: express.Router) => {
    router.get('/admin/users', [authJwt.verifyToken, authJwt.isAdmin], UsersController.getUsers);
    router.get('/admin/users/:id', [authJwt.verifyToken, authJwt.isAdmin], UsersController.getUserById);
    router.delete('/admin/users/:id', [authJwt.verifyToken, authJwt.isAdmin], UsersController.deleteUserById);
    router.put('/admin/users/:id', [authJwt.verifyToken, authJwt.isAdmin], UsersController.updateUserById);
}