import express from 'express';
import * as RoomsController from '../controllers/rooms.controllers';
import { authJwt } from '../middlewares/index';

export default (router: express.Router) => {
    router.get('/rooms', [authJwt.verifyToken, authJwt.isUser], RoomsController.getRooms);
    router.get('/rooms/:id', RoomsController.getRoomById);
    router.post('/rooms', [authJwt.verifyToken, authJwt.isUser], RoomsController.createRoom);
    router.post('/rooms/start/:id', RoomsController.startRoom);
    router.post('/rooms/connect/:id', RoomsController.connectRoom);
    router.post('/rooms/vote/:id', RoomsController.voteRoom);
    router.get('/rooms/vote/:id', RoomsController.getRoomVotes);
}