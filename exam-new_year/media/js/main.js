var el = document.getElementById('btn-play');
var playing = false; // текущее состояние плеера

var player = new Audio('media/jingle_bel.mp3');
player.preload = "auto";
player.addEventListener('ended', function(){ // слушаем окончание трека
  el.innerText = "Done";
  playing = false;
});
el.addEventListener('click', playPause); // слушаем нажатие на кнопку
player.volume= 0.3;

function playPause() {
  if( playing) {
    player.pause();
    el.innerText = "Paused";
    el.classList.remove("actived");
  } else {
    player.play();
    el.innerText = "Playing..";
    el.classList.add("actived");
  }
  playing = !playing;
}
