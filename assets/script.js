//grab sections from html
var element = document.querySelector("#buttonArea");

//grab text from html
var dateText = document.querySelector("#dateText");
var tempText = document.querySelector("#tempText");
var humidityText = document.querySelector("#humidText");
var windText = document.querySelector("#windText");
var cityName = document.querySelector("#cityName");
var uvText = document.querySelector("#UVText");


var dayOne = document.querySelector("#dayOne");
var dayTwo = document.querySelector("#dayTwo");
var daythree = document.querySelector("#dayThree");
var dayfour = document.querySelector("#dayFour");
var dayfive = document.querySelector("#dayFive");


var latText = document.querySelector("#lat");
var lonText = document.querySelector("#lon");

//grab buttons from html
var searchButton = document.querySelector("#searchButton");
var saveButton = document.querySelector("#saveButton");

var slot1 = element.childNodes[1];
var slot2 = element.childNodes[3];
var slot3 = element.childNodes[5];
var slot4 = element.childNodes[7];

slot1.textContent = localStorage.getItem("slot1");
slot2.textContent = localStorage.getItem("slot2");
slot3.textContent = localStorage.getItem("slot3");
slot4.textContent = localStorage.getItem("slot4");

//variables to store lat and lon
var lat;
var lon;



function dates (x){
  var day = moment().add(x, 'days').format('MMM Do YY');

  return day;
}

dayOne.textContent = dates(1);
dayTwo.textContent = dates(2);
dayThree.textContent = dates(3);
dayfour.textContent = dates(4);
dayfive.textContent = dates(5);

Date = dates(0);



function fiveDayforcast(cityName){
  var requestUrl = "https://api.openweathermap.org/data/2.5/forecast?q= " +  cityName + "&units=metric&cnt=5&appid=0b140241ee90454edd15e2fd3831a8ee"

  fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        
        tempText1.textContent = "Temperature: " + data.list[0].main.temp + "°C";
        humidText1.textContent = "Humidity: " + data.list[0].main.humidity + "%";

        tempText2.textContent = "Temperature: " + data.list[1].main.temp + "°C";
        humidText2.textContent = "Humidity: " + data.list[1].main.humidity + "%";

        tempText3.textContent = "Temperature: " + data.list[2].main.temp + "°C";
        humidText3.textContent = "Humidity: " + data.list[2].main.humidity + "%";

        tempText4.textContent = "Temperature: " + data.list[3].main.temp + "°C";
        humidText4.textContent = "Humidity: " + data.list[3].main.humidity + "%";

        tempText5.textContent = "Temperature: " + data.list[4].main.temp + "°C";
        humidText5.textContent = "Humidity: " + data.list[4].main.humidity + "%";
      });

}


function searchApi(cityName) {

    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&appid=0b140241ee90454edd15e2fd3831a8ee";
    
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        lon = Number(data.coord.lon);
        lat = Number(data.coord.lat);
        latText.textContent = lat;
        lonText.textContent = lon;

        console.log(Number(lonText.innerHTML));
        console.log(Number(latText.innerHTML));



        cityText.textContent = data.name + " (" + Date + ")";
        windText.textContent =  "Wind Speed: " + data.wind.speed +"km/h";
        tempText.textContent = "Temperature: " + data.main.temp + "°C";
        humidityText.textContent = "Humidity: " + data.main.humidity + "%";
        
        
      });
  }

  function uvApi(lat, lon){
    var requestUrl = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&units=metric&appid=0b140241ee90454edd15e2fd3831a8ee";

    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        uvText.textContent = "UV Index: " + data.value;
        
        
      });

  }


  
  
//variable to hold user input
  var userInput;

  searchButton.addEventListener('click', function(){
      userInput = document.getElementById("searchBar").value;
      searchApi(userInput);
      fiveDayforcast(userInput);
      uvApi(Number(latText.innerHTML), Number(lonText.innerHTML));
      
  });
  
  //variable to hold count for save button evnent listener has to be outside so it doesn't effect the increasing of the count
  var count = 1;

  saveButton.addEventListener('click', function(){
      
      
      if (count ==1){
        slot1.innerHTML = userInput;
        localStorage.setItem("slot1", userInput);
      }
      else if(count ==2){
        slot2.textContent = userInput;
        localStorage.setItem("slot2", userInput);
      }
      else if (count ==3){
        slot3.textContent = userInput;
        localStorage.setItem("slot3", userInput);
      }
      else if (count ==4){
        slot4.textContent = userInput;
        localStorage.setItem("slot4", userInput);
        count = 0;
      }
      count ++;

  })

function cityButtons(button){
  button.addEventListener('click', function(){
    var city = button.innerHTML;
    searchApi(city);
    fiveDayforcast(city);
    uvApi(Number(latText.innerHTML), Number(lonText.innerHTML));
  })
}

cityButtons(slot1);
cityButtons(slot2);
cityButtons(slot3);
cityButtons(slot4);
  
