import path from 'path'

import { viteBundler } from '@payloadcms/bundler-vite'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloud } from '@payloadcms/plugin-cloud'
import { buildConfig } from 'payload/config'

import { BlogPostings } from './collections/BlogPostings'
import { Media } from './collections/Media'
import Users from './collections/Users'
import { editorConfig } from './config/editor.config'
import { PAYLOAD_PUBLIC_FRONTEND_BASE } from './config/env.public'
import { l10nConfig } from './config/l10n.config'
import { livePreviewConfig } from './config/livePreview.config'
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
    admin: {
        user: Users.slug,
        bundler: viteBundler(),
        livePreview: PAYLOAD_PUBLIC_FRONTEND_BASE &&
            livePreviewConfig(),
    },
    editor: editorConfig(),
    upload: uploadConfig(),
    express: ,
    plugins: [
        payloadCloud()
    ],
    localization: l10nConfig(),
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
