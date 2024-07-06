import { Injectable, TemplateRef, inject } from '@angular/core';
import { ResponseType } from 'src/assets/libs/constants/text-constants';
import { ToastResponse } from 'src/assets/libs/models/response-callback.model';
import { Toast } from 'src/assets/libs/models/toaster.model';

@Injectable()
export class ToastService {
	toasts: Toast[] = [];
  successToast:TemplateRef<any>;
  failureToast:TemplateRef<any>;

	show(toast: Toast) {
		this.toasts.push(toast);
	}

	remove(toast: Toast) {
		this.toasts = this.toasts.filter((t) => t !== toast);
	}

	clear() {
		this.toasts.splice(0, this.toasts.length);
	}

  recieveToast(response: ToastResponse){
    if (response.responseType === ResponseType.Success) {
      this.show({template:this.successToast, classname: 'bg-success text-light', delay: 10000 });
    }
    else {
      this.show({template:this.failureToast, classname: 'bg-success text-light', delay: 10000 });
    }
  }
}
