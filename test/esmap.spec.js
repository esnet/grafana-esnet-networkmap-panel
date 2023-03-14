import * as should from "../node_modules/should/should.js"
import * as esmap  from '../src/components/lib/esmap.js';

describe( "Module esmap", () => {
    it("should export a set of classes and functions", ()=>{
        esmap.EsMap.should.be.a.Function;
        esmap.rotate.should.be.a.Function;
        esmap.angle.should.be.a.Function;
        esmap.bearingAngle.should.be.a.Function;
        esmap.getBisectAngle.should.be.a.Function;
        esmap.toDegrees.should.be.a.Function;
        esmap.toRadians.should.be.a.Function;
    });
    it("should export a rotate function that returns [x, y] when angle = 0", ()=>{
        var output = esmap.rotate(0, 0, 10, 20, 0);
        output.should.be.an.Array;
        output.length.should.equal(2);
        output[0].should.equal(10);
        output[1].should.equal(20);
    })
    it("should export a 'rotate' function that returns [x, y] when angle != 0", ()=>{
        var output = esmap.rotate(0, 0, 10, 20, 180);
        console.log(output);
        output.should.be.an.Array;
        output.length.should.equal(2);
        output[0].should.not.equal(10);
        output[0].should.be.approximately(-10, 0.1);
        output[1].should.not.equal(20);
        output[1].should.be.approximately(-20, 0.1);
    })
})