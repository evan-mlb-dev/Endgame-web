import {
  AfterViewInit,
  Directive,
  EventEmitter,
  inject,
  NgZone,
  Output,
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/authService';

declare const google: any;

@Directive()
export abstract class BaseAuthModal<T> implements AfterViewInit {
  @Output() authenticated = new EventEmitter<any>();

  protected authService = inject(AuthService);
  protected dialogRef = inject(MatDialogRef<T>);
  protected ngZone = inject(NgZone);

  public errorMessage: string | null = null;
  protected readonly googleClientId = environment['google.client.id'];

  ngAfterViewInit(): void {
    this.initGoogleButton();
  }

  public onCancel(): void {
    this.dialogRef.close();
  }

  protected initGoogleButton(): void {
    if (typeof google !== 'undefined' && google.accounts) {
      google.accounts.id.initialize({
        client_id: this.googleClientId,
        callback: (response: any) => this.handleGoogleCredential(response),
      });

      const target = document.getElementById('google-btn');
      if (target) {
        google.accounts.id.renderButton(target, {
          theme: 'outline',
          size: 'large',
          width: '100%',
        });
      }
    }
  }

  public triggerGoogleLogin(): void {
    if (typeof google !== 'undefined' && google.accounts) {
      google.accounts.id.initialize({
        client_id: this.googleClientId,
        callback: (response: any) => this.handleGoogleCredential(response),
      });
      google.accounts.id.prompt();
    }
  }

  protected handleGoogleCredential(googleResponse: any): void {
    this.ngZone.run(() => {
      this.authService.loginWithGoogle(googleResponse.credential).subscribe({
        next: (res) => this.handleSuccess(res),
        error: (err) => this.handleError(err, 'Google authentication failed.'),
      });
    });
  }

  protected handleSuccess(response: any): void {
    this.errorMessage = null;
    this.authenticated.emit(response);
    this.dialogRef.close(response);
  }

  protected handleError(errorResponse: any, fallbackMessage: string): void {
    console.error(errorResponse);
    this.errorMessage =
      errorResponse?.error?.error ||
      errorResponse?.error?.message ||
      fallbackMessage;
  }
}
