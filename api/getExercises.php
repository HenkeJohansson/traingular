<?php

include 'includes/connect.inc.php';


$sql = "SELECT * FROM exercieses";
$result = $db->query($sql);


$exercieses = array();

foreach ($result as $row) {
	$name = $row['name'];
	$reps = $row['reps'];
	$sets = $row['sets'];
	$desc = $row['description'];
	$muscleGroup = $row['muscleGroup'];
}

// $result = array('muscleGroup' => $exercises);
echo '<pre>';
var_dump($exercieses);
echo '</pre>';