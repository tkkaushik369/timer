function di(id) { return document.getElementById(id); }
const mon = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var countDownDate;

/*
	JSON Format
	{"inidate":"1","expdate":"16","month":"4","year":"2022"}
*/

function init() {
	file = "data.json";
	var rawFile = new XMLHttpRequest();
	rawFile.open("GET", file, false);
	rawFile.onreadystatechange = function () {
		if(rawFile.readyState === 4) {
			if(rawFile.status === 200 || rawFile.status == 0) {
				var data = JSON.parse(rawFile.responseText);
				di("time_span").innerHTML = "From "+mon[data['month']]+" "+data['inidate']+", "+data['year'];
				di("time_span").innerHTML += " to "+mon[data['month']]+" "+data['expdate']+", "+data['year'];
				draftCalender(data['inidate'],data['expdate'],data['month'],data['year']);
			}
		}
	}
	rawFile.send(null);
}

function createCalender() {
	const today = new Date();
	var cal = di('calender');
	cal.innerHTML = "";
	
	var exp_date = di('expiry_date').value;
	exp_date = exp_date.split('-');
	draftCalender(today.getDate(),exp_date[2],today.getMonth(),today.getFullYear());

	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", "setData.php?inidate="+today.getDate()+"&expdate="+exp_date[2]+"&month="+today.getMonth()+"&year="+today.getFullYear(), true);
	xhttp.send(); 
}

function draftCalender(inidate, expdate, month, year) {
	const today = new Date();
	const initialdate = new Date(mon[month]+" "+inidate+", "+year).getTime();
	countDownDate = new Date(mon[month]+" "+expdate+", "+year).getTime();
	var dis = today.getDate() - inidate;
	var cal = di('calender');
	cal.innerHTML = "";
	days = expdate - inidate;

	di("time_span").innerHTML = "From "+mon[month]+" "+inidate+", "+year;
	di("time_span").innerHTML += " to "+mon[month]+" "+expdate+", "+year;
				

	for(var i=0; i<=(days/7); i++) {
		const tr = document.createElement("tr");
		cal.appendChild(tr);
	}
	var j=0;
	for(var i=1; i<=days; i++) {
		const td = document.createElement("td");
		td.innerHTML = i;
		if(i < dis) {td.className = "disable";}
		else if(i == (dis+1)) {td.className = "active";}
		cal.getElementsByTagName("tr")[j].appendChild(td);
		if(i%7 == 0) {j++;}
	}
}

var x = setInterval(function() {
	var now = new Date().getTime();
	var distance = countDownDate - now;
	var days = Math.floor(distance / (1000 * 60 * 60 * 24));
	var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	var seconds = Math.floor((distance % (1000 * 60)) / 1000);

	di("countdown").innerHTML = "Expired till "+days+"d "+hours+"h "+minutes+"m "+seconds+"s ";

	if (distance < 0) {
		clearInterval(x);
		di("countdown").innerHTML = "EXPIRED";
	}
}, 1000);