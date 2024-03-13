import { FeatureProvider, HTMLConverter, convertLexicalNodesToHTML, getSelectedNode } from "@payloadcms/richtext-lexical";
import { FeaturesSectionWithEntries } from "@payloadcms/richtext-lexical/dist/field/features/common/floatingSelectToolbarFeaturesButtonsSection";
import { $isRangeSelection, SerializedElementNode } from "lexical";
import React from "react";
import { $isGradientTextNode, GradientTextNode, TOGGLE_GRADIENT_TEXT_NODE } from "./GradientTextNode";
import { GradientTextPlugin } from "./GradientTextPlugin";



/**
 * Gradient Text Feature
 * @returns 
 */
export const GradientTextFeature = (): FeatureProvider => ({
    key: 'gradient-text',
    feature: () => ({
        props: null,
        floatingSelectToolbar: {
            sections: [
                FeaturesSectionWithEntries([
                    {
                        key: 'gradient-text',
                        label: 'Gradient Text',
                        ChildComponent: () => Promise.resolve(
                            () => (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    width="20"
                                    height="20"
                                >
                                    <path
                                        fill="currentColor"
                                    // TODO
                                    />
                                </svg>
                            )
                        ),
                        isActive: ({ selection }) => {
                            if ($isRangeSelection(selection)) {
                                const selectedNode = getSelectedNode(selection);
                                const parent = selectedNode.getParent();

                                return $isGradientTextNode(parent);

                            }
                            return false;
                        },
                        onClick: ({ editor, isActive }) => {
                            editor.update(() => {
                                console.log(isActive);

                                if (isActive) {
                                    editor.dispatchCommand(TOGGLE_GRADIENT_TEXT_NODE, false);
                                } else {
                                    editor.dispatchCommand(TOGGLE_GRADIENT_TEXT_NODE, true);
                                }
                            })
                        },
                    },
                ]),
            ],
        },
        plugins: [
            {
                Component: () => Promise.resolve(GradientTextPlugin),
                position: 'normal'
            }
        ],
        nodes: [
            {
                node: GradientTextNode,
                type: GradientTextNode.getType(),
                converters: {
                    html: {
                        converter: async ({ converters, node, parent }) => {
                            const childrenText = await convertLexicalNodesToHTML({
                                converters,
                                lexicalNodes: node.children,
                                parent: {
                                    ...node,
                                    parent,
                                },
                            });

                            return `<span class="gradient-text">${childrenText}</span>`;
                        },
                        nodeTypes: [GradientTextNode.getType()],
                    } as HTMLConverter<SerializedElementNode>,
                },

            },
        ]
    }),
});