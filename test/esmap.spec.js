import * as esmap  from '../src/components/lib/esmap.js';

describe( "Module esmap", () => {
    it("should export a set of classes and functions", ()=>{
        expect(esmap.EsMap).toBeDefined();
        expect(esmap.rotate).toBeDefined();
        expect(esmap.angle).toBeDefined();
        expect(esmap.bearingAngle).toBeDefined();
        expect(esmap.getBisectAngle).toBeDefined();
        expect(esmap.toDegrees).toBeDefined();
        expect(esmap.toRadians).toBeDefined();
    });
    it("should export a rotate function that returns [x, y] when angle = 0", ()=>{
        var output = esmap.rotate(0, 0, 10, 20, 0);
        expect(output instanceof Array).toBeTruthy();
        expect(output.length).toEqual(2);
        expect(output[0]).toEqual(10);
        expect(output[1]).toEqual(20);
    })
    it("should export a 'rotate' function that returns [x, y] when angle != 0", ()=>{
        var output = esmap.rotate(0, 0, 10, 20, 180);
        expect(output instanceof Array).toBeTruthy();
        expect(output.length).toEqual(2);
        expect(output[0]).not.toEqual(10);
        expect(output[0]).toBeCloseTo(-10, 0);
        expect(output[1]).not.toEqual(20);
        expect(output[1]).toBeCloseTo(-20, 0);
    })
})