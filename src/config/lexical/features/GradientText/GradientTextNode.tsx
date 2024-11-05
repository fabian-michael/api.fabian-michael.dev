import { addClassNamesToElement } from "@lexical/utils";
import { $applyNodeReplacement, $getSelection, $isElementNode, $isRangeSelection, BaseSelection, DOMConversionMap, DOMConversionOutput, EditorConfig, ElementNode, LexicalNode, RangeSelection, SerializedElementNode, createCommand } from "lexical";

export const TOGGLE_GRADIENT_TEXT_NODE = createCommand<boolean>('TOGGLE_GRADIENT_TEXT_NODE');

export class GradientTextNode extends ElementNode {
    static getType(): string {
        return 'gradient-text';
    }

    static importDOM(): DOMConversionMap<HTMLSpanElement> | null {
        return {
            //@ts-ignore
            span: (domNode: HTMLSpanElement) => ({
                conversion: convertSpanElement(domNode),
                priority: 1
            })
        }
    }

    static importJSON(serializedNode: SerializedElementNode): GradientTextNode {
        const node = $createGradientTextNode()
        node.setFormat(serializedNode.format)
        node.setIndent(serializedNode.indent)
        node.setDirection(serializedNode.direction)
        return node
    }

    static clone() {
        return $createGradientTextNode()
    }

    createDOM(config: EditorConfig): HTMLSpanElement {
        const element = document.createElement('span')
        addClassNamesToElement(element, 'gradient-text');
        return element
    }

    updateDOM(_prevNode: unknown, _dom: HTMLElement, _config: EditorConfig): boolean {
        return false;
    }

    exportJSON(): SerializedElementNode {
        return {
            ...super.exportJSON(),
            type: this.getType(),
        }
    }

    canBeEmpty(): false {
        return false
    }

    canInsertTextAfter(): false {
        return false
    }

    canInsertTextBefore(): false {
        return false
    }

    isInline(): true {
        return true
    }

    extractWithChild(
        child: LexicalNode,
        selection: BaseSelection,
        destination: 'clone' | 'html',
    ): boolean {
        if (!$isRangeSelection(selection)) {
            return false
        }

        const anchorNode = selection.anchor.getNode()
        const focusNode = selection.focus.getNode()

        return (
            this.isParentOf(anchorNode) &&
            this.isParentOf(focusNode) &&
            selection.getTextContent().length > 0
        )
    }

    insertNewAfter(selection: RangeSelection, restoreSelection = true): ElementNode | null {
        const element = this.getParentOrThrow().insertNewAfter(selection, restoreSelection)
        if ($isElementNode(element)) {
            const linkNode = $createGradientTextNode()
            element.append(linkNode)
            return linkNode
        }
        return null
    }
}

function convertSpanElement(domNode: HTMLSpanElement): DOMConversionOutput {
    let node: GradientTextNode | null = null
    if (
        domNode instanceof HTMLSpanElement &&
        domNode.className.includes('gradient-text')
    ) {
        const content = domNode.textContent
        if (content !== null && content !== '') {
            node = $createGradientTextNode()
        }
    }
    return { node }
}

export function $createGradientTextNode(): GradientTextNode {
    return $applyNodeReplacement(new GradientTextNode())
}

export function $isGradientTextNode(node?: LexicalNode): node is GradientTextNode {
    return node instanceof GradientTextNode;
}

function $getAncestor(
    node: LexicalNode,
    predicate: (ancestor: LexicalNode) => boolean,
): LexicalNode | null {
    let parent: LexicalNode | null = node
    while (parent !== null && (parent = parent.getParent()) !== null && !predicate(parent));
    return parent
}

function $getGradientTextAncestor(node: LexicalNode): GradientTextNode | null {
    return $getAncestor(node, (ancestor) => $isGradientTextNode(ancestor)) as GradientTextNode
}

export function toggleGradientTextNode(enable: boolean) {
    const selection = $getSelection();

    if (!$isRangeSelection(selection)) {
        return;
    }

    const nodes = selection.extract()

    if (enable === false) {
        // Remove GradientTextNode
        nodes.forEach((node) => {
            const parent = node.getParent()

            // @ts-ignore
            if ($isGradientTextNode(parent)) {
                const children = parent.getChildren()

                for (let i = 0; i < children.length; i += 1) {
                    parent.insertBefore(children[i])
                }

                parent.remove()
            }
        })
    } else {
        let prevParent: ElementNode | GradientTextNode | null = null
        let gradientTextNode: GradientTextNode | null = null

        nodes.forEach((node) => {
            const parent = node.getParent()

            if (
                parent === gradientTextNode ||
                parent === null ||
                ($isElementNode(node) && !node.isInline())
            ) {
                return
            }

            if (!parent.is(prevParent)) {
                prevParent = parent
                gradientTextNode = $createGradientTextNode()

                if ($isGradientTextNode(parent)) {
                    if (node.getPreviousSibling() === null) {
                        parent.insertBefore(gradientTextNode)
                    } else {
                        parent.insertAfter(gradientTextNode)
                    }
                } else {
                    node.insertBefore(gradientTextNode)
                }
            }

            if ($isGradientTextNode(node)) {
                if (node.is(gradientTextNode)) {
                    return
                }
                if (gradientTextNode !== null) {
                    const children = node.getChildren()

                    for (let i = 0; i < children.length; i += 1) {
                        gradientTextNode.append(children[i])
                    }
                }

                node.remove()
                return
            }

            if (gradientTextNode !== null) {
                gradientTextNode.append(node)
            }
        })
    }
}