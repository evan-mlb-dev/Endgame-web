import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BaseAuthModal } from '../BaseAuthModal';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule],
  templateUrl: 'login-modal.html',
  styleUrl: 'login-modal.scss',
})
export class LoginModal extends BaseAuthModal<LoginModal> {
  loginData = {
    username: '',
    password: '',
  };

  onLogin(): void {
    if (!this.loginData.username?.trim() || !this.loginData.password) {
      this.errorMessage = 'All fields are required.';
      return;
    }

    this.authService.login(this.loginData).subscribe({
      next: (response) => this.handleSuccess(response),
      error: (errorResponse) =>
        this.handleError(errorResponse, 'An error occurred during login.'),
    });
  }
}
