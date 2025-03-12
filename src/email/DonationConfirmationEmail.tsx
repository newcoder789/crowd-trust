import React from 'react';

interface DonationConfirmationEmailProps {
    receiptLink: string; // Added receiptLink to the props
    username: string;
    campaignName: string;
    campaignAddress: string;
    transactionHash: string;
    donationAmountUsd: number;
    donationDate: string;
}

const DonationConfirmationEmail: React.FC<DonationConfirmationEmailProps> = ({
    username,
    campaignName,
    campaignAddress,
    transactionHash,
    donationAmountUsd,
    donationDate,
    receiptLink,
}) => {
    return (
        <div>
            <h1>Thank You for Your Donation, {username}!</h1>
            <p>We appreciate your generous support for <strong>{campaignName}</strong>.</p>
            <p>Your donation of <strong>${donationAmountUsd.toFixed(2)}</strong> has been successfully processed.</p>
            <p>Donation Date: <strong>{donationDate}</strong></p>
            <p>Transaction Hash: <strong>{transactionHash}</strong></p>
            <p>If you have any questions, feel free to reach out to us.</p>
            <p>Thank you for making a difference!</p>
            <p>Download your receipt: <a href={receiptLink} target="_blank" rel="noopener noreferrer">Click here</a></p>
            <p>Best regards,<br />The CrowdTrust Team</p>
        </div>
    );
};

export default DonationConfirmationEmail;