interface DonationReceiptProps {
    username: string;
    campaignName: string;
    campaignAddress: string;
    transactionHash: string;
    donationAmountUsd: number;
    donationDate: string;
}

const DonationReceiptTemplate = ({
    username,
    campaignName,
    campaignAddress,
    transactionHash,
    donationAmountUsd,
    donationDate,
}: DonationReceiptProps): string => {
    // Return a plain HTML string instead of JSX
    return `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ccc; border-radius: 5px;">
            <h1 style="text-align: center;">Donation Receipt</h1>
            <p><strong>Donor Name:</strong> ${username}</p>
            <p><strong>Campaign Name:</strong> ${campaignName}</p>
            <p><strong>Campaign Address:</strong> ${campaignAddress}</p>
            <p><strong>Transaction Hash:</strong> ${transactionHash}</p>
            <p><strong>Donation Amount:</strong> $${donationAmountUsd.toFixed(2)}</p>
            <p><strong>Donation Date:</strong> ${donationDate}</p>
            <p style="text-align: center;">Thank you for your generous support!</p>
            <p style="text-align: center;">This receipt can be used for tax relief purposes.</p>
        </div>
    `;
};

export default DonationReceiptTemplate;