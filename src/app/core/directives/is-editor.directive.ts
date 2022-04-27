import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ERols } from '../domain/enums';
import { IUser } from '../domain/types';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[appIsEditor]'
})
export class IsEditorDirective implements OnInit {
  @Input() public appIsEditor=false;

  private isLoggedChanged$: Observable<IUser |null>;
  constructor(
    private auth:AuthService,
    private viewContainerRef:ViewContainerRef,
    private templateRef:TemplateRef<any>


  ) { 
    this.isLoggedChanged$= this.auth.loggedUser$;
  }

ngOnInit():void{
  
  this.isLoggedChanged$.subscribe(loggedUser => {
    console.log("ttttttttttttttttt");
    if (true) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
      
    } else {
      this.viewContainerRef.clear();
    }
  });
}
}
