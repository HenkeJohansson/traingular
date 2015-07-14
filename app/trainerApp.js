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
	main.headline = 'TrainerApp';

});

trainerApp.controller('routinesCtrl', function() {
	/*
	** Ska visa alla övningar och ska filtreras per muskelgrupp
	*/
	var routines = this;
	routines.headline = "Övningar";

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
	scheme.headline = "Schema";


	/***********************************************************************************************************
	**
	** 											Day Functions
	**
	***********************************************************************************************************/
	scheme.mon = function() {
		scheme.day = 'Måndag';
		scheme.muscleGroups = 'Bröst & Axlar';
		
		scheme.exercises = [


			{
				name : 'Shoulder Presses',
				reps: 10,
				sets : 3,
				desc : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore dolores, quos odit consequuntur nam facere consectetur maiores.'
			},
			{
				name : 'Arnold Shoulder Presses',
				reps : 8,
				sets : 3,
				desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis quas libero voluptatum magnam tempora, aliquam, aliquid!'
			},
			{
				name : 'Biceps Curls',
				reps: 10,
				sets : 3,
				desc : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
			},
			{
				name : 'Triceps pushdowns',
				reps : 8,
				sets : 3,
				desc: 'Lorem ipsum dolor sit.'
			},
			{
				name : 'Bench Press',
				reps: 10,
				sets : 3,
				desc : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa ullam, ipsam.'
			},
			{
				name : 'Cable Flyes',
				reps : 8,
				sets : 3,
				desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
			},

		];
	};

	scheme.tue = function() {
		scheme.day = 'Tisdag';
		scheme.muscleGroups = 'Vilodag';
		scheme.exercises = [];
	};

	scheme.wed = function() {
		scheme.day = 'Onsdag';
		scheme.muscleGroups = 'Rygg & Ben';
		
		scheme.exercises = [


			{
				name : 'Squats',
				reps: 10,
				sets : 3,
				desc : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium, quibusdam.'
			},
			{
				name : 'Marklyft',
				reps : 8,
				sets : 3,
				desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, perspiciatis officiis ad. Alias, porro tempora.'
			},
			{
				name : 'Låg rodd',
				reps: 10,
				sets : 3,
				desc : 'Lorem ipsum dolor sit amet, consectetur adipisicing.'
			},
			{
				name : 'Plankan',
				reps : 8,
				sets : 3,
				desc: 'Lorem ipsum dolor sit amet.'
			},
		];
	};

	scheme.thu = function() {
		scheme.day = 'Torsdag';
		scheme.muscleGroups = 'Vilodag';
		scheme.exercises = [];
	};

	scheme.fri = function() {
		scheme.day = 'Fredag';
		scheme.muscleGroups = 'Mage & Armar';
		
		scheme.exercises = [


			{
				name : 'Situps',
				reps: 10,
				sets : 3,
				desc : 'Lorem ipsum dolor sit.'
			},
			{
				name : 'Spider Man Armhävningar',
				reps : 8,
				sets : 3,
				desc: 'Lorem ipsum dolor sit amet.'
			},
			{
				name : 'Biceps Curls',
				reps: 10,
				sets : 3,
				desc : 'Lorem ipsum dolor sit.'
			},
			{
				name : 'Triceps pushdowns',
				reps : 8,
				sets : 3,
				desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing.'
			},
			{
				name : 'situps 2',
				reps: 10,
				sets : 3,
				desc : 'Lorem ipsum dolor sit amet, consectetur.'
			},
		];
	};

	scheme.sat = function() {
		scheme.day = 'Lördag';
		scheme.muscleGroups = 'Springa';
		scheme.exercises = [];
	};

	scheme.sun = function() {
		scheme.day = 'Söndag';
		scheme.muscleGroups = 'Netflix';
		scheme.exercises = [];
	};


	/***********************************************************************************************************
	**
	** 											Todays scheme
	**
	***********************************************************************************************************/

	scheme.today = new Date();


	scheme.dayFunctions = {
		1 : scheme.mon,
		2 : scheme.tue,
		3 : scheme.wed,
		4 : scheme.thu,
		5 : scheme.fri,
		6 : scheme.sat,
		7 : scheme.sun
	};


	scheme.dayFunctions[scheme.today.getDay()]();


});
