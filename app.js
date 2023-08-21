class Drumkit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.playBtn = document.querySelector(".play");
    this.currentKick = './sounds/kick-classic.wav';
    this.currentSnare = './sounds/snare-acoustic01.wav';
    this.currentHihat = './sounds/hihat-acoustic01.wav';
    this.kickAudidio = document.querySelector(".kick-sound");
    this.snareAudidio = document.querySelector(".snare-sound");
    this.hihatAudidio = document.querySelector(".hihat-sound");
    this.index = 0;
    this.bpm = 150;
    this.isPlaying = null;
    this.selects = document.querySelectorAll("select");
    this.muteBtns = document.querySelectorAll(".mute");
    this.tempoSlider = document.querySelector(".tempo-slider");
  }
  activePad() {
    this.classList.toggle("active");
  }
  repeat() {
    let step = this.index % 8;
    const activeBars = document.querySelectorAll(`.b${step}`);
    //Loop over the bars
    activeBars.forEach((bar) => {
      bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;

      //Check if pad is active
      if (bar.classList.contains("active")) {
        //check each sound
        if (bar.classList.contains("kick-pad")) {
          this.kickAudidio.currentTime = 0;
          this.kickAudidio.play();
        }
        if (bar.classList.contains("snare-pad")) {
          this.snareAudidio.currentTime = 0;
          this.snareAudidio.play();
        }
        if (bar.classList.contains("hihat-pad")) {
          this.hihatAudidio.currentTime = 0;
          this.hihatAudidio.play();
        }
      }
    });
    //console.log('hey');
    this.index++;
  }
  start() {
    const interval = (60 / this.bpm) * 1000;
    if (!this.isPlaying) {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    } else {
      //clear interval
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    }
  }
  updateBtn() {
    if(!this.isPlaying){
        this.playBtn.innerText  = "Stop";
        this.playBtn.classList.add('active');
    }else{
        this.playBtn.innerText  = "Play";
        this.playBtn.classList.remove('active');
    }
  }
  changeSound(e){
    const selectionName = e.target.name;
    const selectionValue = e.target.value;
    switch(selectionName){
        case "kick-select":
            this.kickAudidio.src = selectionValue;
        break;
        case "snare-select":
            this.snareAudidio.src = selectionValue;
        break;
        case "hihat-select":
            this.hihatAudidio.src = selectionValue;
        break;
    }
  }
  mute(e){
    const muteIndex = e.target.getAttribute('data-track');
    e.target.classList.toggle("active");
    if(e.target.classList.contains('active')){
      switch(muteIndex){
        case "0":
          this.kickAudidio.volume = 0;
          break;
        case "1":
          this.snareAudidio.volume = 0;
          break;
        case "2":
          this.hihatAudidio.volume = 0;
          break;
      }
    }else{
      switch(muteIndex){
        case "0":
          this.kickAudidio.volume = 1;
          break;
        case "1":
          this.snareAudidio.volume = 1;
          break;
        case "2":
          this.hihatAudidio.volume = 1;
          break;
      }
    }
  }
  changeTempo(e){
    const tempoText = document.querySelector('.tempo-nr');

    

    tempoText.innerText = e.target.value; 
  }
  updateTempo(e){
    this.bpm = e.target.value;
      clearInterval(this.isPlaying);
      this.isPlaying = null;
      const playBtn = document.querySelector('.play');
      if(playBtn.classList.contains('active')){
        this.start();
      }
  }
}

const drumKit = new Drumkit();


//Event Listeners


drumKit.pads.forEach((pad) => {
  pad.addEventListener("click", drumKit.activePad);
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});

drumKit.playBtn.addEventListener("click", () => {
    drumKit.updateBtn();
    drumKit.start();
});

drumKit.selects.forEach(select => {
    select.addEventListener('change', function(e) {
        drumKit.changeSound(e);
    })
});

drumKit.muteBtns.forEach(btn => {
  btn.addEventListener('click', function(e){
    drumKit.mute(e);
  })
});

drumKit.tempoSlider.addEventListener('input', function(e){
    drumKit.changeTempo(e);
});
drumKit.tempoSlider.addEventListener('change', function(e){
  drumKit.updateTempo(e);
});
