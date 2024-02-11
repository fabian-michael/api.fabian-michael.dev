import path from 'path'

import { webpackBundler } from '@payloadcms/bundler-webpack'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloud } from '@payloadcms/plugin-cloud'
import { HTMLConverterFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload/config'

import { Media } from './collections/Media'
import Users from './collections/Users'
import { Home } from './globals/Home'
import { buildUrl } from './utils'

const DEFAUlT_LOCALE = 'en';
const PAYLOAD_PUBLIC_FRONTEND_BASE = process.env.PAYLOAD_PUBLIC_FRONTEND_BASE;

export default buildConfig({
    admin: {
        user: Users.slug,
        bundler: webpackBundler(),
        livePreview: PAYLOAD_PUBLIC_FRONTEND_BASE && {
            url: ({ data, documentInfo, locale }) => buildUrl([
                PAYLOAD_PUBLIC_FRONTEND_BASE,
                locale.code !== DEFAUlT_LOCALE && locale.code,
                data.slug !== 'home' && data.slug
            ].filter(Boolean)),
            globals: [
                'home',
            ],
            breakpoints: [
                {
                    label: 'Mobile',
                    name: 'mobile',
                    width: 375,
                    height: 667,
                },
                {
                    label: 'Tablet',
                    name: 'tablet',
                    width: 768,
                    height: 1024,
                },
                {
                    label: 'Desktop',
                    name: 'desktop',
                    width: 1440,
                    height: 900,
                },
            ]
        }
    },
    editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
            ...defaultFeatures,
            HTMLConverterFeature(),
        ],
    }),
    collections: [
        Users,
        Media,
    ],
    globals: [Home],
    typescript: {
        outputFile: path.resolve(__dirname, 'payload-types.ts'),
    },
    graphQL: {
        schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
    },
    plugins: [payloadCloud()],
    db: mongooseAdapter({
        url: process.env.DATABASE_URI,
    }),
    localization: {
        locales: [
            {
                code: 'en',
                label: 'English',
            },
            {
                code: 'de',
                label: 'German',
            }
        ],
        defaultLocale: DEFAUlT_LOCALE,
        fallback: true,
    },
});
