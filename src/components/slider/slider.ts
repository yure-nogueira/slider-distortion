import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Observer } from 'gsap/Observer';
import { scrollSlide, setSlidesHoverAction } from './animations';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Observer);

window.addEventListener('DOMContentLoaded', () => {
  // configurações do slider
  const stepMultiplier = 3;
  const speed = 1;
  let motionConfig: any;
  let currentAnimation: gsap.core.Timeline | null;
  let isDirectionPositive = true;
  let firstMotion = false;
  let lockSlider = false;
  let unlocking = false;

  const slides = gsap.utils.toArray<HTMLElement>('.slider__slide');

  slides.forEach((slide) => {
    slide.addEventListener('dragstart', (e) => {
      e.preventDefault();
    });
  });

  Observer.create({
    target: window,
    type: 'wheel,touch,scroll,pointer',
    dragMinimum: 10,
    onWheel: (self) => {
      const { deltaY } = self;
      motionConfig = {
        targets: slides,
        targetsGap: 40,
        step: stepMultiplier * deltaY,
        speed
      };

      if (!firstMotion) {
        firstMotion = true;
      } else if (deltaY !== 0 && isDirectionPositive !== deltaY > 0) {
        isDirectionPositive = deltaY > 0;
        lockSlider = true;
        return;
      }

      if (lockSlider && !unlocking) {
        if (currentAnimation && currentAnimation.isActive()) {
          unlocking = true;
          currentAnimation.duration(1 * currentAnimation.timeScale());
          return currentAnimation!.eventCallback('onComplete', () => {
            lockSlider = false;
            unlocking = false;
          });
        }
        lockSlider = false;
      } else if (lockSlider && unlocking) {
        return;
      }

      if (currentAnimation) {
        currentAnimation.pause();
        currentAnimation = scrollSlide(motionConfig);
        currentAnimation.play();
      }

      currentAnimation = scrollSlide(motionConfig);
      currentAnimation.play();
    },
    onDrag: (self) => {
      console.log(self);
      const { deltaX } = self;
      motionConfig = {
        targets: slides,
        targetsGap: 40,
        // step: deltaX > 0 ? -200 : 200,
        step:
          -5 * stepMultiplier * deltaX > 300
            ? 300
            : -5 * stepMultiplier * deltaX,
        speed
      };

      if (!firstMotion) {
        firstMotion = true;
      } else if (deltaX !== 0 && isDirectionPositive !== deltaX > 0) {
        isDirectionPositive = deltaX > 0;
        lockSlider = true;
        return;
      }

      if (lockSlider && !unlocking) {
        if (currentAnimation && currentAnimation.isActive()) {
          unlocking = true;
          currentAnimation.duration(1 * currentAnimation.timeScale());
          return currentAnimation!.eventCallback('onComplete', () => {
            lockSlider = false;
            unlocking = false;
          });
        }
        lockSlider = false;
      } else if (lockSlider && unlocking) {
        return;
      }

      if (currentAnimation) {
        currentAnimation.pause();
        currentAnimation = scrollSlide(motionConfig);
        currentAnimation.play();
      }

      currentAnimation = scrollSlide(motionConfig);
      currentAnimation.play();
    }
  });

  // window.addEventListener('wheel', (event) => {
  //   const { deltaY } = event;
  //   const motionConfig = {
  //     targets: slides,
  //     targetsGap: 40,
  //     step: stepMultiplier * deltaY,
  //     speed
  //   };
  //   scrollSlide(motionConfig);
  // });

  setSlidesHoverAction(slides);
});
