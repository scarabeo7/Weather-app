// Disclaimer that this project was given by CodeYourFuture as part of training exercise and was taken from youtube
// https://www.youtube.com/watch?v=wPElVpR1rwA&t=1224s

window.addEventListener("load", () => {
  let long;
  let lat;
  const tempDegree = document.querySelector(".temperature-degree");
  const tempDescription = document.querySelector(".temperature-description");
  const timeZone = document.querySelector(".location-timezone");
  const degreeSec = document.querySelector(".temperature");
  const degreeSpan = document.querySelector(".temperature span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const apiKey = "c72f3874fbbea6181dbad7a542490311";
      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`;
      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const { temp } = data.main;
          let test = data.weather[0].description;
          newTest = test.charAt(0).toUpperCase() + test.slice(1);

          function convertKelToC(temp) {
            return temp - 273.15;
          }

          function convertKelToF(temp) {
            return (temp - 273.15) * (9 / 2) + 32;
          }

          // set icons based on weather conditions
          function setIcons(iconKey, icon) {
            const skycons = new Skycons({ color: "white" });
            const currentIcon = icons[iconKey];
            skycons.play();
            return skycons.set(icon, Skycons[currentIcon]);
          }
          // create the icon codes for using skycons
          const icons = {
            clear: "CLEAR_DAY",
            clouds: "PARTLY_CLOUDY_DAY",
            drizzle: "RAIN",
            rain: "SLEET",
            snow: "SNOW",
            Fog: "FOG",
          };

          timeZone.innerHTML = data.name;
          tempDegree.innerHTML = convertKelToF(temp).toFixed(0);
          tempDescription.innerHTML = newTest;

          // Set the icon
          setIcons(data.weather[0].main, document.querySelector(".icon"));

          // change to degree
          degreeSec.addEventListener("click", () => {
            if (degreeSpan.innerHTML === "F") {
              degreeSpan.innerHTML = "C";
              tempDegree.innerHTML = convertKelToC(temp).toFixed(0);
            } else {
              degreeSpan.innerHTML = "F";
              tempDegree.innerHTML = convertKelToF(temp).toFixed(0);
            }
          });
        })
        .catch((error) => console.log(error));
    });
  }
});
