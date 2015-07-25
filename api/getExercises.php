<?php

include 'includes/connect.inc.php';


$sql = "SELECT * FROM exercieses";
$result = $db->query($sql);


$muscleGroups = array();

foreach ($result as $row) {
	$name = $row['name'];
	$reps = $row['reps'];
	$sets = $row['sets'];
	$desc = $row['description'];
	$muscleGroup = $row['muscleGroup'];

	if ( !array_key_exists($muscleGroup, $muscleGroups) ) {
		$muscleGroups[$muscleGroup] = array();
	}

	$exercise = array(
		'name' => $name,
		'reps' => $reps,
		'sets' => $sets,
		'desc' => $desc
	);
	$muscleGroups[$muscleGroup][] = $exercise;
}

$result = array();
foreach ($muscleGroups as $key => $value) {
    $result[] = array('name' => $key, 'exercises' => $value);
}

echo json_encode($result);