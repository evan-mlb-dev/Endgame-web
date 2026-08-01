import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../services/authService';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule],
  templateUrl: 'login-modal.html',
  styleUrl: 'login-modal.scss',
})
export class LoginModal {
  loginData = {
    username: '',
    password: '',
  };
  private authService = inject(AuthService);
  errorMessage: string | null = null;

  constructor(private dialogRef: MatDialogRef<LoginModal>) {}

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
          errorResponse.error.error || 'An error occurred during sign up.';
      },
    });
  }
}
