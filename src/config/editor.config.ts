import { HTMLConverterFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import { RichTextAdapter } from "payload/types";
import { GradientTextFeature } from "./lexical/features/GradientText/GradientTextFeature";

export function editorConfig(): RichTextAdapter {
    return lexicalEditor({
        features: ({ defaultFeatures }) => [
            ...defaultFeatures,
            HTMLConverterFeature(),
            GradientTextFeature(),
        ],
        lexical: {
            theme: {
                root: 'prose'
            }
        }
    })
}