import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonText,
  IonItem,
  IonIcon,
  IonFooter,
  IonInput,
  IonButton,
} from '@ionic/angular/standalone';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../data/services/auth/auth.service';
import { IntentLogin } from '../data/models/IntentLogin';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    IonText,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonItem,
    IonInput,
    IonButton,
    IonIcon,
    IonFooter,
    RouterModule,
  ],
})
export class AuthPage implements OnInit {
  screen: any = 'signin';
  formData: FormGroup;
  isLoading: boolean = false;
  isError: boolean = false;

  constructor(private fb: FormBuilder) {
    this.formData = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

  }


  private authService = inject(AuthService);
  private router = inject(Router);

  change(event: any) {
    this.screen = event;
  }

  login() {

    this.isError = false;
    this.isLoading = true;
    var formData: any = new FormData();
    if (this.formData.valid) {
      this.isLoading = true;
      formData.append('email', this.formData.get('email')!.value);
      formData.append('password', this.formData.get('password')!.value);
      const { email, password } = this.formData.value;

      const intentLogin: IntentLogin = {
        username: email,
        password: password,
      }

      this.authService.login(intentLogin).subscribe({
        next : ( resp ) => {
          this.isLoading = false;

          this.router.navigate(['/voucher']);
        },
        error : ( err ) => {
          this.isLoading = false;

          this.isError = true;

        },
        complete : ( ) => {
        }
      })

      // this.auth.userLogin(formData).subscribe((data:any)=>{
      //   console.log(data);
      // });
    }
  }



  ngOnInit() {
    console.log('Hola Mundo');
  }


  onSupportClick(){
     window.open('https://www.google.com', '_blank');
  }
}
