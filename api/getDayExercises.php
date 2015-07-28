<?php

include 'includes/connect.inc.php';
include 'includes/functions.inc.php';

$sql = "SELECT * FROM exercieses INNER JOIN day_exercises ON exercieses.id = day_exercises.exercise_id";
$result = $db->query($sql);

$groups = getAllExercises($result, 'day');

echo json_encode($groups);