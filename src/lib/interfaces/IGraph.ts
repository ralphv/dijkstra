import {Node, Path} from "../typeDefs";

export interface IGraph<MetaType> {
    /**
     * Adds a new node to the graph, has to have a unique value
     * @param node
     * @param meta Add extra data for a node
     */
    addNode(node: Node, meta: MetaType): void;

    /**
     * Adds a new path from node to node, both nodes must exist
     * @param from From node
     * @param path to node, and it's cost
     */
    addPath(from: Node, path: Path): void;

    /**
     * Gets the next paths from the given node
     * @param node The node
     */
    getPathsOfNode(node: Node): Path[];

    /**
     * Has the node?
     * @param node the node to test
     */
    hasNode(node: Node): boolean;

    /**
     * Gets the node meta data
     * @param node
     */
    getNodeMeta(node: Node): MetaType | undefined;

    /**
     * Sets the node meta data
     * @param node
     * @param meta
     */
    setNodeMeta(node: Node, meta: MetaType | undefined): void;

    /**
     * Traverse the path from to (if exists) and return the running costs until destination
     * @param from the start
     * @param to the end
     */
    traversePath(from: Node, to: Node): { node: Node, runningCost: number }[] | null;
}