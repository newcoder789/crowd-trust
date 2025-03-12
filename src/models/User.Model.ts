import mongoose, { Document, Schema, Model } from 'mongoose';

export interface User extends Document {
    address: string;
    name: string;
    totalDonated: number;
    profileImage: string;
    donationHistory: { campaign: string; amount: number; date: Date }[];
    donatedCampaign: mongoose.Types.ObjectId[];
    createdCampaign: mongoose.Types.ObjectId[];
    createdAt: Date
}

const UserSchema: Schema<User> = new Schema({
    name: {type:String, required: true, default: "User"},
    address: { type: String, required: true, unique: true },
    totalDonated: { type: Number, default: 0 },
    profileImage: { type: String, default: 'https://res.cloudinary.com/dysuze5eq/image/upload/v1741265052/981d6b2e0ccb5e968a0618c8d47671da_y1ibyg.webp' },
    donationHistory: [{ campaign: String, amount: Number, date: Date }],
    donatedCampaign: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Campaign',
        default: []
    }],
    createdCampaign: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Campaign',
        default: []
    }],
    createdAt:{
        type:Date,
        default:Date.now()
    }
}, { timestamps: true });

let UserModel: Model<User>;
try {
    UserModel = mongoose.model<User>('User');
} catch {
    UserModel = mongoose.model<User>('User', UserSchema);
}

export default UserModel;