const apikey="412c1e3807f1ca8a9485a0138f31248d";
const apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

async function checkweather(city){
    const response=await fetch(apiUrl + city + `&appid=${apikey}`);

    if(response.status == 404){
        document.querySelector(".error").classList.remove("showerror");
        var elems = document.querySelectorAll(".showme");
        [].forEach.call(elems, function(el) {
            el.classList.add("show");
        });
    }
    else{
        document.querySelector(".error").classList.add("showerror");
    var data= await response.json();

    document.querySelector(".city").innerHTML=data.name
    document.querySelector(".temp").innerHTML=Math.round(data.main.temp)+"°C"
    document.querySelector(".wind").innerHTML="Wind: "+data.wind.speed+" km/h"
    document.querySelector(".humidity").innerHTML="Humidity: "+data.main.humidity+"%"

    const sunrise = new Date(data.sys.sunrise * 1000); // Convert seconds to milliseconds
    const sunset = new Date(data.sys.sunset * 1000); 

    const currentDate = new Date();
    let d=0
    if(currentDate > sunrise && currentDate < sunset)
        d=1;

    const realweather=data.weather[0].main
    const img=document.querySelector(".pic")
    if(d){
        if(realweather=="Clouds")
            img.src="./animated/cloudy-day-2.svg";
        else if(realweather=="Snow")
            img.src="./animated/snowy-3.svg";
        else if(realweather=="Rain")
            img.src="./animated/rainy-2.svg";
        else if(realweather=="thunderstorm")
            img.src="./animated/thunder.svg";
        else
            img.src="./animated/day.svg";
    }
    else{
        if(realweather=="Clouds")
            img.src="./animated/cloudy-night-2.svg";
        else if(realweather=="Snow")
            img.src="./animated/snowy-5.svg";
        else if(realweather=="Rain")
            img.src="./animated/rainy-5.svg";
        else if(realweather=="thunderstorm")
            img.src="./animated/thunder.svg";
        else
            img.src="./animated/night.svg";
    }

    var elems = document.querySelectorAll(".show");
    [].forEach.call(elems, function(el) {
        el.classList.remove("show");
    });
}
}

document.querySelector(".tim").addEventListener("click",()=>{
    // document.querySelector(".mericity").innerHTML
    const city=document.querySelector(".mericity").value;
    checkweather(city);
})

document.querySelector('.mericity').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      // code for enter
      const city=document.querySelector(".mericity").value;
      checkweather(city);
    }
});