import mongoose, { Schema, Document, Model } from 'mongoose';

interface ICreator extends Document {
    address: string;
    name: string;
    bio: string;
    profileImage: string;
}

const CreatorSchema: Schema = new Schema({
    address: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    bio: { type: String, required: true },
    profileImage: { type: String, required: true },
});

const Creator: Model<ICreator> = mongoose.models.Creator || mongoose.model<ICreator>('Creator', CreatorSchema);

export default Creator;