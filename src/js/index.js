var app = angular.module('vstda', ['as.sortable']);

app.controller('vstdaController', function($scope) {
	$scope.todoList = [
		{"description": "Clean car" , "priority": "medium", "order": 2},
		{"description": "Clean self" , "priority": "high", "order": 1},
		{"description": "Clean poop" , "priority": "low", "order": 3},
		{"description": "Program" , "priority": "low", "order": 3},
		{"description": "Watch cartoons" , "priority": "high", "order": 1}
	];
	$scope.propertyOrder = null;
	$scope.reverse = false;

	// Add todo item to list array
	$scope.btnAddTodo = function() {

		// Set priority order
		var order;
		if ($scope.todoItem.priority == "high") {
			order = 1;
		} 
		else if ($scope.todoItem.priority == "medium") {
			order = 2;
		} 
		else if ($scope.todoItem.priority == "low") {
			order = 3;
		}
		else {
			order = 2;
			$scope.todoItem.priority = "medium";
		}

		// Push to array
		$scope.todoList.push({"description": $scope.todoItem.description, 
			"priority": $scope.todoItem.priority,
			"order": order});
	}

	$scope.delete = function(index) {
		$scope.todoList.splice(index, 1);
	}

	$scope.dragControlListeners = {
    // accept: function (sourceItemHandleScope, destSortableScope) {return boolean}//override to determine drag is allowed or not. default is true.
    // itemMoved: function (event) { },//Do what you want
    // orderChanged: function(event) { },//Do what you want
    // containment: '#board'//optional param.
    // clone: true //optional param for clone feature.
    // allowDuplicates: false //optional param allows duplicates to be dropped.
  	};

});