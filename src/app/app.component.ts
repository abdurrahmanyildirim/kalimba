import { Component, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Kalimba } from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  kalimbaSettings: Kalimba[];
  showLetters = true;
  modal: HTMLElement;

  constructor(private http: HttpClient) {
    http.get('assets/kalimba-settings.json').subscribe(settings => {
      this.kalimbaSettings = settings as Kalimba[];
    });
    this.keyListener();
  }

  ngAfterViewInit(): void {
    this.modal = document.getElementById('myModal');
    window.addEventListener('click', (event) => {
      if (event.target === this.modal) {
        this.modal.style.display = 'none';
      }
    });
  }

  playNote(note) {
    let audio = new Audio();
    audio.src = 'assets/notes/' + note + '.mp3';
    audio.play();
    audio = null;
  }

  keyListener() {
    document.addEventListener('keydown', (event) => {
      if (event.repeat) {
        return;
      }
      const noteData = this.kalimbaSettings.find(setting => setting.key === event.key);
      if (!noteData) {
        return;
      }
      document.getElementById(noteData.key).click();
    });
  }
}
