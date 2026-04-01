import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const initScrollReveal = (elements: HTMLElement[] | NodeListOf<HTMLElement>) => {
  elements.forEach((el) => {
    gsap.fromTo(el, 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });
};

export const parallaxScroll = (element: HTMLElement, speed: number = 0.5) => {
  gsap.to(element, {
    y: () => -100 * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  });
};
