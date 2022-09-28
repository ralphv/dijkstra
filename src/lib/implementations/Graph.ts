import {IGraph} from "../interfaces/IGraph";
import {Path, Node, Edge} from "../typeDefs";

export class Graph<MetaType> implements IGraph<MetaType> {
    private readonly data: {
        [key: Node]: {
            meta: MetaType,
            next: { [key: Node]: Path }
        }
    };
    private readonly directed: boolean;

    constructor(directed: boolean) {
        this.data = {};
        this.directed = directed;
    }

    traversePath(from: string, to: string): { node: string; runningCost: number; }[] | null {
        const result: { node: string; runningCost: number; }[] = [];
        const success = this._traversePath(from, to, result);
        if (!success) {
            return null;
        }
        let runningTotal = 0;
        result.forEach(a => {
            a.runningCost += runningTotal;
            runningTotal = a.runningCost;
        });
        return result;
    }

    addNode(node: Node, meta: MetaType): void {
        if (Object.keys(this.data).some(a => a === node)) {
            throw new Error(`Node already added: ${node}`);
        }
        this.data[node] = {next: {}, meta};
    }

    addPath(from: Node, path: Path): void {
        this.assertNodeExists(from);
        this.assertNodeExists(path.to);

        this.data[from].next[path.to] = path;
        if (!this.directed) {
            this.data[path.to].next[from] = {to: from, cost: path.cost};
        }
    }

    getPathsOfNode(node: Node): Path[] {
        this.assertNodeExists(node);
        return Object.values(this.data[node].next);
    }

    private assertNodeExists(node: Node) {
        if (Object.keys(this.data).some(a => a === node)) {
            return;
        }
        throw new Error(`Node doesn't exist: ${node}`);
    }

    hasNode(node: Node): boolean {
        return node in this.data;
    }

    getNodeMeta(node: Node): MetaType {
        this.assertNodeExists(node);
        return this.data[node].meta;
    }

    setNodeMeta(node: Node, meta: MetaType): void {
        this.assertNodeExists(node);
        this.data[node].meta = meta;
    }

    private _traversePath(from: string, to: string, runningPath: { node: string; runningCost: number; }[]): boolean {
        // check from and to, if to is destination then add the path.
        for (const path of this.getPathsOfNode(from)) {
            if (path.to === to) {
                runningPath.unshift({node: path.to, runningCost: path.cost});
                return true;
            }
            if (this._traversePath(path.to, to, runningPath)) {
                runningPath.unshift({node: path.to, runningCost: path.cost});
                return true;
            }
        }
        return false;
    }

    getNodes(): Node[] {
        return Object.keys(this.data);
    }

    getAllPaths(directional: boolean): Edge<MetaType>[] {
        const allEdges = Object.entries(this.data).flatMap(([from, {meta, next}]) => Object.values(next).map(path => ({
            from,
            to: path.to,
            cost: path.cost,
            meta
        })));

        if (directional) {
            return allEdges;
        }

        return allEdges.reduce(
            ({unique, result}: { unique: { [key: string]: boolean }, result: Edge<MetaType>[] }, edge) => {
                const key1 = `${edge.from}:${edge.to}`;
                const key2 = `${edge.to}:${edge.from}`;
                if (key1 in unique || key2 in unique) {
                    return {unique, result};
                }
                unique[key1] = unique[key2] = true;
                return {unique, result: [...result, edge]};
            }, {unique: {}, result: []}).result;
    }
}