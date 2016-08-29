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
        vm.addTodo = addTodo;
        vm.deleteItem = deleteItem;
        vm.setOrder = setOrder;
        vm.orderTodos = orderTodos;

        activate();

        ////////////////

        function activate() {
            vstdaFactory.getTodo().then(
                function(data) {
                    vm.todoList = data;
                },
                function(error) {
                    alert("Error getting Todo List");
                }
            );
        }

        function addTodo() {
            vm.todoItem.order = setOrder();
            vstdaFactory.addTodo(vm.todoItem).then(
                function(){
                    alert("Successfully added");
                },
                function(){
                    alert("Error in saving new todo task");
                }
            );

            // // Set order for given priority
            // var order = setOrder();

            // // Push to array
            // vm.todoList.push({
            //     "description": vm.todoItem.description,
            //     "priority": vm.todoItem.priority,
            //     "order": order
            // });
        }

        function deleteItem(index) {
            vm.todoList.splice(index, 1);
        }

        function setOrder() {
            // Set priority order
            var order;
            if (vm.todoItem.priority == "high") {
                order = 1;
            } else if (vm.todoItem.priority == "medium") {
                order = 2;
            } else if (vm.todoItem.priority == "low") {
                order = 3;
            } else {
                // Default to medium if nothing is chosen
                vm.todoItem.priority = "medium";
                order = 2;
            }

            return order;
        }

        function orderTodos(sortOption) {
            vm.todoList = $filter("orderBy")(ctrl.todoList, sortOption);
        }

    }
})();
