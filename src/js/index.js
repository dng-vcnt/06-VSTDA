var app = angular.module('vstda', []);

app.controller('vstdaController', function($scope) {
	$scope.todoList = [];
	$scope.propertyOrder = null;
	$scope.reverse = false;

	// Add todo item to list array
	$scope.btnAddTodo = function() {

		// Set priority order
		var order;
		if ($scope.todoItem.priority == "high") {
			order = 1;
		}

		if ($scope.todoItem.priority == "medium") {
			order = 2;
		}

		if ($scope.todoItem.priority == "low") {
			order = 3;
		}

		// Push to array
		$scope.todoList.push({"description": $scope.todoItem.description, 
			"priority": $scope.todoItem.priority,
			"order": order});

		console.log($scope.todoList);

	}

});