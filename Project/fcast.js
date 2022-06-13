let keyword = "playlist";
const API_KEY = "31b3255393809b3421824b9adf995146";
const COORDS = 'coords';

function init() {
    askForCoords();
}

//좌표를 물어보는 함수 
function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
}

//좌표를 얻는데 성공했을 때 쓰이는 함수 
function handleSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    getWeather(latitude, longitude); //얻은 좌표값을 바탕으로 날씨정보를 불러온다.
}
//좌표를 얻는데 실패했을 때 쓰이는 함수 
function handleError() {
    console.log("can't access location");
}

//날씨 api를 통해 날씨에 관련된 정보들을 받아온다. 
function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=en`).then(function(response) {
        return response.json();
    })
    .then(function(json) {
        let weatherDesc = getWeatherKey(json.weather[0].id);
        if (weatherDesc != "none") {
            keyword += ' ' + weatherDesc;
        }
    })
    .catch((error) => console.log("error:", error));
}

// 날씨 api에서 받아온 날씨 정보를 유튜브에 검색할 키워드로 변환한다.
function getWeatherKey(weather) {
    let weatherKey;
    if (weather < 600) {
        weatherKey = "비";
    }
    else if (weather >= 600 && weather < 700) {
        weatherKey = "눈";
    }
    else if (weather == 800) {
        weatherKey = "맑음";
    }
    else {
        weatherKey = "none";
    }

    return weatherKey;
}

init();


function getSituations() {
    // 여기가 안돼 살려줘! 여기가 안돼 살려줘! 여기가 안돼 살려줘! 여기가 안돼 살려줘! 여기가 안돼 살려줘! 여기가 안돼 살려줘! 여기가 안돼 살려줘! 
    // 1. 가사없음 키워드 생성
    let lyr
    let chkd = $('#lyricBox').is(':checked');
    console.log(chkd);
    if (chkd == false) {
        lyr = "";
        localStorage.setItem("lyric", lyr);
    }
    else {
        lyr = "lofi";
        localStorage.setItem("lyric", lyr);
    }

    // 2. 상황 키워드 생성
    
    let sit = document.querySelector('input[name="situation"]:checked').value;
    if (sit == "입력 안함") {
        sit = null;
    }
    else {
        localStorage.setItem("situation", sit);
    }
        


    let today = new Date();
    let month = today.getMonth() + 1 ;
    let hours = today.getHours();

    // 3. 계절 키워드 생성
    // 3,4,5 봄 6,7,8 여름 9,10,11 가을 12,1,2 겨울

    let ssn;
    if(3 <= month & month <= 5) {
        ssn = ' 봄';
    }
    else if(6 <= month & month <= 8) {
        ssn = ' 여름';
    }
    else if(9 <= month & month <= 11) {
        ssn = ' 가을';
    }
    else {
        ssn = ' 겨울';
    }
    localStorage.setItem("season", ssn);

    // 4. 시간 키워드 생성
    // 12~6시 새벽 6시~12시 아침 12시~6시 오후 6시~12시 밤
    
    let time;
    if(0 <= hours & hours < 6) {
        time += ' 새벽';
    }
    else if(6 <= hours & hours < 12) {
        time += ' 아침';
    }
    else if(12 <= hours & hours < 18) {
        time += ' 오후';
    }
    else {
        time += ' 밤';
    }
    localStorage.setItem("time", time);

    console.log("Search Completed");
}
