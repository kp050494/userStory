angular.module('mainCtrl',[])

.controller('MainController', function($rootScope,$location,Auth){
	var vm = this;

	vm.loggedIn = Auth.isLoggedIn();

	$rootScope.$on('$routeChangeStart',function(){

		vm.loggedIn = Auth.isLoggedIn();
		Auth.getUser()
			.then(function(data){
				vm.user = data.data;
			});
	});

	vm.doLogin = function(){
		vm.processing = true;
		vm.error = '';
		//console.log("Login data"+vm.loginData.username);
		Auth.login(vm.loginData.username,vm.loginData.password)
			.success(function(data){
				//console.log("Inside Success"+data+" "+data.token);
				vm.processing = false;
				Auth.getUser()
					.then(function(data){
						vm.user = data.data;
					});
					if(data.success)
					{
						$location.path('/');
					}
					else
						vm.error = data.message;
			});
	}

	vm.doLogout = function(){
		Auth.logout();
		$location.path('/logout');
	}

});