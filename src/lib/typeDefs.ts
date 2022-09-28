
// Basic types
export type Cost = number;
export type Node = string;

// The current running cost from the starting node to the node specified here
export type RunningPathCost = {from: Node, to: Node, cost: Cost};
export type Edge<MetaType> = {from: Node, to: Node, cost: Cost, meta: MetaType};
export type Path = {to: Node, cost: Cost};
