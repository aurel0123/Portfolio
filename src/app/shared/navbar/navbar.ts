import { Component } from '@angular/core';
import { NgOptimizedImage } from "@angular/common";
interface Language {
  code : string;
  name : string;
  flag : string;
}
@Component({
  selector: 'app-navbar',
  imports: [NgOptimizedImage],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  isLanguageDropdownOpen = false;

  
  availableLanguages: Language[] = [
    { code: 'en', name: 'English', flag: 'assets/flags/usa.png' },
    { code: 'fr', name: 'Français', flag: 'assets/flags/fr.png' }
  ]

  currentLanguage: Language = this.availableLanguages[0];
  translations: { [key: string]: { [key: string]: string } } = {
    fr : {
      'nav.home': 'Accueil',
      'nav.services' : 'Services', 
      'nav.about': 'À propos',
      'nav.projects': 'Projets',
      'nav.contact': 'Contact',
    }, 
    en : {
      'nav.home': 'Home',
      'nav.services': 'Services',
      'nav.about': 'About me',
      'nav.projects': 'Projects',
      'nav.contact': 'Contact me',
    }
  }
  
  constructor() {
    this.loadSavedLanguage(); 
  }
  toggleLanguageDropdown() : void {
    this.isLanguageDropdownOpen = !this.isLanguageDropdownOpen;
  }
  closeLanguageDropdown() : void {
    this.isLanguageDropdownOpen = false;
  }

  changeLangue(Language : Language) : void {
    this.currentLanguage = Language;
    this.isLanguageDropdownOpen = false;
    localStorage.setItem('selectedLanguage', Language.code);
    this.onLanguageChange(Language);
    console.log("Language changed to: ", Language.code);
  }
  private loadSavedLanguage(): void {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      const found = this.availableLanguages.find(lang => lang.code === savedLanguage);
      if (found) {
        this.currentLanguage = found;
      }
    }
  }

  getTranslation(key: string): string {
    return this.translations[this.currentLanguage.code]?.[key] || key;
  }
  private onLanguageChange(language: Language): void {
    
    const event = new CustomEvent('languageChanged', {
      detail: { language: language.code }
    });
    window.dispatchEvent(event);
  }
}
