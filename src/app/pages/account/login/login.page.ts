import { DataService } from './../../../data.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { UserModel } from 'src/app/models/user.model';
import { SecurityUtil } from 'src/app/utils/security.util';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public hide = true;
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loadingCtrl: LoadingController,
    private toastsCtrl: ToastController,
    private navCtrl: NavController,
    private service: DataService
  ) {
    this.form = this.fb.group({
      username: ['', Validators.compose([
        Validators.required,
      ])],
      password: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.required
      ])]
    });
  }

  ngOnInit() {
  }

  async submit() {
    if (this.form.invalid) {
      return;
    }

    const loading = await this.loadingCtrl.create({ message: 'Autenticando' });
    loading.present();

    this.service
      .authenticate(this.form.value)
      .subscribe(
        (res: UserModel) => {
          SecurityUtil.set(res);
          loading.dismiss();
          this.navCtrl.navigateRoot('/');
        },
        (err) => {
          this.showError('Usuario ou Senha Inválidos');
          loading.dismiss();
        },
        () => {
          loading.dismiss();
        }
      );
  }

  async resetPassword() {
    if (this.form.controls.username.invalid) {
      this.showError('Usuario Invalido');
      return;
    }

    const loading = await this.loadingCtrl.create({ message: 'Restaurando sua Senha...' });
    loading.present();
  }

  toggleHide() {
    this.hide = !this.hide;
  }

  async showError(message) {
    const error = await this.toastsCtrl.create({ message, duration: 3000, color: 'light' });
    error.present();
  }

}
