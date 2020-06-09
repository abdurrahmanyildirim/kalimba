import { Component, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Kalimba } from './model';

declare const createjs: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  kalimbaSettings: Kalimba[] = [];
  showLetters = true;
  modal: HTMLElement;
  isPhoneUser: boolean;
  chosenText: any;

  trTexts = {
    showNumbers: 'Sayıları Göster',
    showLetters: 'Harfleri Göster',
    usage: 'Kullanım',
    header: 'Kullanım Rehberi',
    description: 'Fare ile tıklayabilir veya aşağıdaki tuşları kullanabilirsiniz.',
    keys: '1 2 3 4 5 6 7 8 9 s d f g h j k l'
  };

  enTexts = {
    showNumbers: 'Show Numbers',
    showLetters: 'Hafleri Göster',
    usage: 'Usage',
    header: 'Usage Guide',
    description: 'You can click with mouse or you can use keys at below.',
    keys: '1 2 3 4 5 6 7 8 9 s d f g h j k l'
  };

  constructor(private http: HttpClient) {
    http.get('assets/kalimba-settings.json').subscribe(settings => {
      this.kalimbaSettings = settings as Kalimba[];
      this.loadNotes(settings as Kalimba[]);
    });
    this.keyListener();
    this.detectDevice();
    this.detectLanguage();
  }

  ngAfterViewInit(): void {
    this.modal = document.getElementById('myModal');
    window.addEventListener('click', (event) => {
      if (event.target === this.modal) {
        this.modal.style.display = 'none';
      }
    });
  }

  async playNote(note, key) {
    const elem = document.getElementById(key);
    elem.style.background = '#ccc';
    createjs.Sound.play(note);
    let timeout = setTimeout(() => {
      elem.style.background = '';
      timeout = null;
    }, 100);
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

  detectDevice() {
    const device = navigator.userAgent;
    this.isPhoneUser = device.includes('Windows') === false ? true : false;
  }

  detectLanguage() {
    const lang = navigator.language;
    this.chosenText = lang.includes('tr') === true ? this.trTexts : this.enTexts;
  }

  loadNotes(settings: Kalimba[]) {
    settings.forEach(setting => {
      createjs.Sound.registerSound('assets/notes/' + setting.note + '.mp3', setting.note);
    });
  }
}
