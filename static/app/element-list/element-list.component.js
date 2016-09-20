/**
 * Created by AVAndriets on 08.09.16.
 */

function ElementListController($scope) {

}

angular.module('elementList').component('elementList',
    {
        bindings: {
            obj: '<'
        },
        templateUrl: 'static/app/element-list/element-list.template.html',
        controller: ElementListController
    }
);
