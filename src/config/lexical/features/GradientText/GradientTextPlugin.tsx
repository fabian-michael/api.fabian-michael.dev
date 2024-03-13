'use client';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { COMMAND_PRIORITY_NORMAL } from 'lexical';
import { FunctionComponent, useEffect } from 'react';
import { GradientTextNode, TOGGLE_GRADIENT_TEXT_NODE, toggleGradientTextNode } from './GradientTextNode';

export const GradientTextPlugin: FunctionComponent = () => {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        if (!editor.hasNodes([GradientTextNode])) {
            throw new Error('GradientTextPlugin: GradientTextNode not registered on editor')
        }

        return editor.registerCommand(
            TOGGLE_GRADIENT_TEXT_NODE,
            (enable) => {
                toggleGradientTextNode(enable);
                return true;
            },
            COMMAND_PRIORITY_NORMAL,
        )
    }, [editor]);

    return null;
}