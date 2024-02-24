import express from 'express';
import * as ProposalsController from '../controllers/proposals.controllers';
import * as UsersController from '../controllers/users.controllers';
import { authJwt } from '../middlewares/index';

export default (router: express.Router) => {
    router.get('/account/:id', [authJwt.verifyToken, authJwt.isUser], UsersController.getUserById);
    router.delete('/account/:id', [authJwt.verifyToken, authJwt.isUser], UsersController.deleteAccountById);
    router.put('/account/:id', [authJwt.verifyToken, authJwt.isUser], UsersController.updateAccountById);
}