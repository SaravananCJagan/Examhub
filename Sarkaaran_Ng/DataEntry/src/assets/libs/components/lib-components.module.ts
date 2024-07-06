import { NgModule } from "@angular/core";
import { CKeditorComponent } from "./form-components/ckeditor/ckeditor.component";
import { AppSpinnerComponent } from "./spinner.component";
import { ToastsComponent } from "./toaster.component";
import { NgbAccordionModule, NgbModule, NgbTimepickerModule, NgbToastModule } from "@ng-bootstrap/ng-bootstrap";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { ContentProjectedModalComponent } from "./modals/content-projected-modal/content-projected-modal.component";
import { BrowserModule } from "@angular/platform-browser";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgTemplateOutlet } from "@angular/common";
import { ConfirmationModalComponent } from "./modals/confirmation-modal/confirmation-modal.component";
import { DataGridComponent } from "./data-grid/data-grid.component";
import { AccordionComponent } from "./accordion/accordion.component";
import { LibCardComponent } from "./card/lib-card.component";

@NgModule({
  declarations: [
    CKeditorComponent,
    AppSpinnerComponent,
    ToastsComponent,
    ContentProjectedModalComponent,
    ConfirmationModalComponent,
    DataGridComponent,
    AccordionComponent,
    LibCardComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgTemplateOutlet,
    NgbTimepickerModule,
    CKEditorModule,
    NgbModule,
    CKEditorModule,
    NgbToastModule,
    NgbAccordionModule
  ],
  exports: [
    CKeditorComponent,
    AppSpinnerComponent,
    ToastsComponent,
    ContentProjectedModalComponent,
    ConfirmationModalComponent,
    DataGridComponent,
    AccordionComponent,
    LibCardComponent
  ],
  providers: []
})
export class LibComponentModule { }
