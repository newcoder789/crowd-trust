import mongoose, { Schema, Document, Model  } from "mongoose";

export interface IProposal extends Document {
    campaignId: string;
    proposer: string;
    title: string;
    reason: string;
    amountRequested: number;
    proofImage?: string;
    status: "pending" | "approved" | "rejected";
    createdAt?: Date;
  }


const ProposalSchema = new mongoose.Schema({
    campaignId: { type: String, required: true },
    proposer: { type: String, required: true },
    reason: { type: String, required: true },
    title: { type: String, required: true },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
    amountRequested: { type: Number },
    proofImage: { type: String },
    createdAt: { type: Date, default: Date.now },
},
{ timestamps: true });
let Proposal:Model<IProposal>;
try {
    Proposal = mongoose.model<IProposal>("Proposal");
} catch (error) {
    Proposal = mongoose.model<IProposal>("Proposal", ProposalSchema);
}

export { Proposal };