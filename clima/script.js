document.querySelector('.busca').addEventListener('submit', async (e)=>{
  e.preventDefault()

  let input = document.querySelector('#searchInput').value

  if (input !== ''){
    document.querySelector('.resultado').style.display = 'none'
    showWarning('Carregando...')

    let api = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=66fb6612a1adc76f07004dd967f36a7e&units=metric&lang=pt_br`

    let result = await fetch(api)
    let json = await result.json()

    console.log(json)

    if (json.cod === 200){
      showInfo({
        name: json.name,
        country: json.sys.country,
        temp: json.main.temp,
        icon: json.weather[0].icon,
        windSpeed: json.wind.speed,
        windAngle: json.wind.deg
      })
    } else {
      showWarning('Localização não encontrada!')
    }
  }
})

function showInfo(json){
  showWarning('')
  document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`

  document.querySelector('.tempInfo').innerHTML = `${json.temp.toFixed(0)} <sup>ºC</sup>`
  document.querySelector('.temp img').src = `http://openweathermap.org/img/wn/${json.icon}@2x.png`

  document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed.toFixed(0)} <span>km/h</span>`
  document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`

  document.querySelector('.resultado').style.display = 'block'
}

function showWarning(msg){
  document.querySelector('.aviso').innerHTML = msg
} 