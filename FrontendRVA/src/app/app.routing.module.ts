import { AuthorComponent } from './components/core/author/author.component';
import { AboutComponent } from './components/core/about/about.component';
import { HomeComponent } from './components/core/home/home.component';
import { ObrazovanjeComponent } from './components/obrazovanje/obrazovanje.component';
import { PreduzeceComponent } from './components/preduzece/preduzece.component';
import { SektorComponent } from './components/sektor/sektor.component';
import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';

const Routes = [
  { path: 'sektor', component: SektorComponent },
  { path: 'preduzece', component: PreduzeceComponent },
  { path: 'obrazovanje', component: ObrazovanjeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'author', component: AuthorComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full'}
]

@NgModule ({
  imports: [RouterModule.forRoot(Routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
