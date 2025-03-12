import mongoose, { Document, Model } from "mongoose";
export interface INotification extends Document {
    donorId: string;
    campaignId: string;
    message: string;
    link: string;
    isRead?: boolean;
    createdAt?: Date;
}

const NotificationSchema = new mongoose.Schema({
    donorId: { type: String, required: true }, // Donor who should receive this notification
    campaignId: { type: String, required: true }, // Related campaign
    message: { type: String, required: true }, // Notification content
    link: { type: String, required: true }, // Where the notification redirects
    isRead: { type: Boolean, default: false }, // Track if donor has read it
    createdAt: { type: Date, default: Date.now }
}, {
    timestamps: true
});


let NotificationModel: Model<INotification>;
try {
    NotificationModel = mongoose.model<INotification>("Notification");
}
catch (error) {
    NotificationModel = mongoose.model<INotification>("Notification", NotificationSchema);
}
export default NotificationModel;
