<?php

include 'includes/connect.inc.php';
include 'includes/functions.inc.php';

$sql = "SELECT 
			day_exercises.day,
			exercises.id AS id,
			exercises.name,
			exercises.reps,
			exercises.sets,
			exercises.description,
			exercises.muscleGroup
		FROM day_exercises
		INNER JOIN exercises ON day_exercises.exercise_id = exercises.id";

$result = $db->query($sql);

$groups = getAllExercises($result, 'day');

$exercises = $groups;
echo json_encode($exercises);