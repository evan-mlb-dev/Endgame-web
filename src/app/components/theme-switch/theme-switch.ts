import { Component, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-theme-switch',
  standalone: true,
  imports: [],
  templateUrl: './theme-switch.html',
  styleUrl: './theme-switch.scss',
})
export class ThemeSwitch implements OnInit {
  private readonly THEME_KEY = 'endgame-theme';
  isDarkMode = signal<boolean>(true);

  ngOnInit(): void {
    const savedTheme = localStorage.getItem(this.THEME_KEY);

    if (savedTheme !== null) {
      this.isDarkMode.set(savedTheme === 'dark');
    } else {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
      this.isDarkMode.set(prefersDark);
    }

    this.applyTheme(this.isDarkMode());
  }

  toggleTheme(): void {
    const nextState = !this.isDarkMode();
    this.isDarkMode.set(nextState);
    localStorage.setItem(this.THEME_KEY, nextState ? 'dark' : 'light');
    this.applyTheme(nextState);
  }

  private applyTheme(isDark: boolean): void {
    document.body.classList.toggle('light-theme', !isDark);
  }
}
