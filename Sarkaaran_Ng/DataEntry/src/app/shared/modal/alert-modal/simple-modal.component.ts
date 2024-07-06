import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-simple-modal',
  templateUrl: './simple-modal.component.html',
  styleUrls: ['./simple-modal.component.scss']
})
export class SimpleModalComponent {
  openState:boolean =false;
  displayMessage='Default Message';
  title = "Default Title";
  @Output() modalClosed:EventEmitter<void>= new EventEmitter();
  @ViewChild("alertModal") alertModal;

  constructor(private modalService:NgbModal){}

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  openInterface(title:string, message:string){
    this.title=title;
    this.displayMessage=message;
    this.open(this.alertModal);
  }

  closeModal(){
    this.modalService.dismissAll();
    if(this.title=='SUCCESS')
      this.modalClosed.emit();
  }

}
