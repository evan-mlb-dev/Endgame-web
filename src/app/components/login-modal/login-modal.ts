import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, NgZone } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/authService';

declare const google: any;

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule],
  templateUrl: 'login-modal.html',
  styleUrl: 'login-modal.scss',
})
export class LoginModal implements AfterViewInit {
  loginData = {
    username: '',
    password: '',
  };

  private authService = inject(AuthService);
  private ngZone = inject(NgZone);
  private dialogRef = inject(MatDialogRef<LoginModal>);
  private readonly googleClientId = environment['google.client.id'];

  errorMessage: string | null = null;

  onCancel() {
    this.dialogRef.close();
  }

  onLogin() {
    if (!this.loginData.username?.trim() || !this.loginData.password) {
      this.errorMessage = 'All fields are required.';
      return;
    }

    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        this.dialogRef.close(response);
      },
      error: (errorResponse) => {
        console.log(errorResponse.error);
        this.errorMessage =
          errorResponse.error?.error || 'An error occurred during sign up.';
      },
    });
  }

  // google login

  ngAfterViewInit(): void {
    this.initGoogleButton();
  }

  private initGoogleButton(): void {
    if (typeof google !== 'undefined' && google.accounts) {
      google.accounts.id.initialize({
        client_id: this.googleClientId,
        callback: (response: any) => this.handleGoogleCredential(response),
      });

      google.accounts.id.renderButton(document.getElementById('google-btn'), {
        theme: 'outline',
        size: 'large',
        width: '100%',
      });
    } else {
      console.error("Le SDK Google n'a pas pu être chargé.");
    }
  }

  private handleGoogleCredential(googleResponse: any): void {
    this.ngZone.run(() => {
      this.authService.loginWithGoogle(googleResponse.credential).subscribe({
        next: (response) => {
          this.dialogRef.close(response);
        },
        error: (errorResponse) => {
          console.error('Erreur authentification Google:', errorResponse);
          this.errorMessage =
            errorResponse.error?.message ||
            'Google login failed. Please try again.';
        },
      });
    });
  }
}
