import dbConnect from '@/lib/dbConnect';
import  CampaignModel  from "@/models/All.Model"
import { NextResponse } from 'next/server';
export async function GET(req: Request) { //, {params}: {params: {campaignAddress: string}}
  try {
    const {searchParams} = new URL(req.url);
    const campaignAddress = searchParams.get('campaignAddress');
    console.log("Campaign address in ui from params", campaignAddress);
    if (!campaignAddress) {
      return NextResponse.json({ error: 'Campaign Address is required' }, { status: 400 });
    }

    await dbConnect();
    const campaign = await CampaignModel.findOne({ contractAddress: campaignAddress });
    console.log("Campaign mil gya: ", campaign);
    if (!campaign) {
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
    }

    return NextResponse.json(campaign);
  } catch (error) {
    console.log('Error fetching campaign:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
