export declare const ViewStrategies: {
    label: string;
    value: string;
}[];
export declare const BaseTilesets: ({
    label: string;
    value: null;
} | {
    label: string;
    value: string;
})[];
export declare const PoliticalBoundaryTilesets: ({
    label: string;
    value: null;
} | {
    label: string;
    value: string;
})[];
export declare const PoliticalLabelTilesets: ({
    label: string;
    value: null;
} | {
    label: string;
    value: string;
})[];
export declare const LegendPositionOptions: {
    label: string;
    value: string;
}[];
export declare const LegendBehaviorOptions: {
    label: string;
    value: string;
}[];
export declare const monospacedFontSize = "10pt";
/**
 * An SVG image of an arrow pointing right, meeting with a vertical line at the arrow's point.
 */
export declare const svgArrowRightToLine = "\n  <svg xmlns=\"http://www.w3.org/2000/svg\"\n    role=\"graphics-symbol\"\n    aria-labelledby=\"In Volume\"\n    width=\"24\"\n    height=\"24\"\n    viewBox=\"0 0 24 24\"\n    fill=\"none\"\n    stroke=\"currentColor\"\n    stroke-width=\"2\"\n    stroke-linecap=\"round\"\n    stroke-linejoin=\"round\"\n    class=\"lucide lucide-arrow-right-to-line\"\n  >\n    <path d=\"M17 12H3\"/>\n    <path d=\"m11 18 6-6-6-6\"/>\n    <path d=\"M21 5v14\"/>\n  </svg>";
/**
 * An SVG image of an arrow pointing left, away from a vertical line at the arrow's base.
 */
export declare const svgArrowLeftFromLine = "\n    <svg xmlns=\"http://www.w3.org/2000/svg\"\n      role=\"graphics-symbol\"\n      aria-labelledby=\"Out Volume\"\n      width=\"24\"\n      height=\"24\"\n      viewBox=\"0 0 24 24\"\n      fill=\"none\"\n      stroke=\"currentColor\"\n      stroke-width=\"2\"\n      stroke-linecap=\"round\"\n      stroke-linejoin=\"round\"\n      class=\"lucide lucide-arrow-left-from-line\"\n    >\n      <path d=\"m9 6-6 6 6 6\"/>\n      <path d=\"M3 12h14\"/>\n      <path d=\"M21 19V5\"/>\n    </svg>\n  ";
/**
 * The default tooltip markup to render for nodes.
 */
export declare const defaultNodeTooltip: string;
/**
 * The initial/default markup to render for custom node tooltip markup.
 */
export declare const defaultCustomNodeTooltip = "\n  <div class=\"flow-tooltip\">\n    <strong>${name}</strong>\n  </div>\n  <div class=\"flow-tooltip\">\n    <strong>In Volume: ${inValue}</strong>\n  </div>\n  <div class=\"flow-tooltip\">\n    <strong>Out Volume: ${outValue}</strong>\n  </div>\n";
/**
 * The initial/default markup to render for custom edge tooltip markup.
 */
export declare const defaultCustomEdgeTooltip = "\n  <div class=\"flow-tooltip\">\n    <strong>\n      ${forward.from} \u2192 ${forward.to}\n      <br />\n      Rate: ${forward.dataPoint}\n    </strong>\n  </div>\n  <div class=\"flow-tooltip\">\n    <span>\n      ${reverse.from} \u2192 ${reverse.to}\n      <br />\n      Rate: ${reverse.dataPoint}\n    </span>\n  </div>\n";
/**
 * The default tooltip markup to render for edges.
 */
export declare const defaultEdgeTooltip: string;
//# sourceMappingURL=options.d.ts.map