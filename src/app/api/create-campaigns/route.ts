import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import  Campaign  from "@/models/All.Model";

export async function POST(req: Request) {
    try {
        await dbConnect();
        console.log("hello creating campaign.");

        const body = await req.json();
        console.log("Received Raw Data:", body);

        const { name, description, detail, goal, deadline, contractAddress, owner, uiImage, aiCheckImage } = body;

        console.log("Parsed Data:", name, description, contractAddress);
        // Check if campaign already exists
        const existingCampaign = await Campaign.findOne({ contractAddress });
        if (existingCampaign) {
            return NextResponse.json({ error: "Campaign already exists" }, { status: 400 });
        }

        // Create new campaign
        const newCampaign = new Campaign({ name, description, owner, contractAddress, goal, detail, deadline, uiImage, aiCheckImage });
        await newCampaign.save();

        return NextResponse.json({ success: true, campaign: newCampaign }, { status: 201 });
    } catch (error) {
        console.log("Error: ", error);

        if (error instanceof SyntaxError) {
            return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
        }

        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
