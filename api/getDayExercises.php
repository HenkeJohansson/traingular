<?php

include 'includes/connect.inc.php';
include 'includes/functions.inc.php';

$day = $_GET['day'];

$sql = "SELECT * FROM day_exercises
		INNER JOIN exercises ON day_exercises.exercise_id = exercises.id
        WHERE day = '$day'";
$result = $db->query($sql);

$groups = getAllExercises($result, 'day');

$exercises = $groups[$day];
echo json_encode($exercises);