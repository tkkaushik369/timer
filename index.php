<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title></title>
	<link rel="stylesheet" type="text/css" href="style.css">
</head>
<body onload="init()">
	<fieldset>
		<legend>Expiry Date:</legend>
		<label for="expiry_date">Enter Expiry Date: </label>
		<input type="date" id="expiry_date" name="expiry_date">
		<button onclick="createCalender()">Submit</button>
		<br><br>
		<a id="time_span">From --:-- to --:--</a>
		<br>
		<a id="countup">--:--/--:--</a><br>
		<a id="countdown">--:--/--:--</a>
	</fieldset>
	<center><table id="calender"></table></center>

<script type="text/javascript" src="script.js"></script>
</body>
</html>