"use strict";

//////////////////////////////geras
//const URL = "https://api.openweathermap.org/data/2.5/forecast?id=5128638&units=metric&appid=e0b94aa02a3ba2cec8df42fa5ea29f8b";


window.addEventListener('load', ()=> {
	let mainTemp = document.querySelector('.main-temperature');
	let mainCity = document.querySelector('.city-name');
	let iconMain = document.querySelector('.main-weather-icon img');

	const api = "https://api.openweathermap.org/data/2.5/forecast?id=5128638&units=metric&appid=e0b94aa02a3ba2cec8df42fa5ea29f8b";

	fetch(api).then(response => {
		return response.json();
	})
	.then(data => {
		console.log(data);
		/////////////////temperatura
		const {temp} = data.list[0].main;
		//console.log(data.list[0].main.temp);
		mainTemp.textContent = Math.floor(temp) + '°C';

		let description = document.querySelector('.weather-description');
		description.textContent = data.list[0].weather[0].main;


		///////miestas
		const {name} = data.city;
		mainCity.textContent = name;


		///////////pagr ikona
		//console.log(data.list[0].weather[0].icon);
		iconMain.src = "http://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png";
		//iconMain.textContent = iconMain.src;

		

		/////////////////////////////////////////////days of the week
		let d = new Date();
	  var weekday = new Array(7);
	  weekday[0] = "Sunday";
	  weekday[1] = "Monday";
	  weekday[2] = "Tuesday";
	  weekday[3] = "Wednesday";
	  weekday[4] = "Thursday";
	  weekday[5] = "Friday";
	  weekday[6] = "Saturday";

		
	  let today = new Date().toISOString().split('T')[0];
	  //console.log(today);	
	  //console.log(data.list[1].dt_txt.slice(0, 10));



       //day-of-the-week
       let whichDayIsIt = document.querySelectorAll('.day-of-the-week');
       let nextDayArr = [];
		for(let i = 8; i < data.list.length; i+=8){
			//console.log(data.list[i].dt_txt);
			nextDayArr.push(data.list[i].dt_txt);
		}
		for(let i = 0; i < data.list.length; i++){
			if(data.list[i] == data.list[data.list.length - 1]){
				nextDayArr.push(data.list[i].dt_txt);
			}
		}
		//console.log(nextDayArr);

		let nextDayArrName = [];
		for(let i = 0; i < nextDayArr.length; i++){
			nextDayArrName.push(new Date(nextDayArr[i]));
		}
		//console.log(nextDayArrName);

		for(let i = 0; i < whichDayIsIt.length; i++){
			whichDayIsIt[i].innerHTML = weekday[nextDayArrName[i].getDay()];
		}

 
		/////////////////////////////////////////////////////////min max temp

		let minToday = 90;
		let maxToday = -100;
		let maxValArr = [];
		for(let i = 0; i < data.list.length; i++){
			if(data.list[i].dt_txt.slice(0, 10) != today){
				//console.log(maxToday);
				maxValArr.push(maxToday);
				//console.log(data.list[i].dt_txt.slice(0, 10));
				
				today = data.list[i].dt_txt.slice(0, 10);
				maxToday = -100;
			}
				 if(data.list[i].main.temp_max > maxToday){
				 	maxToday = data.list[i].main.temp_max;
				 }
					 if(data.list[i] == data.list[data.list.length - 1]){
					 	//console.log(maxToday);
					 	maxValArr.push(maxToday);
					 }
		}
		//console.log(maxValArr);

		let dayMaxx = document.querySelectorAll('.day-max-temp');

		for(let i = 0; i < dayMaxx.length; i++){
			dayMaxx[i].innerHTML = Math.floor(maxValArr[i+1]) + '°C';
		}

	
		let minValArr = [];
		for(let j = 0; j < data.list.length; j++){
			if(data.list[j].dt_txt.slice(0, 10) != today){
				//console.log(minToday);
				minValArr.push(minToday);
				//console.log(data.list[j].dt_txt.slice(0, 10));
				
				today = data.list[j].dt_txt.slice(0, 10);
				minToday = 90;
			}
				 if(data.list[j].main.temp_min < minToday){
				 	minToday = data.list[j].main.temp_min;
				 }
					 if(data.list[j] == data.list[data.list.length - 1]){
					 	//console.log(minToday);
					 	minValArr.push(minToday);
					 }
		}
		//console.log(minValArr);
		let dayMin = document.querySelectorAll('.day-min-temp');
		for(let i = 0; i < dayMin.length; i++){
			dayMin[i].innerHTML = Math.floor(minValArr[i+2]) + '°C';
		}


		///////////////////////////////////////////////////////////////////ikoneles
		//data.list[j].dt_txt.slice(0, 10) == 12:00 val
		//tada ikonele  = data.list[i].weather[0].icon
		let iconArray = [];
		for(let z = 0; z < data.list.length; z++){
			if(data.list[z].dt_txt.slice(11, 19) == '12:00:00' ){
				//console.log(data.list[z].weather[0].icon);
				iconArray.push(data.list[z].weather[0].icon);
			}
		}
		//data.list[z].dt_txt.indexOf('12:00:00')
		//console.log(data.list[1].dt_txt.slice(11, 19));
		//console.log(iconArray);


		let dayIcon = document.querySelectorAll('.day-icon');
		for(let i = 0; i < dayIcon.length; i++){
			dayIcon[i].innerHTML = "<img src='http://openweathermap.org/img/w/" + iconArray[i] + ".png'>";
		}

	})


});



