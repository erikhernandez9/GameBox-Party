import express from 'express';
import * as AuthController from '../controllers/authentication.controllers';
import { authJwt } from '../middlewares/index';

export default (router: express.Router) => {
    router.get('/auth/validate', authJwt.verifyToken, AuthController.validateEndpoint);
    router.post('/auth/register', AuthController.register);
    router.post('/auth/login', AuthController.login)
}