import { Component } from '@angular/core';
import { LanguageCode, TranslationKey, TRANSLATIONS } from '../../shared/translations';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About {
  translations = TRANSLATIONS;

  currentLang : LanguageCode = (()=> {
    const saved = localStorage.getItem('selectedLanguage');
    return saved === 'fr' || saved === 'en' ? saved : 'en';
  })();

  private onLangChanged = (e: Event) => {
    const { language } = (e as CustomEvent<{ language: LanguageCode }>).detail;
    this.currentLang = language;
  };

  ngOnInit(): void {
    window.addEventListener('languageChanged', this.onLangChanged as EventListener);
  }

  ngOnDestroy(): void {
    window.removeEventListener('languageChanged', this.onLangChanged as EventListener);
  }

  t(key: TranslationKey): string {
    return this.translations[this.currentLang][key] ?? key;
  }
}
