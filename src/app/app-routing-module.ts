import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { Content2Component } from './content2/content2.component';


const routes: Routes = [
    {
        path:'content',
        component: ContentComponent
    },
    {
        path: 'content2',
        component: Content2Component
    }
];

const routerOptions: ExtraOptions = {
    anchorScrolling: "enabled"
    //scrollPositionRestoration: "enabled"
  };

@NgModule({
  imports: [RouterModule.forRoot(routes,routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }