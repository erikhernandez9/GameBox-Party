import express from 'express'
import authentication from './authentication.routes';
import activities from './activities.routes';
import rooms from './rooms.routes';
import proposals from './proposals.routes';
import users from './users.routes';
import account from './account.routes';

const router = express.Router();

export default (): express.Router => {
    authentication(router);
    activities(router);
    rooms(router);
    proposals(router);
    users(router);
    account(router);
    return router;
};