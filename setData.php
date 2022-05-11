<?php
$array = Array (
	"seconds" => $_GET['seconds'],
	"minutes" => $_GET['minutes'],
	"hours" => $_GET['hours'],
	"inidate" => $_GET['inidate'],
	"expdate" => $_GET['expdate'],
	"inimonth" => $_GET['inimonth'],
	"expmonth" => $_GET['expmonth'],
	"iniyear" => $_GET['iniyear'],
	"expyear" => $_GET['expyear']
);
$json = json_encode($array);
echo "$json";
file_put_contents("data.json", $json);
?>
