import { Component, Inject, OnInit } from '@angular/core';
import { AuthOptionModel } from '../../ng-strapi-auth-options';

@Component({
  selector: 'ng-strapi-auth-auth-wrapper',
  templateUrl: './auth-wrapper.component.html',
  styleUrls: ['./auth-wrapper.component.scss']
})
export class AuthWrapperComponent implements OnInit {
    hideCard?: boolean

  constructor(@Inject('StrapiAuthLibOptions') private readonly options: AuthOptionModel) { }

  ngOnInit(): void {
      if (this.options.hideCard) this.hideCard = this.options.hideCard;
  }

}
