import mongoose from 'mongoose';

const RoleSchema = new mongoose.Schema({
    name: { type: String, required: true },
}, {
    versionKey: false,
});

const RoleModel = mongoose.model('Role', RoleSchema);

export const getRoles = () => RoleModel.find();
export const getRoleByName = (name: string) => RoleModel.findOne({ name });
export const getRoleById = (id: string) => RoleModel.findById(id);
export const getRolesByIds = (ids: mongoose.Types.ObjectId[]) => RoleModel.find({ _id: { $in: ids } });

export default RoleModel;