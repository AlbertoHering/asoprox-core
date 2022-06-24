import { Input, OnInit, Directive, ViewContainerRef, TemplateRef, OnDestroy } from "@angular/core";
import { appPolicyDirective } from './app.policy.directive';
import { appPolicyService } from "../../services/app.policy/app.policy.service";

describe('appPolicyDirective', () => {
  it('should create an instance', () => {
    const directive = new appPolicyDirective(ViewContainerRef,, TemplateRef, appPolicyService);
    expect(directive).toBeTruthy();
  });
});