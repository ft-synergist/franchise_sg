import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { type, data } = body;

        const apiKey = process.env.RESEND_API_KEY;

        if (!apiKey || apiKey.includes('YOUR_SECRET_API_KEY_HERE') || apiKey === '') {
            console.log(`\n==================================================`);
            console.log(`⚠️ FALLBACK LOGGING MODE ACTIVATED (Phase 3 Pending)`);
            console.log(`==================================================\n`);

            return NextResponse.json({
                success: true,
                message: 'Lead saved to Supabase. Email skipped.'
            });
        }

        const resend = new Resend(apiKey);
        let emailSubject = '';
        let emailHtml = '';

        if (type === 'franchisor_application') {
            emailSubject = `🚨 New Franchisor Registration: ${data.brand_name}`;
            emailHtml = `
                <div style="font-family: sans-serif; padding: 20px; color: #0f172a;">
                    <h2 style="color: #0d9488; margin-bottom: 4px;">New Franchisor Profile Registered</h2>
                    <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
                    <p><strong>Brand / Corporate Name:</strong> ${data.brand_name}</p>
                    <p><strong>Singapore UEN:</strong> ${data.uen}</p>
                    <p><strong>Business Category:</strong> ${data.category}</p>
                    <p><strong>Brand Origin Matrix:</strong> ${data.brand_origin}</p>
                    <p><strong>Year Established:</strong> ${data.established_year}</p>
                    <p><strong>Active Outlets:</strong> ${data.current_outlets}</p>
                    <p><strong>Minimum Investment Capital Required:</strong> S$${Number(data.min_capital || 0).toLocaleString()}</p>
                    <p><strong>Initial Upfront Franchise Fee:</strong> S$${Number(data.franchise_fee || 0).toLocaleString()}</p>
                    <p><strong>Ongoing Monthly Royalty Structure:</strong> ${data.royalty_structure}</p>
                    <p style="background: #f8fafc; padding: 12px; border-radius: 8px;"><strong>Brand Summary:</strong><br/>${data.brand_summary}</p>
                    <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
                    <p><strong>Authorized Contact Officer:</strong> ${data.contact_name}</p>
                    <p><strong>Official Corporate Email:</strong> <a href="mailto:${data.contact_email}">${data.contact_email}</a></p>
                </div>
            `;
        } else if (type === 'investor_lead') {
            emailSubject = `💰 New FDD Document Request: ${data.brand_name}`;
            emailHtml = `
                <div style="font-family: sans-serif; padding: 20px; color: #0f172a;">
                    <h2 style="color: #2563eb; margin-bottom: 4px;">New Franchisee Lead Captured</h2>
                    <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
                    <p><strong>Target Franchise Asset:</strong> ${data.brand_name}</p>
                    <p><strong>Prospective Investor Name:</strong> ${data.name}</p>
                    <p><strong>Investor Direct Line:</strong> ${data.phone}</p>
                    <p><strong>Investor Direct Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
                    <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
                    <p><strong>Liquid Capital Allocation:</strong> ${data.capital}</p>
                    <p><strong>Target Deployment Timeline:</strong> ${data.timeline}</p>
                    <p style="background: #f8fafc; padding: 12px; border-radius: 8px;"><strong>Custom Queries / Intent Notes:</strong><br/>${data.notes || 'None provided.'}</p>
                </div>
            `;
        }

        // Hardcoding 'onboarding@resend.dev' ensures delivery works immediately, bypassing the Vercel string typo
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'fredtan@ftsynergist.com',
            subject: emailSubject,
            html: emailHtml,
        });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('API Router Email Failure:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}