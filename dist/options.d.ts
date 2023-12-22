export const ViewStrategies: {
    label: string;
    value: string;
}[];
export const BaseTilesets: ({
    label: string;
    value: null;
} | {
    label: string;
    value: string;
})[];
export const PoliticalBoundaryTilesets: ({
    label: string;
    value: null;
} | {
    label: string;
    value: string;
})[];
export const PoliticalLabelTilesets: ({
    label: string;
    value: null;
} | {
    label: string;
    value: string;
})[];
export const LegendPositionOptions: {
    label: string;
    value: string;
}[];
export const LegendBehaviorOptions: {
    label: string;
    value: string;
}[];
export const defaultNodeTooltip: "\n";
export const defaultCustomNodeTooltip: "\n";
export const defaultCustomEdgeTooltip: "\n  <div class=\"flow-tooltip\">\n    <strong>\n      ${forward.from} → ${forward.to}\n      <br />\n      Rate: ${forward.dataPoint}\n    </strong>\n  </div>\n  <div class=\"flow-tooltip\">\n    <span>\n      ${reverse.from} → ${reverse.to}\n      <br />\n      Rate: ${reverse.dataPoint}\n    </span>\n  </div>\n";
export const defaultEdgeTooltip: string;
//# sourceMappingURL=options.d.ts.map