/// <reference path="../_references.ts" />
/// <reference path="../../scripts/typings/jasmine/jasmine.d.ts" />


describe("A SimulatorFactory", () => {

    it("builds a ParallelSimulator for a parallel simulation", () => {
        var simulator = SimulatorFactory.buildInstance(OperationMode.PARALLEL);

        expect(simulator instanceof ParallelSimulator).toBe(true);
    });

    it("builds a SequentialSimulator for a sequential simulation", () => {
        var simulator = SimulatorFactory.buildInstance(OperationMode.SEQUENTIAL);

        expect(simulator instanceof SequentialSimulator).toBe(true);
    });

    it("returns the provided Simulator instance in testcases", () => {
        var mySpecialInstance = { simulateOneRound: (state: State) => { return <RatedAction[]>null; } };

        SimulatorFactory.simulatorInstance = mySpecialInstance;
        var simulator = SimulatorFactory.buildInstance(OperationMode.UNITTEST);

        expect(simulator).toBe(mySpecialInstance);
    });

});


