import path from 'path'

import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloud } from '@payloadcms/plugin-cloud'
import { buildConfig } from 'payload/config'

import { BlogPostings } from './collections/BlogPostings'
import { Media } from './collections/Media'
import Users from './collections/Users'
import { adminConfig } from './config/admin.config'
import { editorConfig } from './config/editor.config'
import { PAYLOAD_PUBLIC_FRONTEND_BASE } from './config/env.public'
import { expressConfig } from './config/express.config'
import { l10nConfig } from './config/l10n.config'
import { uploadConfig } from './config/upload.config'
import { Home } from './globals/Home'
import { LegalNotice } from './globals/LegalNotice'


export default buildConfig({
    collections: [
        Users,
        Media,
        BlogPostings,
    ],
    globals: [
        Home,
        LegalNotice
    ],
    admin: adminConfig(),
    editor: editorConfig(),
    upload: uploadConfig(),
    express: expressConfig(),
    localization: l10nConfig(),
    plugins: [
        payloadCloud()
    ],
    cors: [
        PAYLOAD_PUBLIC_FRONTEND_BASE
    ].filter(Boolean) as string[],
    db: mongooseAdapter({
        url: process.env.DATABASE_URI,
    }),
    typescript: {
        outputFile: path.resolve(__dirname, 'payload-types.ts'),
    },
    graphQL: {
        schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
    },
});
