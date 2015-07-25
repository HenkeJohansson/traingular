/*
** Name: TrainerApp ...?
** Author: Henke Johansson
** Version: 1.0
*/

var trainerApp = angular.module('trainerApp', ['ngRoute', 'ui.bootstrap']);

/*********************************************************************************
** 																	       CONFIGS
*********************************************************************************/
trainerApp.config(function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl  : 'pages/home.html',
			controller 	 : 'homeCtrl',
			controllerAs : 'home'
		})
		.when('/exercises', {
			templateUrl  : 'pages/exercises.html',
			controller   : 'routinesCtrl',
			controllerAs : 'routines'
		})
		.when('/exercises/add', {
			templateUrl  : 'pages/exercisesAdd.html',
			controller 	 : 'routinesCtrl',
			controllerAs : 'routines'
		})
		.when('/exercises/all', {
			templateUrl  : 'pages/exercisesAll.html',
			controller 	 : 'routinesCtrl',
			controllerAs : 'routines'
		})
		.when('/scheme', {
			templateUrl  : 'pages/scheme.html',
			controller   : 'schemeCtrl',
			controllerAs : 'scheme'
		});

		$locationProvider.html5Mode(true);
});


trainerApp.run(function($rootScope) {
	/*
	** One place to change
	** the root path
	*/
	$rootScope.endPoint = 'http://localhost:8888';
});


/*********************************************************************************
** 																		  SERVICES
*********************************************************************************/
trainerApp.service('exercisesService', function($http, $q, $rootScope) {
	/*
	** Service for getting exercises
	** for use in Controllers
	*/
	var deferred = $q.defer();

	$http.get($rootScope.endPoint + '/api/getExercises.php').then(function(data) {
		deferred.resolve(data);
	});

	this.getExercises = function() {
		return deferred.promise;
	};
});

/*********************************************************************************
** 																	   CONTROLLERS
*********************************************************************************/
trainerApp.controller('mainCtrl', function() {
	/*
	** Övergripande Controller för appen
	** hanterar bland annat menyn
	*/
	var main = this;

	this.isOpened = false;
	this.toggleMenu = function() {
		main.isOpened = !main.isOpened;
	};

	this.closeMenu = function() {
		main.isOpened = false;
	};

});


trainerApp.controller('homeCtrl', function(exercisesService) {
	/*
	** Controller till start sidan
	** i dagsläget behövs inte så mycket av den
	*/
	var home = this;
	this.headline = 'TrainerApp';

	// Gets exercises from the database
	var promise = exercisesService.getExercises();
	promise.then(function(data) {
		home.exercises = data;
		// console.log(home.exercises);
	});
});


trainerApp.controller('routinesCtrl', function(exercisesService) {
	/*
	** Ska visa alla övningar som finns inlagda
	** och ska filtreras per muskelgrupp.
	** Ska även kunna lägga till nya övningar
	** till databasen som sedan blir sökbara.
	*/
	var routines = this;
	this.headline = "Övningar";

	this.oneAtATime = true;

	/*************************************************************
	** 											 Get All Exercises
	*************************************************************/
	
	// Gets exercises from the database
	var promise = exercisesService.getExercises();
	promise.then(function(data) {
		routines.muscleGroups = data.data;
	});

	
	/*************************************************************
	** 												 Add Exercises
	*************************************************************/

	routines.add = [];

	routines.addExercise = function() {
		routines.add.push({
			name: routines.name,
			muscleGroup: routines.muscleGroup,
			reps: routines.reps,
			sets: routines.sets,
			desc: routines.desc
		});

		// Sist tömms fälten
		// routines.add = '';
	};

});


trainerApp.controller('schemeCtrl', function() {
	/*
	** Kollar automatiskt vilken dag i veckan det är och visar
	** den dagens schema som standard. Går efter ens kongiuerade
	** schema som man kan bestämma själv.
	*/
	var scheme = this;
	this.headline = "Schema";


	/*************************************************************
	** 												 Day Functions
	*************************************************************/
	scheme.mon = function() {
		scheme.day = 'Måndag';
		scheme.muscleGroups = 'Bröst & Axlar';
		
		scheme.exercises = [


			{
				id 	 : 10,
				name : 'Shoulder Presses',
				reps: 10,
				sets : 3,
				desc : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore dolores, quos odit consequuntur nam facere consectetur maiores.'
			},
			{
				id 	 : 11,
				name : 'Arnold Shoulder Presses',
				reps : 8,
				sets : 3,
				desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis quas libero voluptatum magnam tempora, aliquam, aliquid!'
			},
			{
				id 	 : 12,
				name : 'Biceps Curls',
				reps: 10,
				sets : 3,
				desc : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
			},
			{
				id 	 : 13,
				name : 'Triceps pushdowns',
				reps : 8,
				sets : 3,
				desc: 'Lorem ipsum dolor sit.'
			},
			{
				id 	 : 14,
				name : 'Bench Press',
				reps: 10,
				sets : 3,
				desc : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa ullam, ipsam.'
			},
			{
				id 	 : 15,
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
				id 	 : 6,
				name : 'Squats',
				reps: 10,
				sets : 3,
				desc : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium, quibusdam.'
			},
			{
				id 	 : 7,
				name : 'Marklyft',
				reps : 8,
				sets : 3,
				desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, perspiciatis officiis ad. Alias, porro tempora.'
			},
			{
				id 	 : 8,
				name : 'Låg rodd',
				reps: 10,
				sets : 3,
				desc : 'Lorem ipsum dolor sit amet, consectetur adipisicing.'
			},
			{
				id 	 : 9,
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
				id 	 : 1,
				name : 'Situps',
				reps: 10,
				sets : 3,
				desc : 'Lorem ipsum dolor sit.'
			},
			{
				id 	 : 2,
				name : 'Spider Man Armhävningar',
				reps : 8,
				sets : 3,
				desc: 'Lorem ipsum dolor sit amet.'
			},
			{
				id 	 : 3,
				name : 'Biceps Curls',
				reps: 10,
				sets : 3,
				desc : 'Lorem ipsum dolor sit.'
			},
			{
				id 	 : 4,
				name : 'Triceps pushdowns',
				reps : 8,
				sets : 3,
				desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing.'
			},
			{
				id 	 : 5,
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


	/*************************************************************
	** 												 Todays Scheme
	*************************************************************/

	scheme.today = new Date();

	scheme.dayFunctions = {
		1 : scheme.mon,
		2 : scheme.tue,
		3 : scheme.wed,
		4 : scheme.thu,
		5 : scheme.fri,
		6 : scheme.sat,
		0 : scheme.sun
	};


	scheme.dayFunctions[scheme.today.getDay()]();

	/*************************************************************
	** 											   Check Exercises
	*************************************************************/

	this.done = false;

});
