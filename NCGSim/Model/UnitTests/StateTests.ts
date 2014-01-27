/// <reference path="../_references.ts" />
/// <reference path="../../scripts/typings/jasmine/jasmine.d.ts" />

describe("A Point", () => {
    var p0:Point;
    var p1: Point;
    var p3_7: Point;

    beforeEach(()=> {
        p0 = new Point(0, 0);
        p1 = new Point(1, 1);
        p3_7 = new Point(3, -7);
    });

    it("calculates the distance to itself as 0", () => {
        expect(p0.getDistance(p0)).toBe(0);
    });

    it("calculates the correct distance to other points", () => {
        expect(p0.getDistance(p1)).toBeCloseTo(1.414, 3);
        expect(p1.getDistance(p3_7)).toBeCloseTo(8.246211, 3);
        expect(p1.getDistance(p3_7)).toBeCloseTo(p3_7.getDistance(p1), 7);
    });
});