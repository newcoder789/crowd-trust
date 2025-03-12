import mongoose from 'mongoose';
// models/Vote.js
const VoteSchema = new mongoose.Schema({
    donor: { type: mongoose.Schema.Types.ObjectId, ref: 'Donar', required: true },
    campaign: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign', required: true },
    vote: { type: String, enum: ['approve', 'reject'], required: true },
    createdAt: { type: Date, default: Date.now }
});
export const Vote = mongoose.models.Vote ??  mongoose.model("Vote", VoteSchema)