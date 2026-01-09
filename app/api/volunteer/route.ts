import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, firstName, email, phone, address, roles, hasExperience, previousFestival, previousRole, slots, availabilityStart, availabilityEnd, comment } = body;

        // Basic validation
        if (!name || !firstName || !email || !phone || !address || !roles || roles.length === 0 || !slots || !availabilityStart || !availabilityEnd) {
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
            previousRole: hasExperience ? previousRole : undefined,
            slots,
            availabilityStart,
            availabilityEnd,
            comment,
        });

        // Send Email Notification
        try {
            const { data, error } = await resend.emails.send({
                from: 'Bénévoles Bassstival <onboarding@resend.dev>', // Update this if you have a verified domain
                to: ['benevoles.bassstival@gmail.com'],
                subject: `Nouvelle inscription Bénévoles : ${firstName} ${name}`,
                html: `
                    <h1>Nouvelle inscription Bénévoles ! 🎉</h1>
                    <p><strong>Nom :</strong> ${name}</p>
                    <p><strong>Prénom :</strong> ${firstName}</p>
                    <p><strong>Email :</strong> ${email}</p>
                    <p><strong>Téléphone :</strong> ${phone}</p>
                    <p><strong>Adresse :</strong> ${address}</p>
                    <hr />
                    <p><strong>Postes souhaités :</strong> ${roles.join(', ')}</p>
                    <p><strong>Créneaux souhaités :</strong> ${slots}</p>
                    <p><strong>Disponibilités :</strong><br/>
                       Du : ${new Date(availabilityStart).toLocaleString('fr-FR')}<br/>
                       Au : ${new Date(availabilityEnd).toLocaleString('fr-FR')}
                    </p>
                    ${comment ? `
                    <hr />
                    <p><strong>Commentaire :</strong><br/>
                    ${comment.replace(/\n/g, '<br/>')}
                    </p>
                    ` : ''}
                    <hr />
                    ${hasExperience ? `
                        <p><strong>Expérience :</strong> OUI</p>
                        <p><strong>Ancien Festival :</strong> ${previousFestival}</p>
                        <p><strong>Ancien Poste :</strong> ${previousRole}</p>
                    ` : '<p><strong>Expérience :</strong> NON</p>'}
                    <hr />
                    <a href="https://bassstival-benevoles.sanity.studio/desk/volunteer/${result._id}">Voir dans Sanity</a>
                `,
            });

            if (error) {
                console.error('Error sending email:', error);
                // Do not fail the request if email fails, but log it
            }
        } catch (emailError) {
            console.error('Unexpected error sending email:', emailError);
        }

        return NextResponse.json({ message: 'Success', id: result._id }, { status: 200 });
    } catch (error) {
        console.error('Error submitting form:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
