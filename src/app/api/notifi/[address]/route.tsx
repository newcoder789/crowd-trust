import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
    const address = req.nextUrl.searchParams.get("address");
    // Mock database (replace with real database)
    const notifications = [
      {
        id: "1",
        message: "New proposal created in campaign 0x462D6e94F2EA99d4C13E3eEA30EC5A1A4e12505C.",
        link: "/campaigns/0x462D6e94F2EA99d4C13E3eEA30EC5A1A4e12505C/proposal",
        read: false,
      },
    ];
  
    return NextResponse.json({success:true, data:notifications});
  }