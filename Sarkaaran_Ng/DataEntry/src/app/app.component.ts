import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'DataEntry';
  isSpinner: boolean = false;


  loadSpinner() {
    this.isSpinner = true;
  }

  hideSpinner() {
    this.isSpinner = false;
  }
}
