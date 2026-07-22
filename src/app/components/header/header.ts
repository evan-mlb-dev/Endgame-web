import { Component } from '@angular/core';
import { MainNav } from '../main-nav/main-nav';
import { LoginAction } from '../login-action/login-action';

@Component({
  selector: 'app-header',
  imports: [MainNav, LoginAction],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  standalone: true,
})
export class Header {}
