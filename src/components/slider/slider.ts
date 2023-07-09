import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { scrollSlide, setSlidesHoverAction } from './animations';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

window.addEventListener('DOMContentLoaded', () => {
  const slides = gsap.utils.toArray<HTMLElement>('.slider__slide');
  const stepMultiplier = 3;
  const speed = 1;

  window.addEventListener('wheel', (event) => {
    const { deltaY } = event;
    const motionConfig = {
      targets: slides,
      targetsGap: 40,
      step: stepMultiplier * deltaY,
      speed
    };
    scrollSlide(motionConfig);
  });

  setSlidesHoverAction(slides);
});
