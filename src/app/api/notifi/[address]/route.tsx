import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
    const address = req.nextUrl.searchParams.get("address");
    // Mock database (replace with real database)
    const notifications = [
      {
        id: "1",
        message: "New proposal created in campaign process.env.CONTRACT_ADRESS.",
        link: `/campaigns/${process.env.CONTRACT_ADRESS}/proposal`,
        read: false,
      },
    ];
  
    return NextResponse.json({success:true, data:notifications});
  }
