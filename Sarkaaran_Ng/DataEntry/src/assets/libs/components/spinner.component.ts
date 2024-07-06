import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-spinner',
  template: `
  <div *ngIf="isDisplayed" class="d-flex justify-content-center loader-bd">
    <div class="" role="status">
        <span class="sr-only" id="loading"></span>
    </div>
</div>`,
  styles: [`
  #loading{
    position: absolute !important;
    left: 50%;
    top: 50%;
    z-index: 2000;
    width: 150px;
    height: 150px;
    margin: -75px 0 0 -75px;
    border: 16px solid #f3f3f3;
    border-radius: 50%;
    border-top: 16px solid #3498db;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
    clip:unset !important;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }`]
})
export class AppSpinnerComponent {
  @Input() isDisplayed = false;
}
