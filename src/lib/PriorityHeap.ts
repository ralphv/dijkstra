/**
 * author: Ralph Varjabedian
 */
export type PriorityHeapCallback<PriorityHeapNode> = (nodeA: PriorityHeapNode, nodeB: PriorityHeapNode) => boolean;

export interface IPriorityHeap<PriorityHeapNodeType> {
    describeHeapStructure(): { from: PriorityHeapNodeType; to: PriorityHeapNodeType }[];
}

export class PriorityHeap<PriorityHeapNodeType> implements IPriorityHeap<PriorityHeapNodeType> {
    private tree: PriorityHeapNodeType[] = [];
    private size = 0;
    private readonly priorityCallback: PriorityHeapCallback<PriorityHeapNodeType>;

    constructor(priorityCallback: PriorityHeapCallback<PriorityHeapNodeType>) {
        this.priorityCallback = priorityCallback;
    }

    private static parent(i: number): number {
        return Math.floor((i - 1) / 2);
    }

    private static left(i: number): number {
        return 2 * i + 1;
    }

    private static right(i: number): number {
        return 2 * i + 2;
    }

    private last(): number | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.size - 1;
    }

    push(node: PriorityHeapNodeType) {
        this.tree[this.size] = node;
        this.size++;
        let current = this.last() as number;
        while (current > 0) {
            const parent = PriorityHeap.parent(current);
            if (this.priorityCallback(this.tree[parent], this.tree[current])) {
                this.switch(current, parent);
            }
            current = parent;
        }
    }

    peek(): PriorityHeapNodeType | undefined {
        return this.isEmpty() ? undefined : this.tree[0];
    }

    pop(): PriorityHeapNodeType | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        const rootNode = this.tree[0];
        const lastIndex = this.last() as number;

        this.tree[0] = this.tree[lastIndex];
        this.size--;
        this.tree.length = this.size; // release memory

        if (this.size > 1) {
            this.heapify(0);
        }
        return rootNode;
    }

    isEmpty(): boolean {
        return this.size === 0;
    }

    private switch(a: number, b: number) {
        const temp = this.tree[a];
        this.tree[a] = this.tree[b];
        this.tree[b] = temp;
    }

    private heapify(index: number) {
        const left = PriorityHeap.left(index);
        const right = PriorityHeap.right(index);
        const last = this.size - 1;

        let priority = index;
        if (right <= last && this.priorityCallback(this.tree[index], this.tree[right])) {
            priority = right;
        }
        if (left <= last && this.priorityCallback(this.tree[priority], this.tree[left])) {
            priority = left;
        }
        if (priority !== index) {
            this.switch(priority, index);
            this.heapify(priority); // go down one branch only if needed
        }
    }

    describeHeapStructure(): { from: PriorityHeapNodeType; to: PriorityHeapNodeType }[] {
        const result: { from: PriorityHeapNodeType; to: PriorityHeapNodeType }[] = [];
        if (!this.isEmpty()) {
            this._describeHeapStructure(0, result);
        }
        return result;
    }

    private _describeHeapStructure(index: number, result: { from: PriorityHeapNodeType; to: PriorityHeapNodeType }[]) {
        const left = PriorityHeap.left(index);
        const right = PriorityHeap.right(index);
        const last = this.size - 1;

        if (right <= last) {
            result.push({ from: this.tree[index], to: this.tree[right] });
            this._describeHeapStructure(right, result);
        }
        if (left <= last) {
            result.push({ from: this.tree[index], to: this.tree[left] });
            this._describeHeapStructure(left, result);
        }
    }
}
