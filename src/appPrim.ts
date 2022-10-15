/**
 * author: Ralph Varjabedian
 */
import { Graph } from "./lib/implementations/Graph";
import { LinearRunningCosts } from "./lib/implementations/LinearRunningCosts";
import { ProcessShortestPath } from "./lib/implementations/ProcessShortestPath";
import { GraphPlantUMLPrinter } from "./lib/GraphPlantUMLPrinter";
import * as fs from "fs";
import { HeapRunningCosts } from "./lib/implementations/HeapRunningCosts";

console.log(`Running the algorithm with a fixed hardcoded Graph`);

// create a simple graph
const graph = new Graph<void>(false);

graph.addNode("0");
graph.addNode("1");
graph.addNode("2");
graph.addNode("3");
graph.addNode("4");
graph.addNode("5");
graph.addNode("6");
graph.addNode("7");
graph.addNode("8");

graph.addPath("0", { to: "1", cost: 4 });
graph.addPath("0", { to: "7", cost: 8 });
graph.addPath("1", { to: "7", cost: 11 });
graph.addPath("1", { to: "2", cost: 8 });
graph.addPath("2", { to: "8", cost: 2 });
graph.addPath("2", { to: "5", cost: 4 });
graph.addPath("2", { to: "3", cost: 7 });
graph.addPath("3", { to: "4", cost: 9 });
graph.addPath("3", { to: "5", cost: 14 });
graph.addPath("4", { to: "5", cost: 10 });
graph.addPath("5", { to: "6", cost: 2 });
graph.addPath("6", { to: "8", cost: 6 });
graph.addPath("6", { to: "7", cost: 1 });
graph.addPath("7", { to: "8", cost: 7 });

// Create a data structure for running costs
const useHeap = process.env.USE_HEAP_STRUCTURE === "TRUE";
const findLongestPath = useHeap && process.env.FIND_LONGEST_PATH === "TRUE";
console.log(`Using ${useHeap ? "Heap structure" : "Linear structure"}`);
const runningCosts = useHeap ? new HeapRunningCosts(!findLongestPath) : new LinearRunningCosts();

// Create the algorithm
const algorithm = new ProcessShortestPath();

// Generate
const shortestPathTree = algorithm.process("0", graph, runningCosts);

// Print sample path traversals
[
  ["0", "8"],
  ["0", "4"],
  ["0", "1"],
  ["0", "6"],
  ["0", "7"],
  ["6", "4"],
  ["1", "6"]
].forEach(([from, to]) => {
  const path = shortestPathTree.traversePath(from, to);
  if (!path) {
    console.log(`Path from [${from}] => [${to}]: does not exist`);
  } else {
    console.log(`Path from [${from}] => [${to}]: ${JSON.stringify(path)}`);
  }
});

fs.writeFileSync("./graphs/appPrim-input-graph.puml",
  GraphPlantUMLPrinter.generateContents("0", graph, false, (edge) => `${edge.cost}`));
fs.writeFileSync(
  `./graphs/appPrim-${findLongestPath ? "max" : "min"}-spanning-tree.puml`,
  GraphPlantUMLPrinter.generateContents(
    "0",
    shortestPathTree,
    true,
    (edge) => `${edge.cost} (Σ=${edge.toMeta.runningCost})`)
);
