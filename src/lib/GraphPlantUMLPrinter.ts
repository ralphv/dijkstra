import {IGraph} from "./interfaces/IGraph";
import {Node} from "./typeDefs";
import {EOL} from "os";

export class GraphPlantUMLPrinter {
    public static generateContents(start: Node, graph: IGraph<unknown>, directional: boolean) {
        const steps = graph.getAllPaths(directional).map(edge => {
            return `${edge.from} -> ${edge.to} [label = "${edge.cost}"];`;
        });
        return `@startdot
digraph a {
    fontname="Helvetica,Arial,sans-serif"
    node [fontname="Helvetica,Arial,sans-serif"]
    edge [fontname="Helvetica,Arial,sans-serif"]
    rankdir=LR;
    node [shape = circle];
    edge[arrowhead="${directional ? 'normal' : 'none'}"];
${steps.map(a => `    ${a}`).join(EOL)}
}
@enddot
`
    }
}