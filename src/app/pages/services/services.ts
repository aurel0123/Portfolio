import { Component } from '@angular/core';
import { LanguageCode, TRANSLATIONS } from '../../shared/translations';

@Component({
  selector: 'app-services',
  imports: [],
  templateUrl: './services.html',
  styleUrl: './services.css'
})
export class Services {
  translations = TRANSLATIONS ; 

  currentLanguage: LanguageCode = (() => {
    const saved = localStorage.getItem('selectedLanguage')
    return (saved === 'en' || saved === 'fr') ? saved : 'en'
  })() ; 

  private onLangChanged = (e: Event) => {
    const { language } = (e as CustomEvent<{ language: LanguageCode }>).detail;
    this.currentLanguage = language;
  }

  ngOnInit(): void {
    window.addEventListener('languageChanged', this.onLangChanged as EventListener);
  }
  ngOnDestroy(): void {
    window.removeEventListener('languageChanged', this.onLangChanged as EventListener);
  }

  t(key: keyof typeof TRANSLATIONS['en']): string {
    return this.translations[this.currentLanguage][key] ?? key;
  }
}
