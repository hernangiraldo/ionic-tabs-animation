import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ɵ_sanitizeStyle } from '@angular/core';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements AfterViewInit {

  @ViewChild('whiteRound') whiteRound: ElementRef;

  private animation: any;

  constructor(
    private animationController: AnimationController
  ) {

  }

  async ngAfterViewInit() {
    this.animation = this.animationController
    .create()
    .addElement(this.whiteRound.nativeElement)
    .duration(300)
    .easing('ease-in')
    .fromTo("transform", "translateX(0)", `translateX(${window.innerWidth}px)`);

    // this.animation.play();

    this.setStyle();
  }

  private setStyle() {
    const all = document.querySelectorAll('.tab-has-icon');

    if(all.length === 0) {
      setTimeout(() => {
        this.setStyle();
      }, 0);
      return;
    }

    all.forEach(el => {
      el.shadowRoot.querySelector('.button-native').setAttribute('style','overflow: inherit')
    });
  }

  public changeTab(tab: any) {
    const _tab = ({
      'tab1': 0,
      'tab2': .25,
      'tab3': .5,
      'tab4': .75
    })[tab.tab];

    this.animation.progressStart(true);
    this.animation.progressStep(_tab);
  }

}
