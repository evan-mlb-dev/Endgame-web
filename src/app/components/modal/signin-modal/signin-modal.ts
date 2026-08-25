import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BaseAuthModal } from '../BaseAuthModal';

@Component({
  selector: 'app-signin-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule],
  templateUrl: './signin-modal.html',
  styleUrl: './signin-modal.scss',
})
export class SigninModal extends BaseAuthModal<SigninModal> {
  registerData = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  onSignIn(): void {
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    this.errorMessage = null;

    if (
      !this.registerData.username?.trim() ||
      !this.registerData.email?.trim() ||
      !this.registerData.password ||
      !this.registerData.confirmPassword
    ) {
      this.errorMessage = 'All fields are required.';
      return;
    }

    if (this.registerData.password !== this.registerData.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    if (!emailRegex.test(this.registerData.email)) {
      this.errorMessage = 'Invalid email address.';
      return;
    }

    if (!strongPasswordRegex.test(this.registerData.password)) {
      this.errorMessage = 'Password is too weak.';
      return;
    }

    this.authService.register(this.registerData).subscribe({
      next: (response) => this.handleSuccess(response),
      error: (errorResponse) =>
        this.handleError(errorResponse, 'An error occurred during sign up.'),
    });
  }
}
