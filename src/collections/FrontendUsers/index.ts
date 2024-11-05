import { CollectionConfig } from 'payload/types';


export const Passkeys: CollectionConfig = {
    slug: 'passkeys',
    admin: {
        useAsTitle: 'name',
    },
    fields: [
        {
            name: 'id',
            label: 'Credential ID',
            type: 'text',

        },
        {
            name: 'name',
            label: 'Name',
            type: 'text',
            required: true,
        },
        {
            name: 'public_key',
            label: 'Public Key',
            type: 'textarea',
            required: true,
        },
        {
            name: 'algorithm',
            label: 'Algorithm',
            type: 'text',
            required: true,
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
            required: true,
        },
        {
            name: 'full_name',
            label: 'Full Name',
            type: 'text',
            required: true,
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
            required: true,
        },
        {
            name: 'company_address',
            label: 'Company Address',
            type: 'text',
            required: true,
        },
        {
            name: 'company_website',
            label: 'Company Website',
            type: 'text',
            required: true,
        },
        {
            name: 'message',
            label: 'Message',
            type: 'textarea',
            required: true,
        },
        {
            name: 'passkeys',
            label: 'Passkeys',
            type: 'relationship',
            relationTo: 'passkeys',
            hasMany: true,
            required: true,
            minRows: 1,
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