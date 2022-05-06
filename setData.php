<?php
$array = Array (
	"inidate" => $_GET['inidate'],
	"expdate" => $_GET['expdate'],
	"month" => $_GET['month'],
	"year" => $_GET['year']
);
$json = json_encode($array);
echo "$json";
file_put_contents("data.json", $json);
?>
