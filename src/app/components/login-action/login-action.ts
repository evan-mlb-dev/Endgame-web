import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LoginModal } from '../login-modal/login-modal';
import { SigninModal } from '../signin-modal/signin-modal';
import { AuthService } from '@app/services/authService';
import { Session } from '@app/models/session';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-login-action',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: 'login-action.html',
  styleUrl: 'login-action.scss',
})
export class LoginAction {
  constructor(private dialog: MatDialog) {}

  private authService = inject(AuthService);
  private sessionSubscription!: Subscription;
  public currentSession: Session | null = null;

  ngOnInit(): void {
    this.sessionSubscription = this.authService.userSession$.subscribe({
      next: (session: Session | null) => {
        if (session) {
          this.currentSession = session;
        }
      },
      error: (err) => console.error('Error :', err),
    });
  }

  ngOnDestroy(): void {
    if (this.sessionSubscription) {
      this.sessionSubscription.unsubscribe();
    }
  }

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

  logout() {
    this.authService.logout();
    this.currentSession = null;
  }
}
