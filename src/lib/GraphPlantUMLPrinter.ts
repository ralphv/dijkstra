/**
 * author: Ralph Varjabedian
 */
import { IGraph } from "./interfaces/IGraph";
import { Node } from "./typeDefs";
import { EOL } from "os";

export class GraphPlantUMLPrinter {
    public static generateContents(start: Node, graph: IGraph<unknown>, directional: boolean, addLength = true) {
        // redistribute the relative values of the costs to a linear one for nicer looking graphs
        const costsHash: { [key: number]: string } = [
            ...new Set(graph.getAllPaths(directional).map(({ cost }) => cost)),
        ]
            .sort((a, b) => a - b)
            .reduce((acc, cost, currentIndex) => {
                return {
                    ...acc,
                    [cost]: (currentIndex + 1).toString(),
                };
            }, {});
        const steps = graph.getAllPaths(directional).map((edge) => {
            return `${edge.from} -> ${edge.to} [label = "${edge.cost}"${
                addLength ? ", minlen=" + costsHash[edge.cost] : ""
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
