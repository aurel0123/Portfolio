import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'link';
type Size = 'sm' | 'md' | 'lg';
type BtnType = 'button' | 'submit' | 'reset';
type Target = '_self' | '_blank' | '_parent' | '_top';

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.html',
  styleUrl: './button.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  @Input() variant: Variant = 'primary';
  @Input() size: Size = 'md';
  @Input() type: BtnType = 'button';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() fullWidth = false;

  // Mode "icon-only": pas de label visible → fournir ariaLabel
  @Input() iconOnly = false;
  @Input() ariaLabel?: string;

  // Mode lien
  @Input() href?: string;
  @Input() target: Target = '_self';

  @Output() clicked = new EventEmitter<Event>();

  onClick(e: Event) {
    if (this.disabled || this.loading) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    this.clicked.emit(e);
  }

  get relAttr(): string | null {
    return this.href && this.target === '_blank' ? 'noopener noreferrer' : null;
  }
}