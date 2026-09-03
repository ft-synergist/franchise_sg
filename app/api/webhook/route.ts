import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json().catch(() => ({}));
        console.log('Received CRM Webhook Payload:', JSON.stringify(body, null, 2));

        return NextResponse.json({
            success: true,
            message: 'Webhook received successfully',
            timestamp: new Date().toISOString()
        }, { status: 200 });
    } catch (error: any) {
        console.error('Webhook processing error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json({
        status: 'active',
        service: 'Franchise SG CRM Webhook Endpoint',
        timestamp: new Date().toISOString()
    });
}
