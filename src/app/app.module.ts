import { NgModule, APP_INITIALIZER, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DropdownComponent } from './header/dropdown/dropdown.component';
import { MainPageComponent } from './main-page/main-page.component';
import { CatalogsPageComponent } from './catalogs-page/catalogs-page.component';
import { ArticlesPageComponent } from './articles-page/articles-page.component';
import { AboutUsPageComponent } from './about-us-page/about-us-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AppRoutingModule } from './app-routing.module';
import { DropdownDirective } from './shared/dropdown.directive';
import { PhoneViewComponent } from './header/phone-view/phone-view.component';
import { PhoneDropdownComponent } from './header/dropdown/phone-dropdown/phone-dropdown.component';
import { UpperBannerComponent } from './main-page/upper-banner/upper-banner.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { IntroBannerComponent } from './catalogs-page/intro-banner/intro-banner.component';
import { SortBannerComponent } from './catalogs-page/content-banner/sort-banner/sort-banner.component';
import { ContentBannerComponent } from './catalogs-page/content-banner/content-banner.component';
import { SortPanelComponent } from './catalogs-page/content-banner/sort-panel/sort-panel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardContentComponent } from './catalogs-page/content-banner/card-content/card-content.component';
import { ModalComponent } from './catalogs-page/content-banner/card-content/modal/modal.component';
import { MiddleBannerComponent } from './main-page/middle-banner/middle-banner.component';
import { SliderComponent } from './main-page/slider/slider.component';
import { DonationBannerComponent } from './main-page/donation-banner/donation-banner.component';
import { RouterModule } from '@angular/router';
import { DropdownAlertComponent } from './dropdown-alert/dropdown-alert.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { AdminPanelComponent } from './profile-page/admin-panel/admin-panel.component';
import { ConfirmationModalComponent } from './profile-page/confirmation-modal/confirmation-modal.component';
import { ApplicationBannerComponent } from './profile-page/application-banner/application-banner.component';
import { AdminFeaturesComponent } from './profile-page/admin-panel/admin-features/admin-features.component';
import { EditorFeaturesComponent } from './profile-page/admin-panel/editor-features/editor-features.component';
import { VolunteerFeaturesComponent } from './profile-page/admin-panel/volunteer-features/volunteer-features.component';
import { DataService } from './shared/services/dta.service';
import { CarouselInputComponent } from './profile-page/admin-panel/admin-features/carousel-input/carousel-input.component';
import { CatalogsInputComponent } from './profile-page/admin-panel/admin-features/catalogs-input/catalogs-input.component';
import { SchoolsInputComponent } from './profile-page/admin-panel/admin-features/schools-input/schools-input.component';
import { TagsInputComponent } from './profile-page/admin-panel/admin-features/tags-input/tags-input.component';
import { ProfileCardComponent } from './about-us-page/profile-card/profile-card.component';
import { AboutSubmissionComponent } from './profile-page/admin-panel/admin-features/about-submission/about-submission.component';
import { ArticlesContentComponent } from './articles-page/articles-content/articles-content.component';
import { ArticlesBannerComponent } from './articles-page/articles-banner/articles-banner.component';

export function serviceLoader(dta: DataService){
  return () => dta.init()
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownComponent,
    MainPageComponent,
    CatalogsPageComponent,
    AboutUsPageComponent,
    LoginPageComponent,
    DropdownDirective,
    PhoneViewComponent,
    PhoneDropdownComponent,
    UpperBannerComponent,
    NotFoundComponent,
    IntroBannerComponent,
    SortBannerComponent,
    ContentBannerComponent,
    SortPanelComponent,
    CardContentComponent,
    ModalComponent,
    MiddleBannerComponent,
    SliderComponent,
    DonationBannerComponent,
    DropdownAlertComponent,
    ArticlesPageComponent,
    ProfilePageComponent,
    AdminPanelComponent,
    ConfirmationModalComponent,
    ApplicationBannerComponent,
    AdminFeaturesComponent,
    EditorFeaturesComponent,
    VolunteerFeaturesComponent,
    CarouselInputComponent,
    CatalogsInputComponent,
    SchoolsInputComponent,
    TagsInputComponent,
    ProfileCardComponent,
    AboutSubmissionComponent,
    ArticlesContentComponent,
    ArticlesBannerComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: serviceLoader,
      deps: [DataService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule{ }
