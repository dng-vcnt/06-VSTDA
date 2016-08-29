(function() {
    'use strict';

    angular
        .module('vstda')
        .controller('vstdaController', vstdaController);

    vstdaController.$inject = ['vstdaFactory'];

    /* @ngInject */
    function vstdaController(vstdaFactory) {
        var vm = this;
        vm.title = 'vstdaController';
        vm.todoList = [];
        vm.todoItem;
        vm.propertyOrder = null;
        vm.reverse = false;
        vm.isEdit = false;

        vm.addTodo = addTodo;
        vm.deleteTodo = deleteTodo;
        vm.getTodo = getTodo;
        vm.setOrder = setOrder;
        vm.updateTodo = updateTodo;
        vm.orderTodos = orderTodos;

        activate();

        ////////////////

        function activate() {
            getTodo();
        }

        // Retrieve todo list from database
        function getTodo() {
            vstdaFactory.getTodo().then(
                function(data) {
                    vm.todoList = data;
                },
                function(error) {
                    alert("Error getting Todo List");
                }
            );
        }

        // Add item to todo list
        function addTodo(task) {
            task.order = setOrder(task);
            vstdaFactory.addTodo(task).then(
                function() {
                    // Pushing to list causes display bug
                    // vm.todoList.push(task);
                    console.log("Successfully added");
                },
                function() {
                    console.log("Error in saving new todo task");
                }
            );

        }

        // Delete item from todo list
        function deleteTodo(task) {
            vstdaFactory.deleteTodo(task).then(
                function() {
                    console.log("Successfully deleted item");
                    var index = vm.todoList.indexOf(task);
                    vm.todoList.splice(index, 1);
                },
                function() {
                    console.log("Error in deleting item");
                }
            );
        }

        // Set priority order
        function setOrder(task) {
            var order;
            if (task.priority == "high") {
                order = 1;
            } else if (task.priority == "medium") {
                order = 2;
            } else if (task.priority == "low") {
                order = 3;
            } else {
                // Default to medium if nothing is chosen
                task.priority = "medium";
                order = 2;
            }

            return order;
        }

        // Update task description
        function updateTodo(task) {
            vstdaFactory.updateTodo(task).then( 
                function() {
                    console.log("Update Successful");
                },
                function() {
                    console.log("Update Error");
                }
            );
        }

        function orderTodos(sortOption) {
            vm.todoList = $filter("orderBy")(ctrl.todoList, sortOption);
        }

    }
})();
