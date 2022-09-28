import {Graph} from "./implementations/Graph";
import {IGraph} from "./interfaces/IGraph";
import {getRandomInt} from "./utils";

export class GraphGenerator {
    public static generate(minNodes: number, maxNodes: number, minCost: number, maxCost: number, density: number): IGraph<void> {
        if (density <= 0 || density > 0.9) {
            throw new Error("Density has to be between 0 and 0.9")
        }
        const graph = new Graph<void>(false);

        const nodes = getRandomInt(minNodes, maxNodes + 1);
        const minEdges = nodes - 1;
        let maxEdges = Math.ceil((nodes * (nodes - 1) / 2) * density);
        if (maxEdges < minEdges) {
            maxEdges = minEdges;
        }

        const edges = getRandomInt(minEdges, maxEdges + 1);

        for (let n = 1; n < nodes + 1; n++) {
            graph.addNode(n.toString());
        }

        for (let e = 0; e < edges; e++) {
            while (true) {
                const from = getRandomInt(1, nodes + 1).toString();
                const to = getRandomInt(1, nodes + 1).toString();

                if (from !== to && !graph.hasPath(from, to)) {
                    graph.addPath(from, {to, cost: getRandomInt(minCost, maxCost + 1)});
                    break;
                }
            }
        }

        //todo need to ensure there are no disconnected graphs, so need to have a path between all nodes

        return graph;
    }
}