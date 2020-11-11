import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.loadSongs(1);
  }

  @ViewChild('audioOption', { static: false }) audioOptionRef: ElementRef;


  // Song title
  songs = [
    {
      title: "Arijit 01",
      audio: "assets/audio/1.mp3",
      image: "assets/images/3.png"
    },
    {
      title: "Arijit 02",
      audio: "assets/audio/2.mp3",
      image: "assets/images/2.jpeg"
    },
  ];


  songTitle: any;
  songAudio: any;
  songImage: any;

  songIndex: number = 1;
  isPlaying: boolean = true;

  loadSongs(songIndex) {
    this.songTitle = this.songs[songIndex].title;
    this.songAudio = this.songs[songIndex].audio;
    this.songImage = this.songs[songIndex].image;
    if (this.audioOptionRef) {
      setTimeout(() => {
        this.audioOptionRef.nativeElement.play();
      }, 500);
    }
  };

  playBtn() {
    this.isPlaying = !this.isPlaying;
    this.audioOptionRef.nativeElement.play();
  };

  pauseBtn() {
    this.isPlaying = !this.isPlaying;
    this.audioOptionRef.nativeElement.pause();
  };

  previousSong() {
    this.songIndex--;
    // if the song index is first song and we are trying to go back to previous song, then it take to the last song.
    if (this.songIndex < 0) {
      this.songIndex = this.songs.length - 1;
    }
    this.loadSongs(this.songIndex);
  };

  nextSong() {
    this.songIndex++;
    // if song index is greater the last song. then it will take us to the first song.
    if (this.songIndex > this.songs.length - 1) {
      this.songIndex = 0;
    }
    this.loadSongs(this.songIndex);
  };


  // update progress bar
  progressPercent: any;
  updateSongProgress(event) {
    console.log();
    const { duration, currentTime } = event.srcElement;
    this.progressPercent = (currentTime / duration) * 100;
    // console.log("Audio timeupdate event", duration, currentTime, this.progressPercent);
  };


  // Click on progress bar 

  setProgressBar(event) {
    const progressBarFullWidth = event.path[0].clientWidth;
    const clickXonProgressFullWidth = event.offsetX;
    const duration = this.audioOptionRef.nativeElement.duration;
    setTimeout(() => {
      const x = (clickXonProgressFullWidth * 3 / progressBarFullWidth) * 100;
      console.log("x", x);
      this.audioOptionRef.nativeElement.currentTime = x;
    }, 50);

    console.log(progressBarFullWidth, clickXonProgressFullWidth, duration, event);
  };

  // Auto move to next song , when a track ends
  autoMoveTotheNextSong() {
    this.nextSong();
  };

}
