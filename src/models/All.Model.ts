import mongoose, { Schema, Document, models, Model } from "mongoose";
import { Scheduler } from "timers/promises";


export interface Message extends Document{
    content: String;
    createdAt:Date;
}

const MessageSchema: Schema<Message>=new Schema({
    content:{
        type: String,
        required:true
    },
    createdAt:{
        type: Date,
        required:true,
        default:Date.now
    }
})
interface NewType {
        user: {
            type: mongoose.Schema.Types.ObjectId;
            ref: "User";
        };
        amount: number;
        timestamp: Date;
    }
export interface Campaign extends Document {
    name: string;
    description: string;
    detail: string;
    owner: string; // Reference to the User model
    contractAddress: string;
    deadline: Date;
    uiImage: string;
    aiCheckImage: string;
    goal: number;
    status: "pending" | "approved" | "rejected";
    fraudReported: boolean;
    fraudNo: number;
    createdAt: Date;
    donors: [NewType],
}

// Define the Campaign schema
const CampaignSchema: Schema<Campaign> = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    detail: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    contractAddress: {
        type: String,
        required: true,
        unique: true
    },
    deadline: {
        type: Date,
        required: true
    },
    uiImage: {
        type: String,
        required: true
    },
    aiCheckImage: {
        type: String,
        required: true
    },
    goal: {
        type: Number,
        required: true
    },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
    fraudReported: {
        type: Boolean,
        default: false
    },
    fraudNo: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    donors: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        amount: { type: Number, required: true },
        timestamp: { type: Date, default: Date.now }
    }],
},
{ timestamps: true });

let CampaignModel:Model<Campaign>;
try{
    CampaignModel = mongoose.model<Campaign>("Campaign");
}catch{
    CampaignModel=mongoose.model<Campaign>("Campaign",CampaignSchema)
}

// Create the Campaign modelmongoose.model<Campaign>("Campaign", CampaignSchema, "Campaigns")
// const CampaignModel =  mongoose.models.Campaign ;
console.log("campaign model is working " , CampaignModel)
export default CampaignModel;
// Define the interface for the Donation document

// interfaces/index.ts
export interface IDonar {
    walletAddress: string;
    name?: string;
    email?: string;
    createdAt?: Date;
}

export interface CampaignData {
    _id: string;
    name: string;
    description: string;
    detail: string;
    owner: string;
    contractAddress: string;
    goal: number;
    fraudNo: number;
    fraudReported: boolean;
    createdAt: string;
    aiCheckImage: string;
    uiImage: string;
}
export interface IDonation {
    donor: string;
    campaign: string;
    amount: number;
    transactionHash: string;
    createdAt?: Date;
}

export interface IVote {
    donor: string;
    campaign: string;
    vote: 'approve' | 'reject';
    createdAt?: Date;
}



