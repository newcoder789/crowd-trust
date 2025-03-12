import mongoose, { Document, Schema } from 'mongoose';
export interface Donation extends Document {
    donor: mongoose.Schema.Types.ObjectId;
    campaign: mongoose.Schema.Types.ObjectId;
    amount: number;
    transactionHash: string;
    createdAt: Date;
}

// Define the Donation schema
const DonationSchema: Schema<Donation> = new Schema({
    donor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Donar',
        required: true
    },
    campaign: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Campaign',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    transactionHash: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create the Donation model
export const DonationModel =  mongoose.model<Donation>("Donation", DonationSchema);

