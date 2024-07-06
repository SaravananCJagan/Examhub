import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ManageExamsComponent } from './manage-exams/manage-exams.component';
import { AddExamComponent } from './manage-exams/add-exam/add-exam.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { NgbAccordionModule, NgbModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NumericOnlyDirective } from 'src/assets/libs/directives/numeric-only.directive';
import { ExamService } from './services/exam.service';
import { HttpClientModule } from '@angular/common/http';
import { Utilities } from './services/utility.service';
import { SimpleModalComponent } from './shared/modal/alert-modal/simple-modal.component';
import { ToastService } from './services/toaster.service';
import { NgTemplateOutlet } from '@angular/common';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ExamBodyService } from './services/exam-body.service';
import { NavbarComponent } from './navbar/navbar.component';
import { ManageRecruitmentBodiesComponent } from './manage-recruitment-bodies/manage-recruitment-bodies.component';
import { ManageResultsComponent } from './manage-results/manage-results.component';
import { ManagePyqsComponent } from './manage-pyqs/manage-pyqs.component';
import { AddRecruitmentBodyComponent } from './manage-recruitment-bodies/add-recruitment-body/add-recruitment-body.component';
import { LibComponentModule } from 'src/assets/libs/components/lib-components.module';
import { FilterPaneComponent } from './manage-exams/filter-pane/filter-pane.component';

@NgModule({
  declarations: [
    AppComponent,
    ManageExamsComponent,
    AddExamComponent,
    NumericOnlyDirective,
    SimpleModalComponent,
    NavbarComponent,
    ManageRecruitmentBodiesComponent,
    ManageResultsComponent,
    ManagePyqsComponent,
    AddRecruitmentBodyComponent,
    FilterPaneComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgTemplateOutlet,
    NgbTimepickerModule,
    CKEditorModule,
    LibComponentModule,
    NgbAccordionModule
  ],
  providers: [
    ExamService,
    Utilities,
    ToastService,
    ExamBodyService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
