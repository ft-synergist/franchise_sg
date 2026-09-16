import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { type, data } = body;

        // ==================================================
        // 🔄 CRM WEBHOOK INGESTION LAYER
        // ==================================================
        try {
            const crmUrl = process.env.CRM_WEBHOOK_URL || 'https://growingbeyondborders.com/api/v1/leads/capture';

            // Map inbound enquiry data into a structured CRM lead payload
            const crmPayload = {
                tenant_id: '47e5215d-458c-4f7a-928d-15fbebc2058a', // Franchise SG Workspace
                name: type === 'brand_payment_onboarding' ? data.contact_name : (type === 'franchisor_application' ? data.contact_name : data.name),
                email: type === 'brand_payment_onboarding' ? data.contact_email : (type === 'franchisor_application' ? data.contact_email : data.email),
                phone: type === 'brand_payment_onboarding' ? (data.contact_phone || 'Not Provided') : (type === 'franchisor_application' ? (data.phone || 'Not Provided') : data.phone),
                brand_name: data.brand_name || undefined,
                web_source: 'franchise.sg',
                pipeline_stage: type === 'brand_payment_onboarding' ? 'won_customer' : 'lead_prospect',
                status: type === 'brand_payment_onboarding' ? 'verified_partner' : 'new',
                notes: type === 'brand_payment_onboarding'
                    ? `[S$600 Verified Partner Listing Activated] TxID: ${data.transaction_id} | Payment Method: ${data.payment_method}`
                    : (data.notes || (type === 'franchisor_application' ? data.brand_summary : '') || ''),
            };

            const crmResponse = await fetch(crmUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-tenant-key': '47e5215d-458c-4f7a-928d-15fbebc2058a',
                    'User-Agent': 'FranchiseSG-Webhook-Dispatcher/1.0'
                },
                body: JSON.stringify(crmPayload),
                signal: AbortSignal.timeout(8000)
            });

            if (!crmResponse.ok) {
                console.warn(`CRM Webhook responded with status: ${crmResponse.status} ${crmResponse.statusText}`);
            } else {
                console.log(`CRM Webhook dispatch successful (${type}) to ${crmUrl}`);
            }
        } catch (crmError) {
            console.error('CRM Webhook Dispatch Error:', crmError);
        }

        // ==================================================
        // 📧 ORIGINAL EMAIL BACKUP DISPATCH LOGIC
        // ==================================================
        const apiKey = process.env.RESEND_API_KEY;

        if (!apiKey || apiKey.includes('YOUR_SECRET_API_KEY_HERE') || apiKey === '') {
            console.log(`\n==================================================`);
            console.log(`⚠️ FALLBACK LOGGING MODE ACTIVATED (Phase 3 Pending)`);
            console.log(`==================================================\n`);

            return NextResponse.json({
                success: true,
                message: 'Lead saved to Supabase & CRM routed. Email skipped.'
            });
        }

        const resend = new Resend(apiKey);
        let emailSubject = '';
        let emailHtml = '';

        if (type === 'brand_payment_onboarding') {
            emailSubject = `🎉 Paid Listing Onboarding: ${data.brand_name} (S$600.00)`;
            emailHtml = `
                <div style="font-family: sans-serif; padding: 20px; color: #0f172a;">
                    <h2 style="color: #059669; margin-bottom: 4px;">Verified Brand Partner Onboarding Activated!</h2>
                    <p style="color: #475569; font-size: 14px;"><strong>${data.brand_name}</strong> has activated their S$600/year Verified Listing Agreement.</p>
                    <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
                    <p><strong>Brand Name:</strong> ${data.brand_name}</p>
                    <p><strong>Authorized Officer:</strong> ${data.contact_name}</p>
                    <p><strong>Corporate Email:</strong> <a href="mailto:${data.contact_email}">${data.contact_email}</a></p>
                    <p><strong>Singapore UEN:</strong> ${data.uen || 'N/A'}</p>
                    <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
                    <p><strong>Payment Method:</strong> ${data.payment_method.toUpperCase()}</p>
                    <p><strong>Amount Paid / Invoiced:</strong> S$600.00 Net</p>
                    <p><strong>Transaction Reference:</strong> <code>${data.transaction_id}</code></p>
                    <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
                    <p style="background: #ecfdf5; padding: 12px; border-radius: 8px; color: #065f46;">
                        <strong>Action Required:</strong> Lead routing rules updated. Unlock and release active buyer lead details to ${data.contact_email}.
                    </p>
                </div>
            `;
        } else if (type === 'franchisor_application') {
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