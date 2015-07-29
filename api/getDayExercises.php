<?php

include 'includes/connect.inc.php';
include 'includes/functions.inc.php';

$day = $data['day'];

$sql = "SELECT * FROM day_exercieses WHERE day = $day INNER JOIN exercises ON day_exercieses.exercise_id = exercises.id";
$result = $db->query($sql);

$groups = getAllExercises($result, 'day');

echo json_encode($groups);