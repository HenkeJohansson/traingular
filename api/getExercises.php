<?php

include 'includes/connect.inc.php';


$sql = "SELECT * FROM exercieses";
$result = $db->query($sql);

?>

<div style="width:80%;margin:40px auto;">
	<table border="1">
		<thead>
			<tr>
				<th>Namn</th>
				<th>Reps/Sets</th>
				<th>Instruktion</th>
				<th>Muskelgrupp</th>
			</tr>
		</thead>
		<tbody>

			<?php foreach ($result as $row) :
				$name = $row['name'];
				$reps = $row['reps'];
				$sets = $row['sets'];
				$desc = $row['description'];
				$muscleGroup = $row['muscleGroup']; ?>
			<tr>

				<td><?php echo $name; ?></td>
				<td><?php echo $reps . ' - ' . $sets; ?></td>
				<td><?php echo $desc; ?></td>
				<td><?php echo $muscleGroup; ?></td>
			</tr>
			<?php endforeach; ?>

		</tbody>
	</table>
</div>