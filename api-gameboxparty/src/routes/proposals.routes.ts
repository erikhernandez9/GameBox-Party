import express from 'express';
import * as ProposalsController from '../controllers/proposals.controllers';
import { authJwt } from '../middlewares/index';

export default (router: express.Router) => {
    router.get('/proposals', [authJwt.verifyToken, authJwt.isUser], ProposalsController.getProposals);
    router.get('/proposals/:id', [authJwt.verifyToken, authJwt.isUser], ProposalsController.getProposalById);
    router.post('/proposals', [authJwt.verifyToken, authJwt.isUser], ProposalsController.createProposal);

    //Admin exclusive
    router.delete('/admin/proposals/:id', [authJwt.verifyToken, authJwt.isAdmin], ProposalsController.deleteProposalById);
    router.put('/admin/proposals/:id', [authJwt.verifyToken, authJwt.isAdmin], ProposalsController.updateProposalById);

    //User exlusive
    router.get('/proposals/user/:userId/:proposalId', [authJwt.verifyToken, authJwt.isUser], ProposalsController.getProposalByIdUser);
    router.get('/proposals/user/:userId', [authJwt.verifyToken, authJwt.isUser], ProposalsController.getProposalsByIdUser);
    router.delete('/proposals/user/:userId/:proposalId', [authJwt.verifyToken, authJwt.isUser], ProposalsController.deleteProposalByIdUser);
    router.put('/proposals/user/:userId/:proposalId', [authJwt.verifyToken, authJwt.isUser], ProposalsController.updateProposalByIdUser);
}