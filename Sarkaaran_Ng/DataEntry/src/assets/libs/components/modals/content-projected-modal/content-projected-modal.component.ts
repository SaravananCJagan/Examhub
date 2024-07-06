import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-content-projected-modal',
  templateUrl: './content-projected-modal.component.html',
  styleUrls: ['./content-projected-modal.component.scss']
})
export class ContentProjectedModalComponent {
  @Input('Title') title: string='';
  @Output('SaveEvent') saveEvent:EventEmitter<void> = new EventEmitter();
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
    this.cancelEvent.emit();
  }
}
