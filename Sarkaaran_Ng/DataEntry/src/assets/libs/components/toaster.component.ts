import { NgTemplateOutlet } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { NgbToastModule } from "@ng-bootstrap/ng-bootstrap";
import { ToastService } from "src/app/services/toaster.service";

@Component({
	selector: 'app-toasts',
	template: `

			<ngb-toast *ngFor="let toast of toastService.toasts"
				[class]="toast.classname"
				[autohide]="true"
				[delay]="toast.delay || 5000"
				(hidden)="toastService.remove(toast)"
			>
				<ng-template [ngTemplateOutlet]="toast.template"></ng-template>
			</ngb-toast>

	`,
	host: { class: 'toast-container position-fixed top-0 end-0 p-3', style: 'z-index: 1200' },
})
export class ToastsComponent implements OnInit {
  constructor(public toastService: ToastService){

  }
  ngOnInit(): void {
  }
}
