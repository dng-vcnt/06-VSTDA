(function() {
    'use strict';

    angular
        .module('vstda')
        .factory('vstdaFactory', vstdaFactory);

    vstdaFactory.$inject = ['$http', '$q'];

    /* @ngInject */
    function vstdaFactory($http, $q) {
        var service = {
            addTodo: addTodo,
            getTodo: getTodo
        };
        return service;

        ////////////////
        function addTodo(todo) {
            var defer = $q.defer();
            $http.post("http://localhost:51662/api/Todoes", todo).then(
                function(response) {
                    defer.resolve(response.data);
                },
                function(error) {
                    defer.reject(error);
                }
            );
            return defer.promise;
        }

        function getTodo() {
            var defer = $q.defer();
            $http.get("http://localhost:51662/api/Todoes").then(
                function(response) {
                    defer.resolve(response.data);
                },
                function(error) {
                    defer.reject(error);
                }
            );
            return defer.promise;

            // Initialization
            // var todoList = [
            //     { "description": "Clean car", "priority": "medium", "order": 2 },
            //     { "description": "Clean self", "priority": "high", "order": 1 },
            //     { "description": "Clean poop", "priority": "low", "order": 3 },
            //     { "description": "Program", "priority": "low", "order": 3 },
            //     { "description": "Watch cartoons", "priority": "high", "order": 1 }
            // ];
            // return todoList;
        }

    }
})();
