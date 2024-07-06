import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent {
  @Input() title='';
  @Input() confirmationContent='';
  @Output('YesEvent') yesEvent:EventEmitter<void> = new EventEmitter();
  @Output('CancelEvent') cancelEvent:EventEmitter<void> = new EventEmitter();
  @ViewChild('modal') modal;
  constructor(
    private modalService: NgbModal
  ) {

  }

  openModal(){
    this.modalService.open(this.modal, {ariaLabelledBy: 'modal-basic-title',size: 'lg'});
  }

  closeModal(){
    this.modalService.dismissAll();
  }
}
