import { lexicalHTML } from "@payloadcms/richtext-lexical";
import { GlobalConfig } from "payload/types";
import { verifyUser } from "../../access/verifyUser";
import { FrontendUsers } from "../../collections/FrontendUsers";

export const Resume: GlobalConfig = {
    access: {
        read: verifyUser({
            allowedUserCollections: [FrontendUsers.slug]
        }),
    },
    slug: 'resume',
    fields: [
        {
            name: 'title',
            type: 'text',
        },
        {
            name: 'text',
            type: 'richText',
        },
        lexicalHTML('text', {
            name: 'text_html'
        }),
    ]
}