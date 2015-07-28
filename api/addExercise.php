<?php

include 'includes/connect.inc.php';

$data = json_decode(file_get_contents('php://input'), true);

$name = $data['name'];
$reps = $data['reps'];
$sets = $data['sets'];
$desc = $data['desc'];
$muscleGroup = htmlspecialchars($data['muscleGroup'],ENT_QUOTES);

$sql = "INSERT INTO exercieses (name, reps, sets, description, muscleGroup) VALUES (?,?,?,?,?)";

try {
	$statement = $db->prepare($sql);
	$statement->execute(array($name, $reps, $sets, $desc, $muscleGroup));
} catch(PDOException $e) {
	echo 'Could not att Exercise';
	echo 'Error: ' . $e;
}
