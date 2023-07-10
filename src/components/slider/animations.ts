import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';

gsap.registerPlugin(Observer);

export function scrollSlide(motionConfig: any) {
  const { targets, speed, step } = motionConfig;

  return gsap
    .timeline({ defaults: { duration: 1 / speed } })
    .to(targets, { x: `+=${-step}` })
    .to(
      targets,
      {
        skewX: step > 0 ? -10 : 10,
        ease: 'power1.out'
      },
      '<'
    )
    .to(
      targets,
      {
        duration: 0.4 / speed,
        skewX: 0,
        ease: 'power1.out'
      },
      `<${0.6 / speed}`
    )
    .eventCallback(
      'onComplete',
      setOffscreenTargetsPosition.bind(null, motionConfig)
    );
}

export function setSlidesHoverAction(slides: any) {
  slides.forEach((slide: any, index: any) => {
    // ignora animação de cards que já estão na "frente"
    if (index % 2 === 0) return;

    const animation = createSlideForwardAnimation(slide);

    slide.addEventListener('mouseenter', () => {
      if (animation.progress() === 0) {
        animation.play();
      }
    });

    slide.addEventListener('mouseleave', () => {
      if (animation.progress() === 0 || animation.progress() === 1) {
        return animation.reverse();
      }

      setTimeout(() => {
        animation.reverse();
      }, 300);
    });
  });
}

//
// helper functions
//
export function setOffscreenTargetsPosition(motionConfig: any) {
  const { targets, targetsGap, step } = motionConfig;

  targets.forEach((target: any) => {
    const { x, width } = target.getBoundingClientRect();
    const y = x + width;
    const gapOffset =
      (100 * (targets.length * targetsGap)) /
      targets[0].getBoundingClientRect().width;

    if (step > 0 && y < -5 * width) {
      gsap.to(target, {
        xPercent: `+=${targets.length * 100 + gapOffset}`,
        duration: 0
      });
    }

    if (step < 0 && x > window.innerWidth + 5 * width) {
      gsap.to(target, {
        xPercent: `-=${targets.length * 100 + gapOffset}`,
        duration: 0
      });
    }
  });
}

function createSlideForwardAnimation(slide: any) {
  return gsap
    .timeline({
      paused: true
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
}
