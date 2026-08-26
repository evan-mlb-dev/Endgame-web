import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginModal } from '@app/components/modal/login-modal/login-modal';
import { SigninModal } from '@app/components/modal/signin-modal/signin-modal';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private readonly dialog = inject(MatDialog);

  openLoginModal(): void {
    this.dialog.open(LoginModal, {
      panelClass: 'login-modal',
      backdropClass: 'blur-backdrop',
      position: { top: '15vh' },
    });
  }

  openSignInModal(): void {
    this.dialog.open(SigninModal, {
      panelClass: 'signin-modal',
      backdropClass: 'blur-backdrop',
      position: { top: '15vh' },
    });
  }
}
