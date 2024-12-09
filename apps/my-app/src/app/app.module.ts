import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { AlertComponent } from './../../../../libs/frontend/features/src/lib/alert/alert.component'
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AboutComponent } from './components/about/about.component';
import { HeaderComponent } from './components/ui/header/header.component';
import { FooterComponent } from './components/ui/footer/footer.component';
import { LoginComponent } from './components/login/login.component'
import { RegisterComponent } from './components/register/register.component'
import { FeaturesModule } from '@train-repo/features';

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        AboutComponent,
        HeaderComponent,
        FooterComponent,
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes, {
            initialNavigation: 'enabledBlocking'
        }),
        FeaturesModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
