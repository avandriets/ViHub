'use strict';

angular.module('core.element').
  factory('Element', ['$resource',
    function($resource) {
      return $resource('rest/hub/', {}, {
        query: {
          method: 'GET',
          isArray: true
        }
      });
    }
  ]);