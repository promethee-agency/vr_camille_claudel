// RECUPERER LES COORDONNEES DE L'UTILISATEUR
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
} else {
    console.log("La géolocalisation n'est pas prise en charge par ce navigateur.");
}

function successCallback(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    // RECUPERER LES DONNES AVEC L'API
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=is_day,rain,weather_code,cloud_cover&hourly=rain,weather_code,is_day,sunshine_duration&daily=sunrise,sunset&forecast_days=1`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
    

        // FUNCTION TO KNOW IF IT'S DAY OR NIGHT
        function isDay (data) {
            let day = "";
            if (data["current"]["is_day"] === 1) {
                day = "il fait jour";
            } else {
                day = "il fait nuit";
            }
            return day;
        }
    

        // FUNCTION TO KNOW IF IT'S RAINY OR SUNNY
        function isRainy (data) {
            let rain ="";
            if (data["current"]["rain"] > 0) {
                rain = "il pleut";
            } else {
                rain = "il fait beau";
            }
            return rain;
        }

        // IMPORTER REPONSE DANS LE HTML
        const answer2 = document.querySelector('.answer2');
        answer2.innerText = isDay(data);

        const answer1 = document.querySelector('.answer1');
        answer1.innerText = isRainy(data);
    })

    
}

function errorCallback(error) {
    console.error("Erreur lors de la récupération de la position : ", error.message);
    // Gérez les erreurs selon vos besoins.

    // RECUPERER LES DONNES AVEC L'API AVEC UN LIEU DEFINI ICI LONDRES
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=25.0772&longitude=55.3093&current=is_day,rain,weather_code,cloud_cover&hourly=rain,weather_code,is_day,sunshine_duration&daily=sunrise,sunset&forecast_days=1`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
    

        // FUNCTION TO KNOW IF IT'S DAY OR NIGHT
        function isDay (data) {
            let day = "";
            if (data["current"]["is_day"] === 1) {
                day = "il fait jour";
            } else {
                day = "il fait nuit";
            }
            return day;
        }
    

        // FUNCTION TO KNOW IF IT'S RAINY OR SUNNY
        function isRainy (data) {
            let rain ="";
            if (data["current"]["rain"] > 0) {
                rain = "il pleut";
            } else {
                rain = "il fait beau";
            }
            return rain;
        }
        
        const isDayOrNight = isDay(data);
        const isRainOrSun = isRainy(data);

        // IMPORTER REPONSE DANS LE HTML
        const answer2 = document.querySelector('.answer2');
        answer2.textContent = `${isDayOrNight}`;

        const answer1 = document.querySelector('.answer1');
        answer1.textContent = `${isRainOrSun}`;
    })
}

