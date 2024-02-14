import { lexicalHTML } from "@payloadcms/richtext-lexical";
import { Field } from "payload/types";

export function richText(name: string): Field[] {
    return [
        {
            name,
            type: 'richText',
        },
        lexicalHTML(name, {
            name: `${name}_html`,
        }),
    ]
}