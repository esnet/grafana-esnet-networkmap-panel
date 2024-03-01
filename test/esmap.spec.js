import * as should from "../node_modules/should/should.js"
import { describe, it, expect } from "vitest";
import * as esmap  from '../src/components/lib/esmap.js';

describe( "Module esmap", () => {
    it("should export a set of classes and functions", () => {
        expect(esmap.EsMap).toBeInstanceOf(Function);
        expect(esmap.rotate).toBeInstanceOf(Function);
        expect(esmap.angle).toBeInstanceOf(Function);
        expect(esmap.bearingAngle).toBeInstanceOf(Function);
        expect(esmap.getBisectAngle).toBeInstanceOf(Function);
        expect(esmap.toDegrees).toBeInstanceOf(Function);
        expect(esmap.toRadians).toBeInstanceOf(Function);
    });
    it("should export a rotate function that returns [x, y] when angle = 0", ()=>{
        var output = esmap.rotate(0, 0, 10, 20, 0);
        expect(output).toBeInstanceOf(Array);
        expect(output.length).to.equal(2);
        expect(output[0]).to.equal(10);
        expect(output[1]).to.equal(20);
    })
    it("should export a 'rotate' function that returns [x, y] when angle != 0", ()=>{
        var output = esmap.rotate(0, 0, 10, 20, 180);
        expect(output).toBeInstanceOf(Array);
        expect(output.length).to.equal(2);
        expect(output[0]).not.to.equal(10);
        expect(output[0]).to.approximately(-10, 0.1);
        expect(output[1]).not.to.equal(20);
        expect(output[1]).to.approximately(-20, 0.1);
    })
})