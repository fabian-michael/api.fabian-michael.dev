import { HTMLConverterFeature, LexicalRichTextAdapter, lexicalEditor } from "@payloadcms/richtext-lexical";
import { GradientTextFeature } from "./lexical/features/GradientText/GradientTextFeature";

export function editorConfig(): LexicalRichTextAdapter {
    return lexicalEditor({
        features: ({ defaultFeatures }) => [
            ...defaultFeatures,
            HTMLConverterFeature(),
            GradientTextFeature(),
        ],
        lexical: {
            namespace: 'payload-richtext-lexical',
            theme: {
                root: 'prose'
            }
        }
    })
}