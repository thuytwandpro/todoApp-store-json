	// create the module and name it scotchApp
	var scotchApp = angular.module('scotchApp', ['ngRoute']);

	// configure our routes
	scotchApp.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : 'pages/home.html',
				controller  : 'mainController'
			})

			// route for the about page
			.when('/about', {
				templateUrl : 'pages/about.html',
				controller  : 'aboutController'
			})

			// route for the contact page
			.when('/contact', {
				templateUrl : 'pages/contact.html',
				controller  : 'contactController'
			})

			// route for the plan page
			.when('/plan', {
				templateUrl : 'pages/plan.html',
                controller  : 'planController'
			});
	});

	// create the controller and inject Angular's $scope
	scotchApp.controller('mainController', function($scope,  $http ) {

        $scope.openFileDialog=function() {
            angular.element('#file').trigger('click');
        };

        angular.element('#file').on('change',function(event) {
            var file = event.target.files[0];
            $scope.fileName=file.name;
            $scope.$apply();
        });

        $scope.show = function ( ) {
            var a = $scope.fileName;
            if(typeof (a) == "string") {
                $http.get(a).success(function (data) {
                    $scope.list = data;
                   if(typeof ($scope.list.datecr) == "string"){
                       $("#create").show();



                       $scope.changecolor = function (x) {
                           var r = confirm("Bạn đã hoàn xong công việc này ?");
                           if (r == true) {
                               x.state = 1;
                           } else {
                           }
                       };

                       $scope.todoAdd = function() {
                           add();
                           if(test.name.trim() != ""){
                               $scope.list.array.push(test);
                           }else{
                           alert("Bạn chưa nhập tên công việc"); }
                           $('#name').val("");
                       };

                       $scope.todoDel = function(x) {
                           if(($scope.list.array).length >= 2){
                               var b = $scope.list.array.indexOf(x);
                               var r = confirm("Bạn có muốn xóa công việc này!");
                               if (r == true) {
                                   var i = $scope.list.array.indexOf(a);
                                   $scope.list.array.splice(b, 1);
                                   console.log($scope.list.array);
                               } else {
                               }
                           }else {
                               alert("Bản lưu công việc không được ít hơn 1")
                           }
                       };

                       $scope.output = function ( ) {
                           function saveText(text, filename){
                               var a = document.createElement('a');
                               a.setAttribute('href', 'data:application/json; charset=utf-8,'+encodeURIComponent(text));
                               a.setAttribute('download', filename);
                               a.click()
                           };
                           var newdate = new Date().toLocaleString();
                           var save =  newdate + " work.json";

                           $scope.list.timecr = new Date().toLocaleTimeString();
                           $scope.list.datecr = new Date().toLocaleDateString();

                           var t = JSON.stringify($scope.list);
                           saveText( t, save );
                       };



                   }else {
                       alert("File import không đúng định dạng hoặc bị lỗi.\n" +
                           "Vui lòng import file data JSON hoặc file có tên '... work.json'")
                   }
                });
            }else {alert("Bạn chưa import data, hoặc import file không đúng kểu dữ liệu \n Kiểu dữ liệu đúng phải là '.JSON'")}

        };


	});

	scotchApp.controller('contactController', function($scope, $http) {

	})

    scotchApp.controller('aboutController', function ($scope, $http){
        $http.get('about.json').success(function(data) {
            $scope.about = data;
        });
    });

    scotchApp.controller('planController', function($scope) {

    });




