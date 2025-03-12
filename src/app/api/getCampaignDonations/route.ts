import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { NextResponse } from 'next/server';

const ETH_TO_USD = 2500; // Example conversion rate from ETH to USD

interface Donor {
    donorAddress: string,
    result: string,
    amountDonated: number,
    transactionHash: string,
    gasSpent: number
}

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    // Check if req.url is defined
    if (!req.url) {
        return res.status(400).json({ error: "Invalid request URL." });
    }

    const { searchParams } = new URL(req.url);
    const address = searchParams.get('address');
    if (!address || Array.isArray(address)) {
        return res.status(400).json({ error: "Invalid campaign address." });
    }

    try {
        const response = await axios.get(
            `https://base-sepolia.blockscout.com/api/v2/addresses/${address}/transactions?filter=to%20%7C%20from`
        );
        const transactions = response.data.items;

        let totalWei = 0n;  // Explicitly define the type for donors
        let totalGasUsed = 0; 
        const donors: Donor[] = []; 

        transactions.forEach((tx: any) => {
            const value = BigInt(tx.value);
            totalWei += value;
            const amountDonated = (Number(value) / 1e18) * ETH_TO_USD;
            totalGasUsed += parseInt(tx.gas_used); 
            donors.push({
                donorAddress: tx.from,
                result: tx.result,
                amountDonated: amountDonated, // Convert Wei to ETH
                transactionHash: tx.hash,
                gasSpent: tx.gas_used,
            });
        });
        
        const totalDonatedUSD = (Number(totalWei) / 1e18) * ETH_TO_USD;        
        return NextResponse.json({ 
            totalDonated: totalDonatedUSD,
            totalGasUsed: totalGasUsed,
            donors: donors,
        }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch donation data." }, { status: 500 });
    }
}
