/*
** Name: TrainerApp ...?
** Author: Henke Johansson
** Version: 1.0
*/

var trainerApp = angular.module('trainerApp', ['ngRoute', 'ui.bootstrap']);

trainerApp.config(function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl  : 'pages/home.html',
			controller 	 : 'mainCtrl',
			controllerAs : 'main'
		})
		.when('/exercises', {
			templateUrl  : 'pages/exercises.html',
			controller   : 'routinesCtrl',
			controllerAs : 'routines'
		})
		.when('/scheme', {
			templateUrl  : 'pages/scheme.html',
			controller   : 'schemeCtrl',
			controllerAs : 'scheme'
		});

		$locationProvider.html5Mode(true);
});

trainerApp.controller('mainCtrl', function() {

	var main = this;
	main.message = 'This is Main Controller to Major Tom';

});

trainerApp.controller('routinesCtrl', function() {
	/*
	** Ska visa alla övningar och ska filtreras per muskelgrupp
	*/
	var routines = this;

	routines.oneAtATime = true;


	routines.muscleGroups = [

		{
			name : 'Axlar',
			exercises : [
				{
					name : 'Shoulder Presses',
					reps: 10,
					sets : 3,
					desc : 'Lorem Ipsum'
				},
				{
					name : 'Arnold Shoulder Presses',
					reps : 8,
					sets : 3,
					desc: 'beskrivning'
				}
			]
		},
		{
			name : 'Armar',
			exercises : [
				{
					name : 'Biceps Curls',
					reps: 10,
					sets : 3,
					desc : 'Lorem Ipsum'
				},
				{
					name : 'Triceps pushdowns',
					reps : 8,
					sets : 3,
					desc: 'beskrivning'
				}
			]
		},
		{
			name : 'Bröst',
			exercises : [
				{
					name : 'Bench Press',
					reps: 10,
					sets : 3,
					desc : 'Lorem Ipsum'
				},
				{
					name : 'Cable Flyes',
					reps : 8,
					sets : 3,
					desc: 'beskrivning'
				}
			]
		},
		{
			name : 'Rygg',
			exercises : [
				{
					name : 'one',
					reps: 10,
					sets : 3,
					desc : 'Lorem Ipsum'
				},
				{
					name : 'two',
					reps : 8,
					sets : 3,
					desc: 'beskrivning'
				}
			]
		},
		{
			name : 'Mage',
			exercises : [
				{
					name : 'one',
					reps: 10,
					sets : 3,
					desc : 'Lorem Ipsum'
				},
				{
					name : 'two',
					reps : 8,
					sets : 3,
					desc: 'beskrivning'
				}
			]
		},
		{
			name : 'Ben',
			exercises : [
				{
					name : 'one',
					reps: 10,
					sets : 3,
					desc : 'Lorem Ipsum'
				},
				{
					name : 'two',
					reps : 8,
					sets : 3,
					desc: 'beskrivning'
				}
			]
		},

	];

});

trainerApp.controller('schemeCtrl', function() {
	/*
	** Ska automatiskt kolla vilken dag det är och visa
	** den dagens schema automatiskt. Ska php eller JS kolla?
	*/
	var scheme = this;

});