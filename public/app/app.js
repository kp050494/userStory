angular.module('MyApp',['appRoutes','mainCtrl','authService','userService','userCtrl','storyService','storyCtrl'])

.config(function($httpProvider){

	$httpProvider.interceptors.push('AuthInterceptor');
})