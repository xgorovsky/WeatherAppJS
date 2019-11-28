window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescrtiption = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let degreeWrapper = document.querySelector('.temperature');
    let degreeWrapperSpan = document.querySelector('.temperature span');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/'
            const api = `${proxy}https://api.darksky.net/forecast/83992abc77fa94a439b0f6dfb2ce1b63/${lat},${long}`
            fetch(api)
            .then(response =>{
                return response.json();
            })
            .then(data =>{
                console.log(data);
                const { temperature, summary, icon } = data.currently;
                //Celsius formula
                let celsius = (temperature - 32) * (5 / 9);
                //Set DOM Elements from the API
                temperatureDegree.textContent = Math.round(celsius);
                temperatureDescrtiption.textContent = summary;
                locationTimezone.textContent = data.timezone;
                //Set Icons
                setIcons(icon, document.querySelector(".icon"));
                //Change temp to Celsius/Fahrenheit
                degreeWrapper.addEventListener('click', () =>{
                    if (degreeWrapperSpan.textContent === "°C") {
                        degreeWrapperSpan.textContent = "°F";
                        temperatureDegree.textContent = Math.round(temperature);
                    } else {
                        degreeWrapperSpan.textContent = "°C";
                        temperatureDegree.textContent = Math.round(celsius);
                    }
                })
            });
        });

    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    };
});