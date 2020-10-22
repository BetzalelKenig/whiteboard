import { Component, OnInit } from '@angular/core';
//import { browser } from 'protractor';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  // onStartedDownload(id) {
  //   console.log(`Started downloading: ${id}`);
  // }

  // onFailed(error) {
  //   console.log(`Download failed: ${error}`);
  // }

  // downloadUrl = 'https://example.org/image.png';

  // downloading = browser.downloads
  //   .download({
  //     url: this.downloadUrl,
  //     filename: 'my-image-again.png',
  //     conflictAction: 'uniquify',
  //   })
  //   .then(this.onStartedDownload, this.onFailed);
  

  //this.downloading.then(this.onStartedDownload, this.onFailed);
}
