import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, firstName, email, phone, address, roles, hasExperience, previousFestival } = body;

        // Basic validation
        if (!name || !firstName || !email || !phone || !address || !roles || roles.length === 0) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        // Create document in Sanity
        // Note: In a real scenario, you'd use a server-side token with write access.
        // Ensure SANITY_API_TOKEN is set in .env.local
        const token = process.env.SANITY_API_TOKEN;
        if (!token) {
            console.error("Missing SANITY_API_TOKEN");
            return NextResponse.json({ message: 'Configuration Error: Missing API Token' }, { status: 500 });
        }

        const clientWithToken = client.withConfig({ token });

        const result = await clientWithToken.create({
            _type: 'volunteer',
            name,
            firstName,
            email,
            phone,
            address,
            roles,
            hasExperience,
            previousFestival: hasExperience ? previousFestival : undefined,
        });

        return NextResponse.json({ message: 'Success', id: result._id }, { status: 200 });
    } catch (error) {
        console.error('Error submitting form:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
