import DonationConfirmationEmail from "../../../email/DonationConfirmationEmail";
import { renderToString } from 'react-dom/server';

import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from "next/server";
import puppeteer from 'puppeteer'; // Replace html-pdf with puppeteer
import DonationReceiptTemplate from "@/email/DonationReceiptTemplate"; // Ensure correct path

export const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest): Promise<NextResponse> {
    if (req.method === "POST") {
        try {
            console.log("Sending Your mail!");
            const { email, username, campaignName, campaignAddress, transactionHash, donationAmountUsd, donationDate } = await req.json();

            // Validate required fields
            if (!email || !username || !campaignName || !campaignAddress || !transactionHash || !donationAmountUsd || !donationDate) {
                return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
            }

            // Generate the receipt HTML directly from the template
            const receiptHtml = DonationReceiptTemplate({
                username,
                campaignName,
                campaignAddress,
                transactionHash,
                donationAmountUsd,
                donationDate,
            });

            // Launch Puppeteer to generate the PDF
            const browser = await puppeteer.launch({
                headless: true,
                args: ['--no-sandbox', '--disable-setuid-sandbox'], // Required for some environments
            });
            const page = await browser.newPage();
            await page.setContent(receiptHtml, { waitUntil: 'networkidle0' }); // Set the HTML content
            const pdfPath = path.join(__dirname, 'receipts', `${transactionHash}.pdf`);

            // Ensure the receipts directory exists
            const receiptsDir = path.dirname(pdfPath);
            if (!fs.existsSync(receiptsDir)) {
                fs.mkdirSync(receiptsDir, { recursive: true });
            }

            // Generate the PDF
            await page.pdf({
                path: pdfPath,
                format: 'A4',
                printBackground: true,
            });

            await browser.close();

            // Include the link to download the receipt in the email
            const receiptLink = `https://yourdomain.com/receipts/${transactionHash}.pdf`; // Update with your domain

            // Send the donation confirmation email with the receipt link
            const emailResponse = await resend.emails.send({
                from: "CrowdTrust  <onboarding@resend.dev>",
                to: email,
                subject: `Thank You for Your Donation to ${campaignName}`,
                html: renderToString(<DonationConfirmationEmail 
                    username={username}
                    campaignName={campaignName}
                    campaignAddress={campaignAddress}
                    transactionHash={transactionHash}
                    donationAmountUsd={donationAmountUsd}
                    donationDate={donationDate}
                    receiptLink={receiptLink} // Pass the receipt link to the email template
                />),
            });

            console.log("Email response:", emailResponse);
            return NextResponse.json({ success: true, message: "Donation confirmation email sent successfully" }, { status: 201 });
        } catch (error) {
            console.error("Error sending donation confirmation email:", (error as Error).message);
            return NextResponse.json({ success: false, message: "Failed to send donation confirmation email" }, { status: 500 });
        }
    } else {
        return NextResponse.json({ success: false, message: `Method ${req.method} Not Allowed` }, { status: 405 });
    }
}
