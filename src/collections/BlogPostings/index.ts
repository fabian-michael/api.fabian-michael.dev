import { CollectionConfig } from "payload/types";
import { isPublished } from "../../access/isPublished";
import { verifyUser } from "../../access/verifyUser";
import { richText } from "../../fields/richText";
import { formatSlug } from "../../hooks/formatSlug";

export const BlogPostings: CollectionConfig = {
    slug: 'blog-postings',
    admin: {
        useAsTitle: 'title',
    },
    versions: {
        drafts: true
    },
    access: {
        read: verifyUser({
            allowApiKeys: true,
            additionalAccess: isPublished
        }),
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            localized: true
        },
        {
            name: 'slug',
            label: 'Slug',
            type: 'text',
            index: true,
            localized: true,
            admin: {
                position: 'sidebar',
            },
            hooks: {
                beforeValidate: [
                    formatSlug('title')
                ],
            },
        },
        {
            name: 'abstract',
            type: 'textarea',
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            filterOptions: {
                mimeType: { contains: 'image' },
            },
        },
        ...richText('text')
    ]
}