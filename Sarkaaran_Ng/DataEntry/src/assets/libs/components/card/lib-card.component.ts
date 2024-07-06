import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-card',
  templateUrl: './lib-card.component.html',
  styleUrls: ['./lib-card.component.scss']
})
export class LibCardComponent {
  @Input('Title') title:string='';
  @Input('SubTitle') subTitle:string='';
}
