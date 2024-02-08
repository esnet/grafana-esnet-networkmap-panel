
export interface IPanel {
    datasource: {
        type: string,
        uid: string,
    };
    fieldConfig: {[fieldConfigKey: string]: any};
    gridpos: {
        h: number,
        w: number,
        x: number,
        y: number
    };
    id: number;
    options: {[optionKey: string]: any};
    targets: {[targetKey: string]: any};
    title: string;
    type: string;
}
