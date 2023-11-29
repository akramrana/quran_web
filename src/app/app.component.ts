import { Component, Inject } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { SeoService } from './services/seo.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'quran';

  constructor(
    private router: Router,
    private seoService: SeoService,
    @Inject(DOCUMENT) private document: any,
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        // Show loading indicator
      }
      if (event instanceof NavigationEnd) {
        // Hide loading indicator
        //console.log(event.url);
        this.destroyLinkForCanonicalURL();
      }
      if (event instanceof NavigationError) {
        // Hide loading indicator
        // Present error to user
        console.log(event.error);
      }
    });
  }

  createLinkForCanonicalURL() {
    this.seoService.createLinkForCanonicalURL();
  }

  destroyLinkForCanonicalURL() {
    const els = this.document.querySelectorAll('link[rel=\'canonical\']');
    for (let i = 0, l = els.length; i < l; i++) {
      const el = els[i];
      el.remove();
    }    
    this.createLinkForCanonicalURL();
  }
}
