import mongoose from "mongoose";

const ActivitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
}, {
    versionKey: false,
});

const ActivityModel = mongoose.model('Activity', ActivitySchema);

export const getActivities = () => ActivityModel.find();
export const getActivityById = (id: string) => ActivityModel.findById(id);
export const createActivity = (values: Record<string, any>) => new ActivityModel(values).save().then((activity) => activity.toObject());;
export const deleteActivityById = (id: string) => ActivityModel.findByIdAndDelete(id);
export const deleteActivityImageById = (id: string) => ActivityModel.findByIdAndUpdate(id, { $unset: { image: 1 } }, { new: true });
export const updateActivityById = (id: string, values: Record<string, any>) => ActivityModel.findByIdAndUpdate(id, values, { new: true });