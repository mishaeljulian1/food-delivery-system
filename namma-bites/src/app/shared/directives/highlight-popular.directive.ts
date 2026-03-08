import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appHighlightPopular]',
    standalone: true
})
export class HighlightPopularDirective implements OnInit {
    @Input('appHighlightPopular') rating: number = 0;

    constructor(private el: ElementRef, private renderer: Renderer2) { }

    ngOnInit(): void {
        if (this.rating > 4.5) {
            this.renderer.setStyle(this.el.nativeElement, 'border', '2px solid #FFD700');
            this.renderer.setStyle(this.el.nativeElement, 'box-shadow', '0 0 12px rgba(255, 215, 0, 0.45)');
            this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');

            // Add a "Top Rated" badge
            const badge = this.renderer.createElement('span');
            this.renderer.addClass(badge, 'popular-badge');
            this.renderer.setProperty(badge, 'textContent', '⭐ Top Rated');
            this.renderer.setStyle(badge, 'position', 'absolute');
            this.renderer.setStyle(badge, 'top', '8px');
            this.renderer.setStyle(badge, 'left', '8px');
            this.renderer.setStyle(badge, 'background', '#FFD700');
            this.renderer.setStyle(badge, 'color', '#333');
            this.renderer.setStyle(badge, 'font-size', '11px');
            this.renderer.setStyle(badge, 'font-weight', '700');
            this.renderer.setStyle(badge, 'padding', '2px 8px');
            this.renderer.setStyle(badge, 'border-radius', '12px');
            this.renderer.setStyle(badge, 'z-index', '2');
            this.renderer.appendChild(this.el.nativeElement, badge);
        }
    }
}
