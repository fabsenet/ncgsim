/// <reference path="../_references.ts" />
/// <reference path="../../scripts/typings/jasmine/jasmine.d.ts" />


describe("An ArrayHelper", () => {

    var n: number[];
    var n1: number[];
    var n12: number[];
    var n123: number[];
    var s3: string[];

    beforeEach(() => {
        n = null;
        n1 = [1];
        n12 = [1, 2];
        n123 = [1, 2, 3];
        s3 = ["a", "b", "c"];
    });

    it("reverses null to null", () => {
        expect(__.reverse(n)).toBeNull();
    });

    it("reverses arrays", () => {
        expect(__.reverse(n1)).toEqual([1]);
        expect(__.reverse(n12)).toEqual([2, 1]);
        expect(__.reverse(n123)).toEqual([3, 2, 1]);
        expect(__.reverse(s3)).toEqual(["c", "b", "a"]);
    });

    it("does not change the source array while reversing", ()=> {
        var count1 = s3.length;
        __.reverse(s3);
        var count2 = s3.length;

        expect(count2).toBe(count1);
    });

    it("removes items from an array", () => {
        __.removeArrayItem(n1, 1);
        expect(n1).toEqual([]);

        __.removeArrayItem(s3, "b");
        expect(s3).toEqual(["a","c"]);
    });

});

