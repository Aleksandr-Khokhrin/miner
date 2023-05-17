// https://admitted-behavior-cef.notion.site/Miner-API-94f62078676947299f4ec9d6cef453eb
// документация
// CTRL + F = вывести похожие названия 
// CTRL + SHIFT + I == открыть инспектор
//Глобальные переменные
let points = 1000
let username = ''

if(getCookie('username')) {
    username = getCookie('username')
    getUser(username)
}else {
    regUser()
}
let game_id = ''

//Лисенеры

document.querySelectorAll('.point').forEach( btn => {
    btn.addEventListener('click', setPoints)
})
document.querySelector('.point input').addEventListener('input', setPointsFromInput)
document.querySelector('#gameButton').addEventListener('click', startOrStopGame)
document.querySelector('.gameOver').addEventListener('click', closeWind)
document.querySelector('.gameWin').addEventListener('click', closeWind)
let userInput = document.querySelector('.registration input')
console.log(userInput.innerHTML)

//Функции

function closeWind(){
    let elem = event.target
    let gameOver = document.querySelector('.gameOver')
    let gameWin = document.querySelector('.gameWin')
    if(elem == gameOver) {
        gameOver.classList.remove('Nonone')
        gameOver.classList.add('none')
    }
    if(elem == gameWin) {
        gameWin.classList.remove('Nonone')
        gameWin.classList.add('none')
    }
}
async function regUser() {
    username = document.getElementById("myinput").value
    setCookie('username', username)
    // document.querySelector('.registration').classList.add('none')
    // отправить запрос на регистрацию пользователя
    await sendRequest('user', 'POST', {username})
    getUser(username)
}
// username = prompt('Введите логин')

function setPoints() {
    let userBtn = event.target

    document.querySelectorAll('.point').forEach( btn => {
        btn.classList.remove('active')
    })
    userBtn.classList.add('active')
    if(userBtn.innerHTML == 'другое'){
        //другое
        document.querySelector('.point.input').classList.remove('disabled')
        document.querySelector('.point.input').classList.add('active')
    }else if(userBtn ==  document.querySelector('.point.input') || userBtn == document.querySelector('.point.input input')) {
        //инпут
        document.querySelector('.point.input').classList.add('active')
    }
    else {
        //ecли нажал на цифры
        document.querySelector('.point.input').classList.add('disabled')
        points = +userBtn.innerHTML
    }
}

function setPointsFromInput() {
    let input = event.target
    points = input.value
    console.log(points)
}

function startOrStopGame() {
    let gameBtn = event.target
    let gameBtnText = gameBtn.innerHTML
    if (gameBtnText == 'ИГРАТЬ') {
        gameBtn.innerHTML = 'ЗАВЕРШИТЬ ИГРУ'
        newGame()
    } else {
        stopGame()
        cleanArea() 
        gameBtn.innerHTML = 'ИГРАТЬ'
    }
}

async function sendRequest(url, method, data) {
    url = `https://tg-api.tehnikum.school/tehnikum_course/minesweeper/${url}`
    
    if(method == "POST") {
        let response = await fetch(url, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    
        response = await response.json()
        return response
    } else if(method == "GET") {
        url = url+"?"+ new URLSearchParams(data)
        let response = await fetch(url, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        response = await response.json()
        return response
    }
}

async function getUser(username) {
    let response = await sendRequest('user', 'GET', {
        username
    })
    // console.log(response)
    if (response.error) {
        // есть ошибка
        alert(response.message)
    } else {
        // нет ошибки
        let userInfo = document.querySelector('header span')
        userInfo.innerHTML = `[${username}, ${response.balance}]`
        if (username != ''){
            document.querySelector('.registration').classList.remove('flex')
            document.querySelector('.registration').classList.add('none') 
        }
        
    }
}

async function newGame(){
    let response = await sendRequest('new_game', 'POST', {
        username, points
    })
    if (response.error) {
        alert(response.message)
    } else {
        game_id = response.game_id
        let userInfo = document.querySelector('header span')
        userInfo.innerHTML = `[${username}, ${response.user_balance}]`
        cleanArea() 
        activateArea()

        // console.log(response)
    }
}
async function stopGame() {
    let response = await sendRequest('stop_game', 'POST', {
        username, game_id
    })
    if (response.error) {
        // alert(response.message)
    } else {
        cleanArea()
        getUser(username)
        
    }
}

function activateArea(){
    let cells = document.querySelectorAll('.cell')
    for(let i = 0; i < cells.length; i++){
        let cell = cells[i];
        cell.classList.add('active')
        let row = Math.ceil((i + 1) / 10)
        let column = i + 1 - 10*(row-1)
        cell.setAttribute('data-row', row -1)
        cell.setAttribute('data-column', column -1)
        cell.addEventListener('contextmenu', setFlag)
        cell.addEventListener('click', gameStep)
    }
}


function cleanArea() {
    let field = document.querySelector('.field')
    field.innerHTML = `
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    `
}

function setFlag() {
    let cell = event.target
    cell.classList.toggle('flag')
}

async function gameStep() {
    let cell = event.target
    let row = +cell.getAttribute('data-row')
    let column = +cell.getAttribute('data-column')

    let response = await sendRequest('game_step', 'POST', {
        game_id, row, column })
        if (response.error) {
            alert(response.message)

        } else {
            // успешный запрос
            updateArea(response.table)
            if(response.status == 'Failed') {
                let gameBtn = document.querySelector('#gameButton')
                gameBtn.innerHTML = 'Завершить игру'
                document.querySelector('.gameOver').classList.add('Nonone')
                document.querySelector('.gameOver').classList.remove('none')
            } else if (response.status == 'Won') {
                document.querySelector('.gameWin').classList.add('Nonone')
                document.querySelector('.gameWin').classList.remove('none')
            }
        }     
    console.log(response)
}


function updateArea(arr) {
    // let field = document.querySelector('.field')
    let cells = document.querySelectorAll('.cell')
    k = 0
    for( let i = 0; i < arr.length; i++){
        for( let j = 0; j < arr[i].length; j++){
            let cellStatus = arr[i][j]
            if(cellStatus == 'BOMB'){
                cells[k].classList.add('bomb')
                cells[k].classList.remove('active')
            }  else if(cellStatus === 0) {
                cells[k].classList.remove('active')
            } else if(cellStatus > 0 ){
                cells[k].innerHTML = cellStatus
                cells[k].classList.remove('active')
            }

            k++
        }
    }
}


function getCookie(name) {
let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ))
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options = {}) {
    options = {
    path: '/',
    // при необходимости добавьте другие значения по умолчанию
    ...options
    }
    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
    

    for (let optionKey in options) {
            updatedCookie += "; " + optionKey;
            let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }}
            document.cookie = updatedCookie;
}

