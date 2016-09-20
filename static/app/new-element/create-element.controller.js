/**
 * Created by AVAndriets on 09.09.16.
 */

angular.module('createElement').controller('createElementController', ['$scope', 'Element', function ($scope, Element) {

    //Init list parameter for hub-list component
    $scope.myController = this;
    $scope.myController.hublist = Element.query();

    //error selector
    $scope.hasError = false;
    $scope.errorMessage = '';

    //add hub dialog
    $scope.dialog_object = {};

    $scope.openDialog = function () {
        $scope.hasError = false;
        $scope.dialog_object.open();
    };

    $scope.hubTypes = {
        model: null,
        availableTypes: [
            {id: 'W', name: 'Workflow'},
            {id: 'K', name: 'Wiki'},
            {id: 'H', name: 'White board'}
        ]
    };

    $scope.hubTypes.model = $scope.hubTypes.availableTypes[0].id;

    $scope.update = function () {

        if($scope.name == null || $scope.name == ' ' || $scope.name.length == 0){
            $scope.hasError = true;
            $scope.errorMessage = 'Заполните поле название.';
            return;
        }

        if($scope.description == null || $scope.description == ' ' || $scope.description.length == 0){
            $scope.hasError = true;
            $scope.errorMessage = 'Заполните описание.';
            return;
        }

        var HUBJson =
        {
            parent: null,
            name: $scope.name,
            description: $scope.description,
            hub_type: $scope.hubTypes.model,
            is_delete: 0
        };

        var newHub = new Element(HUBJson);
        newHub.$save(
            function (res) {

                $scope.name = '';
                $scope.description = '';

                $scope.myController.hublist = Element.query();
                $scope.dialog_object.close();

                console.log('ok');
            }, function (error) {
                // Error handler code
                $scope.hasError = true;
                $scope.errorMessage = 'Ошибка при сохранении элемента.';

                console.log('error');
            });
    };

}]);
