/**
 * author: Ralph Varjabedian
 */
export type PriorityHeapCallback<PriorityHeapNode> =
    (nodeA: PriorityHeapNode, nodeB: PriorityHeapNode) => boolean;

class PriorityHeapNode<PriorityHeapNodeType> {
    node: PriorityHeapNodeType;
    nextRight: PriorityHeapNode<PriorityHeapNodeType> | undefined;
    nextLeft: PriorityHeapNode<PriorityHeapNodeType> | undefined;

    constructor(node: PriorityHeapNodeType) {
        this.node = node;
    }
}

export interface IPriorityHeap<PriorityHeapNodeType> {
    describeHeapStructure(): { from: PriorityHeapNodeType, to: PriorityHeapNodeType }[];
}

export class PriorityHeap<PriorityHeapNodeType> implements IPriorityHeap<PriorityHeapNodeType> {
    private tree: PriorityHeapNode<PriorityHeapNodeType> | undefined = undefined;
    private readonly priorityCallback: PriorityHeapCallback<PriorityHeapNodeType>;

    constructor(priorityCallback: PriorityHeapCallback<PriorityHeapNodeType>) {
        this.priorityCallback = priorityCallback;
    }

    push(node: PriorityHeapNodeType) {
        if (this.tree === undefined) {
            this.tree = new PriorityHeapNode<PriorityHeapNodeType>(node);
            return;
        }
        const queue: PriorityHeapNode<PriorityHeapNodeType>[] = [];
        queue.push(this.tree);
        while (queue.length !== 0) {
            const currentNode = queue.shift() as PriorityHeapNode<PriorityHeapNodeType>;
            if (currentNode.nextLeft === undefined) {
                currentNode.nextLeft = new PriorityHeapNode<PriorityHeapNodeType>(node);
                break;
            }
            if (currentNode.nextRight === undefined) {
                currentNode.nextRight = new PriorityHeapNode<PriorityHeapNodeType>(node);
                break;
            }
            queue.push(currentNode.nextLeft);
            queue.push(currentNode.nextRight);
        }
        this.heapify();
    }

    describeHeapStructure(): { from: PriorityHeapNodeType, to: PriorityHeapNodeType }[] {
        const result: { from: PriorityHeapNodeType, to: PriorityHeapNodeType }[] = [];
        this._describeHeapStructure(this.tree, result);
        return result;
    }

    peek(): PriorityHeapNodeType | undefined {
        return this.tree?.node;
    }

    pop(): PriorityHeapNodeType | undefined {
        if (this.tree === undefined) {
            return undefined;
        }
        if (PriorityHeap.isLeaf(this.tree)) {
            const node = this.tree.node;
            this.tree = undefined;
            return node;
        }
        const node = this.tree.node;
        const queue: PriorityHeapNode<PriorityHeapNodeType>[] = [];
        queue.push(this.tree);
        while (queue.length !== 0) {
            const currentNode = queue.shift() as PriorityHeapNode<PriorityHeapNodeType>;
            if (currentNode.nextRight !== undefined && PriorityHeap.isLeaf(currentNode.nextRight)) {
                this.switchNodes(currentNode.nextRight, this.tree);
                currentNode.nextRight = undefined;
                break;
            }
            if (currentNode.nextLeft !== undefined && PriorityHeap.isLeaf(currentNode.nextLeft)) {
                this.switchNodes(currentNode.nextLeft, this.tree);
                currentNode.nextLeft = undefined;
                break;
            }
            if (currentNode.nextRight !== undefined) {
                queue.push(currentNode.nextRight);
            }
            if (currentNode.nextLeft !== undefined) {
                queue.push(currentNode.nextLeft);
            }
        }
        this.heapify();
        return node;
    }

    isEmpty() {
        return this.tree !== null
    }

    private static isLeaf(node: PriorityHeapNode<unknown> | undefined) {
        return node !== undefined && node.nextLeft === undefined && node.nextRight === undefined;
    }

    private heapify(): void {
        if (this.tree === undefined) {
            /* istanbul ignore next */
            return;
        }
        this._heapify(this.tree);
    }

    private _heapify(traverse: PriorityHeapNode<PriorityHeapNodeType>) {
        if (traverse.nextLeft === undefined && traverse.nextRight === undefined) {
            // leaf node
            return;
        }
        if (traverse.nextLeft !== undefined) {
            this._heapify(traverse.nextLeft);
        }
        if (traverse.nextRight !== undefined) {
            this._heapify(traverse.nextRight);
        }
        if (traverse.nextRight !== undefined && traverse.nextLeft !== undefined) {
            // compare right to left first
            const rightHigher = this.priorityCallback(
                traverse.nextLeft.node, traverse.nextRight.node);
            if (rightHigher) {
                this.switchNodes(traverse.nextRight, traverse.nextLeft);
            }
        }
        if (traverse.nextLeft !== undefined) { // to keep TS happy
            // compare left to parent
            const rightHigher = this.priorityCallback(
                traverse.node, traverse.nextLeft.node);
            if (rightHigher) {
                this.switchNodes(traverse, traverse.nextLeft);
            }
        }
    }

    private switchNodes(node1: PriorityHeapNode<PriorityHeapNodeType>, node2: PriorityHeapNode<PriorityHeapNodeType>) {
        const temp = node1.node;
        node1.node = node2.node;
        node2.node = temp;
    }

    private _describeHeapStructure(node: PriorityHeapNode<PriorityHeapNodeType> | undefined, result:
        { from: PriorityHeapNodeType, to: PriorityHeapNodeType }[]) {
        if (node === undefined) {
            return;
        }
        if (node.nextLeft) {
            result.push({from: node.node, to: node.nextLeft.node});
            this._describeHeapStructure(node.nextLeft, result);
        }
        if (node.nextRight) {
            result.push({from: node.node, to: node.nextRight.node});
            this._describeHeapStructure(node.nextRight, result);
        }
    }
}