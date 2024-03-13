import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LanguageService, ThemeService } from 'src/app/core/services';

@Component({
  selector: 'sili-auth-layout',
  standalone: true,
  imports: [ RouterOutlet],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthLayoutComponent {

  constructor(
    private languageService: LanguageService,
    private themeService: ThemeService
  ){}
}
