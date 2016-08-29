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
            deleteTodo: deleteTodo,
            getTodo: getTodo,
            updateTodo: updateTodo
        };
        var url = "http://localhost:51662/api/Todoes";
        return service;

        ////////////////

        // Add item to to-do list
        function addTodo(task) {
            var defer = $q.defer();
            $http.post(url, task).then(
                function(response) {
                    defer.resolve(response.data);
                },
                function(error) {
                    defer.reject(error);
                }
            );
            return defer.promise;
        }

        // Delete item from to-do list
        function deleteTodo(task) {
            var defer = $q.defer();
            $http.delete(url + "/" + task.id).then(
                function(response) {
                    defer.resolve(response.data);
                },
                function(error) {
                    defer.reject(error);
                }
            );
            return defer.promise;
        }

        // Retrieve to-do list
        function getTodo() {
            var defer = $q.defer();
            $http.get(url).then(
                function(response) {
                    defer.resolve(response.data);
                },
                function(error) {
                    defer.reject(error);
                }
            );
            return defer.promise;
        }

        // Update task in todo list
        function updateTodo(task) {
            var defer = $q.defer();
            $http.put(url + "/" + task.id, task).then(
                function(response) {
                    defer.resolve(response);
                },
                function(error){
                    defer.reject(error);
                }
            );
            return defer.promise;
        }

    }
})();
