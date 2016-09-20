/**
 * Created by AVAndriets on 10.09.16.
 */

angular.
  module('createElement').directive("createElementDialogButton", function(){
    return {
      link: function(scope, element, attr) {
        var dialog =  document.querySelector(".th-body").querySelector(".ms-Dialog");
        scope.dialog_object = new fabric['Dialog'](dialog);
      }
    };
})
;