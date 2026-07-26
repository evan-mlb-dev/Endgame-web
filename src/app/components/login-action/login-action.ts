import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LoginModal } from '../login-modal/login-modal';
import { SigninModal } from '../signin-modal/signin-modal';

@Component({
  selector: 'app-login-action',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: 'login-action.html',
  styleUrl: 'login-action.scss',
})
export class LoginAction {
  constructor(private dialog: MatDialog) {}

  openLoginModal() {
    this.dialog.open(LoginModal, {
      panelClass: 'login-modal',
      backdropClass: 'blur-backdrop',
    });
  }

  openSignInModal() {
    this.dialog.open(SigninModal, {
      panelClass: 'signin-modal',
      backdropClass: 'blur-backdrop',
    });
  }
}
