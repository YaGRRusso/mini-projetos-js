let digitalElement = document.querySelector('.digital')
let sElement = document.querySelector('.p_s')
let mElement = document.querySelector('.p_m')
let hElement = document.querySelector('.p_h')

function updateClock(){
  let now = new Date()
  let hour = now.getHours()
  let minute = now.getMinutes()
  let seconds = now.getSeconds()

  function fixZero(time){
    // if (time < 10){
    //   return `0${time}`
    // } else {
    //   return time
    // }
    return (time<10) ? `0${time}` : time
  }

  digitalElement.innerHTML = `${fixZero(hour)}:${fixZero(minute)}:${fixZero(seconds)}`

  let sDeg = (6 * seconds)-90
  sElement.style.transform = `rotate(${sDeg}deg)`

  let mDeg = (6 * minute)-90
  mElement.style.transform = `rotate(${mDeg}deg)`

  let hDeg = (30 * hour)-90
  hElement.style.transform = `rotate(${hDeg}deg)`

}

setInterval(updateClock, 1000)
updateClock()