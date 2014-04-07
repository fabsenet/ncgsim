/// <reference path="../_references.ts" />
/// <reference path="../../scripts/typings/jasmine/jasmine.d.ts" />

describe("A StateCtrl", () => {
    var astateCtrl: stateCtrl;

    beforeEach(() => {
        //Add a polyfill for bind() because PhantomJS does not have it
        //source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
        if (!Function.prototype.bind) {
            Function.prototype.bind = function (oThis) {
                if (typeof this !== "function") {
                    // closest thing possible to the ECMAScript 5 internal IsCallable function
                    throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
                }

                var aArgs = Array.prototype.slice.call(arguments, 1),
                    fToBind = this,
                    fNOP = function () { },
                    fBound = function () {
                        return fToBind.apply(this instanceof fNOP && oThis
                            ? this
                            : oThis,
                            aArgs.concat(Array.prototype.slice.call(arguments)));
                    };

                fNOP.prototype = this.prototype;
                fBound.prototype = new fNOP();

                return fBound;
            };
        }



        module('SimulatorApp');
        var scope;
        inject(($controller, $rootScope) => {
            scope = $rootScope.$new();
            astateCtrl = $controller("stateCtrl", { $scope: scope });
        });
    });

    it("filters NoOpActions", () => {
        expect(astateCtrl).toBeDefined();
        expect(astateCtrl.isNotANoOpAction(new RatedAction(new NoOpAction(), 1, 2))).toBe(false);
        expect(astateCtrl.isNotANoOpAction(new RatedAction(new BuildNodeAction(new NodeData()), 1, 2))).toBe(true);
    });
}); 