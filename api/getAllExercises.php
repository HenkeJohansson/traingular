<?php

include 'includes/connect.inc.php';
include 'includes/functions.inc.php';

$sql = "SELECT * FROM exercises";
$result = $db->query($sql);

$groups = getAllExercises($result, 'muscleGroup');
$result = array();
foreach ($groups as $key => $value) {
	$result[] = array('name' => $key, 'exercises' => $value);
}


echo json_encode($result);