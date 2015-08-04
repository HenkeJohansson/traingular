<?php

function getAllExercises($result, $groupName) {
	$groups = array();

	foreach ($result as $row) {
		$id = $row['id'];
		$name = $row['name'];
		$reps = $row['reps'];
		$sets = $row['sets'];
		$desc = $row['description'];
		$group = $row[$groupName];

		if ( !array_key_exists($group, $groups) ) {
			$groups[$group] = array();
		}

		$exercise = array(
			'id'   => $id,
			'name' => $name,
			'reps' => $reps,
			'sets' => $sets,
			'desc' => $desc
		);
		$groups[$group][] = $exercise;
	}

	return $groups;
}