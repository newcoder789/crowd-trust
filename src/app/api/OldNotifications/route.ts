import dbConnect from "@/lib/dbConnect";
import NotificationModel, { INotification } from "@/models/Notifications";
import { NextRequest, NextResponse } from "next/server";


export  async function POST (req: NextRequest, res: NextResponse): Promise<NextResponse> {
    await dbConnect();

    if (req.method === "POST") {
        try {
            const { donorId, campaignId, message, link }: INotification = await req.json();

            if (!donorId || !campaignId || !message || !link) {
                return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
            }

            const newNotification = await NotificationModel.create({
                donorId,
                campaignId,
                message,
                link,
                isRead: false,
            });
            return NextResponse.json({ success: true, notification: newNotification }, { status: 201 });
        } catch (error) {
            console.error("Error creating notification:", error);
            return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
        }
    } else {
        return NextResponse.json({ error: `Method ${req.method} Not Allowed` }, { status: 405 });
    }
};

export async function GET (req: NextRequest) {
    await dbConnect();

    try {
        const donorId = req.nextUrl.searchParams.get('donorId');
        if (!donorId) {
            return NextResponse.json({ error: "Missing donorId parameter" }, { status: 400 });
        }
        const notifications = await NotificationModel.find({ donorId: donorId });
        console.log(notifications, donorId);
        return NextResponse.json({ success: true, notifications }, { status: 200 });
    } catch (error) {
        console.error("Error fetching notifications:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
};
