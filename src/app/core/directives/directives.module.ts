import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsAuthDirective } from './is-auth.directive';



@NgModule({
  declarations: [
    IsAuthDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
   IsAuthDirective
  ]
})
export class DirectivesModule { }
