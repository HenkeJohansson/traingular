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
			controller 	 : 'addRoutinesCtrl',
			controllerAs : 'addRoutines'
		})
		.when('/exercises/all', {
			templateUrl  : 'pages/exercisesAll.html',
			controller 	 : 'getRoutinesCtrl',
			controllerAs : 'getRoutines'
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
trainerApp.service('exercisesService', function($http, $q) {
	/*
	** Service for getting exercises
	** to use in Controllers or
	** add exercises to database
	** maybe even update...
	*/

	this.getAllExercises = function () {
		var deferredAll = $q.defer();

		$http.get('api/getAllExercises.php').then(function(data) {
			deferredAll.resolve(data);
		});

		return deferredAll.promise;
	};

	
	this.getDayExercises = function() {
		var deferredDay = $q.defer();
		var day = 1;

		$http.get('api/getDayExercises.php?day='+day).then(function(data) {
			deferredDay.resolve(data);
		});

		return deferredDay.promise;
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

	home.muscleGroups = [];

	home.getDayExercises = function() {
		// Gets exercises from the database
		var promise = exercisesService.getDayExercises();
		promise.then(function(data) {
			home.muscleGroups.length = 0;
			for (var i = 0; i < data.data.length; i++) {
				home.muscleGroups.push(data.data[i]);
			}
		});
	};

	home.getDayExercises();

});


trainerApp.controller('routinesCtrl', function(exercisesService, $rootScope, $http) {
	/*
	** Ska visa alla övningar som finns inlagda
	** och ska filtreras per muskelgrupp.
	** Ska även kunna lägga till nya övningar
	** till databasen som sedan blir sökbara.
	*/
	var routines = this;
	this.headline = "Övningar";

	this.oneAtATime = true;
});


trainerApp.controller('getRoutinesCtrl', function(exercisesService) {
	/*
	** Gets all Exercises
	*/

	var getRoutines = this;
	this.headline = 'Alla Övningar';

	getRoutines.muscleGroups = [];

	getRoutines.getExercises = function() {
		// Gets exercises from the database
		var promise = exercisesService.getAllExercises();
		promise.then(function(data) {
			getRoutines.muscleGroups.length = 0;
			for (var i = 0; i < data.data.length; i++) {
				getRoutines.muscleGroups.push(data.data[i]);
			}
		});
	};

	getRoutines.getExercises();
});

trainerApp.controller('addRoutinesCtrl', function($http) {
	/*
	** Adds exercise to database
	*/

	var addRoutines = this;
	this.headline = 'Lägg till';

	/*************************************************************
	** 												 Add Exercises
	*************************************************************/

	addRoutines.add = [];

	addRoutines.addExercise = function() {
		var exerciseAdd = {
			name: addRoutines.name,
			muscleGroup: addRoutines.muscleGroup,
			reps: addRoutines.reps,
			sets: addRoutines.sets,
			desc: addRoutines.desc
		};
		addRoutines.add.push(exerciseAdd);

		$http.post('api/addExercise.php', exerciseAdd).
			success(function(){
				// Sist tömms fälten
				addRoutines.name = '';
				addRoutines.muscleGroup = '';
				addRoutines.reps = '';
				addRoutines.sets = '';
				addRoutines.desc = '';
			});
	};
});


trainerApp.controller('schemeCtrl', function(exercisesService) {
	/*
	** Kollar automatiskt vilken dag i veckan det är och visar
	** den dagens schema som standard. Går efter ens kongiuerade
	** schema som man kan bestämma själv.
	*/
	var scheme = this;
	this.headline = "Schema";


	scheme.exercises = [];

	scheme.getDayExercises = function() {
		// Gets exercises from the database
		var promise = exercisesService.getDayExercises();
		promise.then(function(response) {
			scheme.exercises = response.data;
			scheme.dayFunctions[scheme.today.getDay()]();
		});
	};

	scheme.getDayExercises();

	/*************************************************************
	** 												 Day Functions
	*************************************************************/
	scheme.mon = function() {
		scheme.day = 'Måndag';
		scheme.muscleGroups = 'Bröst & Axlar';
		scheme.dayExercises = scheme.exercises[0];
	};

	scheme.tue = function() {
		scheme.day = 'Tisdag';
		scheme.muscleGroups = 'Vilodag';
		scheme.dayExercises = scheme.exercises[0];

	};

	scheme.wed = function() {
		scheme.day = 'Onsdag';
		scheme.muscleGroups = 'Rygg & Ben';
		scheme.dayExercises = scheme.exercises[2];
	};

	scheme.thu = function() {
		scheme.day = 'Torsdag';
		scheme.muscleGroups = 'Vilodag';
		scheme.dayExercises = scheme.exercises[3];
	};

	scheme.fri = function() {
		scheme.day = 'Fredag';
		scheme.muscleGroups = 'Mage & Armar';
		scheme.dayExercises = scheme.exercises[4];
	};

	scheme.sat = function() {
		scheme.day = 'Lördag';
		scheme.muscleGroups = 'Springa';
		scheme.dayExercises = scheme.exercises[5];
	};

	scheme.sun = function() {
		scheme.day = 'Söndag';
		scheme.muscleGroups = 'Netflix';
		scheme.dayExercises = scheme.exercises[6];
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
