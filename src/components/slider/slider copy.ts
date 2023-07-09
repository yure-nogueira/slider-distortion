import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { scrollSlide } from './animations';

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

  const motionConfig = {
    targets: slides,
    targetsGap: 40,
    step: stepMultiplier * deltaY,
    speed
  };

  scrollSlide(motionConfig);
  // gsap
  //   .timeline()
  //   .to(slides, {
  //     duration: 1 / speed,
  //     x:
  //       deltaY > 0
  //         ? `-=${Math.abs(stepMultiplier * deltaY)}`
  //         : `+=${Math.abs(stepMultiplier * deltaY)}`
  //   })
  //   .to(
  //     slides,
  //     {
  //       duration: 1 / speed,
  //       skewX: deltaY > 0 ? 10 : -10,
  //       ease: 'power1.out'
  //     },
  //     '<'
  //   )
  //   .to(
  //     slides,
  //     {
  //       duration: 1.2 / (2 * speed),
  //       skewX: 0,
  //       ease: 'power1.out'
  //     },
  //     `<${1 / (2 * speed)}`
  //   )
  //   .eventCallback('onComplete', () => {
  //     slides.forEach((slide) => {
  //       const { x, width } = slide.getBoundingClientRect();
  //       const y = x + width;
  //       const gapOffset =
  //         (100 * (slides.length * 40)) /
  //         slides[0].getBoundingClientRect().width;

  //       if (deltaY > 0 && y < -5 * width) {
  //         console.log('entrou aqui 1');
  //         gsap.to(slide, {
  //           xPercent: `+=${slides.length * 100 + gapOffset}`,
  //           duration: 0
  //         });
  //       }

  //       if (deltaY < 0 && x > window.innerWidth + 5 * width) {
  //         console.log('entrou aqui 2');

  //         gsap.to(slide, {
  //           xPercent: `-=${slides.length * 100 + gapOffset}`,
  //           duration: 0
  //         });
  //       }
  //     });
  //   });
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

slides.forEach((slide, index) => {
  // let playing = false;
  if (index % 2 === 0) return;

  const animation = gsap
    .timeline({
      paused: true,
      onComplete: () => {
        console.log('completed');
        // playing = false;
      },
      onReverseComplete: () => {
        console.log('reversed');
        // playing = false;
      }
    })
    .to(slide, {
      skewY: 5,
      duration: 0.15
    })
    .to(
      slide,
      {
        scale: 1,
        zIndex: 15,
        marginBottom: 0,
        marginTop: 80,

        duration: 0.3
      },
      '<'
    )
    .to(
      slide,
      {
        skewY: 0,
        duration: 0.15
      },
      '<0.15'
    );

  slide.addEventListener('mouseenter', () => {
    // if (playing) return;
    // playing = true;
    if (animation.progress() === 0) {
      animation.play();
    }
  });

  slide.addEventListener('mouseleave', () => {
    // if (!playing) {
    console.log(animation.progress());
    if (animation.progress() === 0 || animation.progress() === 1) {
      return animation.reverse();
    }

    // }

    setTimeout(() => {
      // playing = true;
      // animation.pause();
      animation.reverse();
    }, 300);
  });
});
