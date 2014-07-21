/// <reference path="../model/_references.ts" />

interface ISampleListItem {
    name: string;
    url: string;
    state: State;
    stateJson:string;
}

class PredefinedGraphsController {

    sampleList: ISampleListItem[] = [];

    constructor($scope, $http) {
        console.log("scope", $scope.vm);
        $scope.samplesvm = this;

        $http({ method: 'GET', url: 'Model/Samples/_list.json' })
            .success((obj) => {
                console.log("received sampleList!", obj);
                this.sampleList = <ISampleListItem[]>obj;

                _.forEach(this.sampleList, (item:ISampleListItem) => {

                    $http({
                            method: 'GET',
                            url: 'Model/Samples/' + item.url,
                            transformResponse: (stateString) => {
                                return {
                                    "stateObj": JSON.parse(stateString, State.reviver),
                                    "stateString": stateString
                                };
                            }
                        })
                        .success((state) => {
                            console.log("received state for item!", state, item);
                            item.state = state.stateObj;
                            item.stateJson = state.stateString;
                        })
                        .error(() => {
                            console.log("failed loading graph data for item.", item);
                        });
                });
            })
            .error(() => {
                console.log("failed getting data.");
            });
    }


}

var app = angular.module('SimulatorApp');
app.controller("PredefinedGraphsController", PredefinedGraphsController);