import { IGraph } from "./interfaces/IGraph";
import { Node } from "./typeDefs";
import { EOL } from "os";

export class GraphPlantUMLPrinter {
    public static generateContents(start: Node, graph: IGraph<unknown>, directional: boolean, addLength = true) {
        // note: minlen / 2 = helps keep the graph smaller, remove /2 if you want it to be 100% sized relative to the cost
        const steps = graph.getAllPaths(directional).map((edge) => {
            return `${edge.from} -> ${edge.to} [label = "${edge.cost}"${
                addLength ? ", minlen=" + Math.floor(edge.cost / 2).toString() : ""
            }];`;
        });
        return `@startdot
digraph a {
    fontname="Helvetica,Arial,sans-serif"
    node [fontname="Helvetica,Arial,sans-serif"]
    edge [fontname="Helvetica,Arial,sans-serif"]
    rankdir=LR;
    node [shape = circle];
    edge[arrowhead="${directional ? "normal" : "none"}"];
${steps.map((a) => `    ${a}`).join(EOL)}
}
@enddot
`;
    }
}
