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

  songIndex: number = 0;
  isPlaying: boolean = true;

  loadSongs(songIndex) {
    this.songTitle = this.songs[songIndex].title;
    this.songAudio = this.songs[songIndex].audio;
    this.songImage = this.songs[songIndex].image;
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
    this.audioOptionRef.nativeElement.pause();
    this.songIndex--;

    if (this.songIndex < 0) {
      this.songIndex = this.songs.length - 1;
    }
    this.loadSongs(this.songIndex);
    this.audioOptionRef.nativeElement.play();
  };

  nextSong() {
    this.songIndex++;

    if (this.songIndex < 0) {
      this.songIndex = this.songs.length - 1;
    }
    this.loadSongs(this.songIndex);
    this.audioOptionRef.nativeElement.play();

  };

}
