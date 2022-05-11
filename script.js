function di(id) { return document.getElementById(id); }
const mon = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var finaldate, initialdate;

/*
	JSON Format
{
    "seconds": "1",
    "minutes": "47",
    "hours": "17",
    "inidate": "1",
    "expdate": "25",
    "inimonth": "4",
    "expmonth": "4",
    "iniyear": "2022",
    "expyear": "2022"
}
*/

function init() {
	const today = new Date();
	file = "data.json";
	var rawFile = new XMLHttpRequest();
	rawFile.open("GET", file, false);
	rawFile.onreadystatechange = function () {
		if(rawFile.readyState === 4) {
			if(rawFile.status === 200 || rawFile.status == 0) {
				var data = JSON.parse(rawFile.responseText);
				di("time_span").innerHTML = "From "+mon[data['inimonth']]+" "+data['inidate']+", "+data['iniyear'];
				di("time_span").innerHTML += " to "+mon[data['expmonth']]+" "+data['expdate']+", "+data['expyear'];
				draftCalender(
					data['seconds'],
					data['minutes'],
					data['hours'],
					data['inidate'], data['expdate'],
					data['inimonth'], data['expmonth'],
					data['iniyear'], data['expyear']);
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
	draftCalender(
		today.getSeconds(),
		today.getMinutes(),
		today.getHours(),
		today.getDate(), parseInt(exp_date[2]),
		today.getMonth(), (parseInt(exp_date[1])-1),
		today.getFullYear(), parseInt(exp_date[0]));

	var xhttp = new XMLHttpRequest();
	xhttp.open("GET",
		"setData.php?"
		+"seconds="+today.getSeconds()
		+"&minutes="+today.getMinutes()
		+"&hours="+today.getHours()
		+"&inidate="+today.getDate()
		+"&expdate="+parseInt(exp_date[2])
		+"&inimonth="+today.getMonth()
		+"&expmonth="+(parseInt(exp_date[1])-1)
		+"&iniyear="+today.getFullYear()
		+"&expyear="+parseInt(exp_date[0])
	, true);
	xhttp.send();
}

function draftCalender(seconds, minutes, hours, inidate, expdate, inimonth, expmonth, iniyear, expyear) {
	const today = new Date();
	/*const initialdate = new Date(mon[inimonth]+" "+inidate+", "+iniyear).getTime();
	countDownDate = new Date(mon[expmonth]+" "+expdate+", "+expyear).getTime();*/
	initialdate = new Date(iniyear, inimonth, inidate, hours, minutes, seconds);
	finaldate = new Date(expyear, expmonth, expdate, hours, minutes, seconds);
	var cal = di('calender');
	cal.innerHTML = "";

	var dis = Math.floor((today - initialdate) / (1000 * 60 * 60 * 24));
	days = Math.floor((finaldate - initialdate) / (1000 * 60 * 60 * 24));

	di("time_span").innerHTML = "From "+mon[inimonth]+" "+inidate+", "+iniyear;
	di("time_span").innerHTML += " to "+mon[expmonth]+" "+expdate+", "+expyear;
				

	for(var i=0; i<=(days/10); i++) {
		const tr = document.createElement("tr");
		cal.appendChild(tr);
	}
	var j=0;
	for(var i=1; i<=days; i++) {
		const td = document.createElement("td");
		td.innerHTML = i;
		if(i < dis) {td.className = "disable";}
		else if(i == dis) {td.className = "active";}
		cal.getElementsByTagName("tr")[j].appendChild(td);
		if(i%10 == 0) {j++;}
	}
}

var x = setInterval(function() {
	var now = new Date().getTime();

	var distance1 = now - initialdate.getTime();
	var distance2 = finaldate.getTime() - now;
	
	var days1 = Math.floor(distance1 / (1000 * 60 * 60 * 24));
	var hours1 = Math.floor((distance1 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	var minutes1 = Math.floor((distance1 % (1000 * 60 * 60)) / (1000 * 60));
	var seconds1 = Math.floor((distance1 % (1000 * 60)) / 1000);

	var days2 = Math.floor(distance2 / (1000 * 60 * 60 * 24));
	var hours2 = Math.floor((distance2 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	var minutes2 = Math.floor((distance2 % (1000 * 60 * 60)) / (1000 * 60));
	var seconds2 = Math.floor((distance2 % (1000 * 60)) / 1000);

	di("countup").innerHTML = "No. of Days "+days1+"d "+hours1+"h "+minutes1+"m "+seconds1+"s ";
	di("countdown").innerHTML = "Expired till "+days2+"d "+hours2+"h "+minutes2+"m "+seconds2+"s ";

	if (distance2 < 0) {
		clearInterval(x);
		di("countdown").innerHTML = "EXPIRED";
	}
}, 1000);