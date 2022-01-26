document.body.addEventListener('keyup', (e)=>{
  playSound(e.code.toLowerCase())
})

document.querySelector('.composer button').addEventListener('click', ()=>{
  let song = document.querySelector('#input').value
  
  if(song !== ''){
    let songArray = song.split('')
    playComposition(songArray)
  }
})

let button = document.querySelectorAll('.key')
button.forEach((e)=>{
  e.addEventListener('click', (ev)=>{
    let sound = ev.target.getAttribute('data-key')
    playSound(sound)
  })
})


function playSound(sound){
  let audioElement = document.querySelector(`#s_${sound}`)
  let keyElement = document.querySelector(`div[data-key="${sound}"]`)

  if (audioElement){
    audioElement.currentTime = 0
    audioElement.play()
  }

  if (keyElement){
    keyElement.classList.add('active')

    setTimeout(()=>{
      keyElement.classList.remove('active')
    }, 250)
  }
}

function playComposition(composition){
  let interval = document.querySelector('#interval').value
  let repeat = document.querySelector('#repeat').value
  let wait = 0

  for (i=0; i<repeat; i++){
    for (let i in composition){
      setTimeout(()=>{
        playSound(`key${composition[i]}`)
      }, wait)
      wait += +interval
    }
  }
}