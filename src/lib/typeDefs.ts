/**
 * author: Ralph Varjabedian
 */
// Basic types
export type Cost = number;
export type Node = string;

// The current running cost from the starting node to the node specified here
export type RunningPathCost = { from: Node; to: Node; cost: Cost, runningCost: Cost };
// For Graph
export type Edge<MetaType> = { from: Node; to: Node; cost: Cost; fromMeta: MetaType, toMeta: MetaType };
export type Path = { to: Node; cost: Cost };
