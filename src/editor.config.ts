import { HTMLConverterFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import { RichTextAdapter } from "payload/types";

export function editorConfig(): RichTextAdapter {
    return lexicalEditor({
        features: ({ defaultFeatures }) => [
            ...defaultFeatures,
            HTMLConverterFeature(),
        ],
    })
}