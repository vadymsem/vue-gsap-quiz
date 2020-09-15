import {
  TimelineLite,
  TimelineMax,
  gsap
} from 'gsap'

export {
  scaleIn,
  scaleOut,
  textTyping,
  oldTvBlinking,
  appearToLeft,
  confetti,
  dissolveText,
  flicker,
  hideToRight
}

/**
 * Animates an array of HTML elements.
 *
 * @param {Array} elements
 */
const scaleIn = (elements)  => {
  const timeline = new TimelineLite()

  const elementsAnimation = elements.map((element) => {
    timeline
      .fromTo(
        element,
        {
          scale: .01
        },
        {
          visibility: 'visible',
          duration: .15,
          scale: 1,
          ease: 'easeIn'
        }
      )
  })

  return new Promise(resolve => (
    timeline
      .add(elementsAnimation)
      .add(resolve)
  ))
}

/**
 * Animates an array of HTML elements.
 *
 * @param {Array} elements
 */
const scaleOut = (elements) => {
  const timeline = new TimelineLite()

  const elementsAnimation = elements.map((element) => {
    timeline
      .fromTo(
        element,
        {
          scale: 1
        },
        {
          visibility: 'hidden',
          duration: .15,
          scale: .1,
          y: '200px',
          ease: 'easeOut'
        }
      )
  })

  return new Promise(resolve => (
    timeline
      .add(elementsAnimation)
      .add(resolve)
  ))
}

/**
 * Animates text in typing style.
 *
 * @param {HTMLElement} element
 */
const textTyping = (element) => {
  return new Promise(resolve => {
    const timelineMax = new TimelineMax({
      onComplete: resolve
    })

    timelineMax.fromTo(
      element,
      2, /* typing speed */
      {
        width: 0,
      },
      {
        width: element.clientWidth,
        visibility: 'visible',
        ease: `steps(${element.textContent.length})`
      }
    );
  })
}

/**
 * Old TV-set animation.
 *
 * @param {HTMLElement} ref
 * @param {Number} delay / seconds
 */
const oldTvBlinking = (ref, delay = 0) => {
  return new Promise(resolve => {
    const timeline = new TimelineLite()

    timeline
      .set(ref, { opacity: 0 }, delay)
      .set(ref, { opacity: 1 }, '+=0.15')
      .set(ref, { opacity: 0 }, '+=0.15')
      .set(ref, { opacity: 1 }, '+=0.15')
      .to(ref, { scaleY: 0, ease: 'power4.out', duration: .2 })
      .to(ref, { opacity: 0, duration: .2 })
      .add(resolve)
  })
}

/**
 * Move element to left for appearing
 * 
 * @param {HTMLElement} element 
 * @param {Number} duration 
 */
const appearToLeft = (element, duration = 0.3) => {
  const timeline = new TimelineLite()

  return new Promise(resolve => {
    timeline
      .fromTo(
        element,
        {
          x: '-200px',
          opacity: 0
        },
        {
          duration,
          x: 0,
          opacity: 1
        }
      )
      .add(resolve)
  })
}


/**
 * 
 * @param {HTMLElement} element 
 * @param {Number} containerWidth 
 * @param {Number} containerHeight 
 */
const confetti = (element, containerWidth, containerHeight) => {
  // There is no any reason to return Promise as the animation is infinite
  const randomize = (min, max) => min + Math.floor(Math.random() * (max - min))

  gsap.set(element, {
    width: 10,
    height: 10,
    x: randomize(-containerWidth, containerWidth / 2),
    y: randomize(-containerHeight, containerHeight / 2),
    rotation: randomize(0, 180),
    opacity: 1,
    backgroundColor: `hsl(${randomize(0, 150)}, 50%, 50%)`
  })
  gsap.to(element, {
    y: containerHeight,
    ease: 'Linear.easeNone',
    repeat: -1,
    duration: randomize(0, 5) + 4
  })
  gsap.to(element, {
    x: '+=70',
    repeat: -1,
    yoyo: true,
    ease: 'Sine.easeInOut',
    duration: randomize(0, 5) + 1
  })
  gsap.to(element, {
    opacity: 0,
    scaleX: 0.2,
    rotation: randomize(0, 360),
    repeat: -1,
    yoyo: true,
    ease: 'Sine.easeInOut',
    duration: randomize(0, 5) + 1
  })
}

/**
 * Animates text dissolving style.
 *
 * @param {HTMLElement} element
 */
const dissolveText = (element) => {
  const timeline = new TimelineLite()

  return new Promise(resolve => {
    timeline
      .fromTo(
        element,
        {
          letterSpacing: '1px'
        },
        {
          letterSpacing: '200px' ,
          duration: .4,
          opacity: 0,
          ease: 'easeOut'
        }
      )
      .add(resolve)
  })
}

/**
 * Flicker animation.
 *
 * @param {HTMLElement} ref
 * @param {Number} flickTimes
 * @param {Number} delay / seconds
 * @param {String} backgroundColor
 */
const flicker = (ref, flickTimes = 3, delay = 0, backgroundColor = null) => {
  const timeline = new TimelineLite()

  return new Promise(resolve => {
    timeline.set(ref, { opacity: 1 }, delay)

    for (let i = 0; i <= (flickTimes * 2); i++) {
      timeline.set(ref, { opacity: i % 2, backgroundColor }, '+=0.35')
    }

    timeline.add(resolve)
  })
}

/**
 * Move element to right for hiding
 * 
 * @param {HTMLElement} element 
 * @param {Number} duration 
 */
const hideToRight = (element, duration = 0.3) => {
  const timeline = new TimelineLite()

  return new Promise(resolve => {
    timeline
      .fromTo(
        element,
        {
          x: 0,
          opacity: 1
        },
        {
          duration,
          x: '200px',
          opacity: 0
        }
      )
      .add(resolve)
  })
}
