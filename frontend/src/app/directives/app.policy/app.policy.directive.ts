import { Input, OnInit, Directive, ViewContainerRef, TemplateRef, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { AppPolicyService } from "src/app/services/app.policy/app.policy.service";

@Directive({
  selector: '[appPolicy]'
})
export class appPolicyDirective implements OnInit, OnDestroy {
  private subscription: Subscription[] = [];
  
  @Input() public appPolicy?: Array<any> = [];

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private appPolicyService: AppPolicyService
  ) { }

  public ngOnInit() {
    
    if ( this.appPolicy && this.appPolicy.length>0 ) {
      this.subscription.push(
        this.appPolicyService.policies().subscribe(res => { 
          if (!res) {
            this.viewContainerRef.clear();
          }
          const idx = res.findIndex((element:any) => this.appPolicy?.indexOf(element) !== -1);
          if (idx < 0) {
            this.viewContainerRef.clear();
          } else { 
            this.viewContainerRef.createEmbeddedView(this.templateRef);
          }
        })
      );
    } else {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }

  public ngOnDestroy(): void {
    this.subscription.forEach((subscription: Subscription) => subscription.unsubscribe());
  }
}