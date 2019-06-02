angular.module('authService', [])


.factory('Auth',function($http,$q,AuthToken){
	//console.log('Inside Auth');
	var authFactory = {};

	authFactory.login = function(username, password){
		return $http.post('/api/login',{
			username: username,
			password: password
		})
		.success(function(data){
			AuthToken.setToken(data.token);
			return data;
		});
	}
	authFactory.logout = function(){
		AuthToken.setToken();
	}
	authFactory.isLoggedIn = function(){
		//console.log("isLoogged In"+AuthToken.getToken());
		if(AuthToken.getToken())
		{
			return true;
		}
		else
			return false;
	}
	authFactory.getUser = function(){
		//console.log("Get User"+AuthToken.getToken());
		if(AuthToken.getToken()){
			//console.log('inside');
			var responseObj =  $http.get('/api/me');
			//console.log(responseObj);
			return responseObj;
		}
		else
			return $q.reject({message: "User has no token"});
	}
	return authFactory;
})


.factory('AuthToken', function($window){
	//console.log('Inside AuthToken');
	var authTokenFactory = {};

	authTokenFactory.getToken = function(){
		return $window.localStorage.getItem('token');
	}

	authTokenFactory.setToken = function(token){
		if(token)
			$window.localStorage.setItem('token',token);
		else
			$window.localStorage.removeItem('token');
	}
	return authTokenFactory;
})

.factory('AuthInterceptor', function($q,$location,AuthToken){
	//console.log('Inside AuthInterceptor');
	var interceptorFactory = {};
	//console.log('Inside interceptorFactory');
	interceptorFactory.request = function(config){
		var token = AuthToken.getToken();

		if(token)
		{
			//console.log('Inside interceptorFactory if'+token);
			config.headers['x-access-token'] = token;

		}
		return config;
	};
	interceptorFactory.responseError = function(response){
		//console.log('ssssss');
		if(response.status == 403){
			$location.path('/login');
		}

		return $q.reject(response);
	}
	return interceptorFactory;
});



