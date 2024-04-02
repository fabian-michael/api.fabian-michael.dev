import { CollectionConfig } from 'payload/types';


export const Passkeys: CollectionConfig = {
    slug: 'passkeys',
    fields: [
        {
            name: 'user',
            label: 'User',
            type: 'relationship',
            relationTo: 'frontend-users',
            hasMany: false,
        },
        {
            name: 'name',
            label: 'Name',
            type: 'text',
        },
        {
            name: 'credential_id',
            label: 'Credential ID',
            type: 'text',
        },
        {
            name: 'public_key',
            label: 'Public Key',
            type: 'textarea',
        },
    ]
};

export const FrontendUsers: CollectionConfig = {
    slug: 'frontend-users',
    admin: {
        useAsTitle: 'email',
    },
    fields: [
        {
            name: 'email',
            label: 'E-mail',
            type: 'text',
        },
        {
            name: 'full_name',
            label: 'Full Name',
            type: 'text',
        },
        {
            name: 'phone',
            label: 'Phone',
            type: 'text',
        },
        {
            name: 'company',
            label: 'Company',
            type: 'text',
        },
        {
            name: 'company_address',
            label: 'Company Address',
            type: 'text',
        },
        {
            name: 'company_website',
            label: 'Company Website',
            type: 'text',
        },
        {
            name: 'message',
            label: 'Message',
            type: 'textarea',
        }
    ],
    hooks: {
        afterChange: [
            async ({ operation, req }) => {
                if (operation === 'create') {
                    const recipient = 'test@example.com' // TODO: get from settings
                    await req.payload.sendEmail({
                        to: recipient,
                        subject: 'New user registered',
                        text: 'A new user registered on your website. Please check the admin panel for more details.'
                    })
                }
            }
        ]
    }
}