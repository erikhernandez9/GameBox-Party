import mongoose from "mongoose";

const ProposalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    createdById: { ref: 'User', type: mongoose.Schema.Types.ObjectId, select: false, required: true},
    createdByUsername: { type: String, required: true },
    activities: [{ ref: 'Activity', type: mongoose.Schema.Types.ObjectId, required: true}],
}, {
    timestamps: true,
    versionKey: false,
});

const ProposalModel = mongoose.model('Proposal', ProposalSchema);

export const getProposals = () => ProposalModel.find();
export const getProposalById = (id: string) => ProposalModel.findById(id);
export const createProposal = (values: Record<string, any>) => new ProposalModel(values).save().then((Proposal) => Proposal.toObject());
export const updateActivities = (activityId: string) => ProposalModel.updateMany({ activities: activityId }, { $pull: { activities: activityId } });

//Admin exclusive
export const deleteProposalById = (id: string) => ProposalModel.findByIdAndDelete(id);
export const updateProposalById = (id: string, values: Record<string, any>) => ProposalModel.findByIdAndUpdate(id, values, { new: true });

//User exlusive
export const getProposalsByIdUser = (id: string) => ProposalModel.find({ createdById: id });
export const getProposalByIdUser = (userId: string, proposalId: string) => ProposalModel.findOne({ createdById: userId, _id: proposalId });
export const deleteProposalByIdUser = (userId: string, proposalId: string) => ProposalModel.findOneAndDelete({ createdById: userId, _id: proposalId });
export const updateProposalByIdUser = (userId: string, proposalId: string, values: Record<string, any>) => ProposalModel.findOneAndUpdate({ createdById: userId, _id: proposalId }, values, { new: true });
