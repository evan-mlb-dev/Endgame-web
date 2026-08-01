import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../services/authService';
import { ThisReceiver } from '@angular/compiler';
@Component({
  selector: 'app-signin-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule],
  templateUrl: './signin-modal.html',
  styleUrl: './signin-modal.scss',
})
export class SigninModal {
  registerData = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  private authService = inject(AuthService);

  errorMessage: string | null = null;
  constructor(private dialogRef: MatDialogRef<SigninModal>) {}

  onCancel() {
    this.dialogRef.close();
  }

  onSignIn() {
    // Test fields
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

    this.errorMessage = null;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (
      !this.registerData.username?.trim() ||
      !this.registerData.email?.trim() ||
      !this.registerData.password ||
      !this.registerData.confirmPassword
    ) {
      this.errorMessage = 'All fields are required.';
      return;
    } else if (
      this.registerData.password !== this.registerData.confirmPassword
    ) {
      this.errorMessage = 'Passwords do not match.';
      return;
    } else if (!emailRegex.test(this.registerData.email)) {
      this.errorMessage = 'Invalid email address.';
    } else if (!strongPasswordRegex.test(this.registerData.password)) {
      this.errorMessage = 'Password is too weak.';
      return;
    }

    // send sign in request

    this.authService.register(this.registerData).subscribe({
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
