import { CollectionConfig } from "payload/types";
import { richText } from "../../fields/richText";
import { publishedOrLoggedIn } from "./acess/publishedOrLoggedIn";
import { formatSlug } from "./hooks/formatSlug";

export const BlogPostings: CollectionConfig = {
    slug: 'blog-postings',
    admin: {
        useAsTitle: 'title',
    },
    versions: {
        drafts: true
    },
    access: {
        read: publishedOrLoggedIn,
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