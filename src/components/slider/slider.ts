import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const slidesContainer = document.querySelector<HTMLElement>('.slider__wrapper');
const slides = gsap.utils.toArray<HTMLElement>('.slider__slide');

// smooth sliding and vertical wheel transfer to horizontal scroll
// if (slidesContainer) {
//   const stepMultiplier = 3;
//   const speed = 1;

//   slidesContainer.addEventListener('wheel', function (event) {
//     event.preventDefault();

//     console.log('aaaaaaa');

//     const { scrollLeft } = slidesContainer;
//     const { deltaY } = event;

//     gsap.to(slidesContainer, {
//       duration: 1 / speed,
//       scrollTo: { x: scrollLeft + stepMultiplier * deltaY }
//     });
//   });
// }

const stepMultiplier = 3;
const speed = 1;

window.addEventListener('wheel', (event) => {
  const { deltaY } = event;

  gsap
    .timeline()
    .to(slides, {
      duration: 1 / speed,
      x:
        deltaY > 0
          ? `-=${Math.abs(stepMultiplier * deltaY)}`
          : `+=${Math.abs(stepMultiplier * deltaY)}`
    })
    .to(
      slides,
      {
        duration: 1 / speed,
        skewX: deltaY > 0 ? 10 : -10,
        ease: 'power1.out'
      },
      '<'
    )
    .to(
      slides,
      {
        duration: 1.2 / (2 * speed),
        skewX: 0,
        ease: 'power1.out'
      },
      `<${1 / (2 * speed)}`
    )
    .eventCallback('onComplete', () => {
      slides.forEach((slide) => {
        const { x, width } = slide.getBoundingClientRect();
        const y = x + width;
        const gapOffset =
          (100 * (slides.length * 40)) /
          slides[0].getBoundingClientRect().width;
        console.log('gapOffset', gapOffset);

        if (deltaY > 0 && y < -5 * width) {
          gsap.to(slide, {
            xPercent: `+=${slides.length * 100 + gapOffset}`,
            duration: 0
          });
        }

        if (deltaY < 0 && x > window.innerWidth + 5 * width) {
          gsap.to(slide, {
            xPercent: `-=${slides.length * 100 + gapOffset}`,
            duration: 0
          });
        }
      });
    });
});

// slides.forEach((slide) => {
//   const slideContent = slide.querySelector('.slider__slide-content');

//   ScrollTrigger.create({
//     scroller: '.slider__wrapper',
//     trigger: slide,
//     horizontal: true,
//     markers: true,
//     scrub: 0.5,
//     animation: gsap.to(slideContent, {
//       xPercent: 50,
//       ease: 'power1.inOut'
//     })
//   });
// });
