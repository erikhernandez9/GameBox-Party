import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    hostedBy: { ref: 'User', type: mongoose.Schema.Types.ObjectId, select: false},
    hostedByName: { type: String, required: true },
    proposal: { ref: 'Proposal', type: mongoose.Schema.Types.ObjectId },
    participants: [{ type: String }],
    state: { type: String, enum: ['waiting', 'running', 'finished'], default: 'waiting' },
    roomId: { type: String, required: true, unique: true },
}, {
    timestamps: true,
    versionKey: false,
});

const RoomModel = mongoose.model('Room', RoomSchema);

export const getRooms = () => RoomModel.find();
export const getRoomById = (id: string) => RoomModel.findById(id);
export const getRoomByRoomId = (roomId: string) => RoomModel.findOne({ roomId });
export const createRoom = (values: Record<string, any>) => new RoomModel(values).save().then((Room) => Room.toObject());;
export const deleteRoomById = (id: string) => RoomModel.findByIdAndDelete(id);
export const updateRoomById = (id: string, values: Record<string, any>) => RoomModel.findByIdAndUpdate(id, values, { new: true });