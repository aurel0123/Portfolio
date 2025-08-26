import { Component } from '@angular/core';
import { NgOptimizedImage  } from "@angular/common";
import { ButtonComponent } from '../../shared/ui/button/button';
import { TRANSLATIONS ,  LanguageCode, TranslationKey } from '../../shared/translations';
import { Services } from '../services/services';
import { About } from "../about/about";
import { Skill } from "../skill/skill";
import { Project } from "../project/project";
import { Contact } from "../contact/contact";

@Component({
  selector: 'app-home',
  imports: [NgOptimizedImage, ButtonComponent, Services, About, Skill, Project, Contact],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
   translations = TRANSLATIONS;

  // Sécurise la valeur lue du localStorage
  currentLang: LanguageCode = (() => {
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
