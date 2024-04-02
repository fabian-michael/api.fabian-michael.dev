import path from 'path'

import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloud } from '@payloadcms/plugin-cloud'
import { buildConfig } from 'payload/config'

import { collections } from './collections'
import { adminConfig } from './config/admin.config'
import { corsConfig } from './config/cors.config'
import { editorConfig } from './config/editor.config'
import { PAYLOAD_SERVER_URL } from './config/env.private'
import { expressConfig } from './config/express.config'
import { l10nConfig } from './config/l10n.config'
import { uploadConfig } from './config/upload.config'
import { Home } from './globals/Home'
import { LegalNotice } from './globals/LegalNotice'
import { Resume } from './globals/Resume'


export default buildConfig({
    collections,
    globals: [
        Home,
        LegalNotice,
        Resume,
    ],
    serverURL: PAYLOAD_SERVER_URL,
    admin: adminConfig(),
    editor: editorConfig(),
    upload: uploadConfig(),
    express: expressConfig(),
    localization: l10nConfig(),
    cors: corsConfig(),
    plugins: [
        payloadCloud()
    ],
    db: mongooseAdapter({
        url: process.env.DATABASE_URI!,
    }),
    typescript: {
        outputFile: path.resolve(__dirname, 'payload-types.ts'),
    },
    graphQL: {
        schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
    },
});
