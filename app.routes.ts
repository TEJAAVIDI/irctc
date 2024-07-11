import { ChildrenOutletContexts, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar/navbar.component';
import { BookingsComponent } from './user/bookings/bookings.component';
import { HomeComponent } from './user/home/home.component';
import { SerchComponent } from './user/serch/serch.component';

export const routes: Routes = [
    {path:"" ,redirectTo:"home",pathMatch:'full'},
    
    {path:"home", component :HomeComponent },
    { path:"navbar" , component :NavbarComponent ,
        children : [
            {path:"home", component :HomeComponent },
            {path:"search/:trainName/:trainTo/:date",component:SerchComponent},
            {path:"bookings",component:BookingsComponent}
        ]
    }
];
