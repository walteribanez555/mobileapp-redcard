import { NgStyle } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  IonContent,
  IonFooter,
  IonToolbar,
  IonButton,
  IonText,
  IonicSlides,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  standalone: true,
  imports: [
    IonText,
    IonButton,
    IonToolbar,
    IonFooter,
    IonContent,
    RouterLink,
    NgStyle,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WelcomePage  implements OnInit  {

  onboardingScreens = [
    { image: 'home_01.png' },
    { image: 'home_02.png' },
    { image: 'home_03.png' },
  ];
  swiperModules = [IonicSlides];

  private router = inject(Router);


  constructor() {}

  ngOnInit() {
    if(localStorage.getItem('onInit') == '1') {
      this.router.navigate(['/home']);
    }
  }

  onLoadStart() {
    localStorage.setItem('onInit', '1');
    this.router.navigate(['/home']);
  }

}
