import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector:'lib-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss'],
})
export class DataGridComponent{
  @Output() addModalEvent = new EventEmitter();
  @Input() AddText="Add";
  @Input() additionalClasses:string="";
  @Input() toolBarClasses:string="";
  searchText:string = "";
  @Output() searchEvent:EventEmitter<string> = new EventEmitter();
openAddModal(){
  this.addModalEvent.emit();
}
}
