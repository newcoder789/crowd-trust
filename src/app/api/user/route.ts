import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.Model";
import { NextResponse } from "next/server";
import { User } from "@/models/User.Model";

interface Request {
    url: string;
}


export async function GET(req: Request): Promise<NextResponse> {
    const { searchParams } = new URL(req.url);
    const address = searchParams.get("address");
    await dbConnect();
    const user = await UserModel.findOne({ address }) as User | null;
    console.log("Found the user", user);
    return NextResponse.json(user || { name: "Unknown", totalDonations: 0 });
}