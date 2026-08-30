document.addEventListener('DOMContentLoaded', () => {


  /* ==================================================
     STICKY NAVIGATION
     ================================================== */

  const nav =
    document.querySelector('.nav');


  const onScroll = () => {

    if (window.scrollY > 40) {

      nav.classList.add('scrolled');

    } else {

      nav.classList.remove('scrolled');

    }

  };


  window.addEventListener(
    'scroll',
    onScroll,
    {
      passive: true
    }
  );


  onScroll();



  /* ==================================================
     MOBILE MENU
     ================================================== */

  const toggle =
    document.querySelector('.menu-toggle');

  const links =
    document.querySelector('.nav-links');


  if (toggle && links) {


    /* OPEN / CLOSE */

    toggle.addEventListener(
      'click',
      () => {

        links.classList.toggle('open');


        toggle.setAttribute(
          'aria-expanded',
          links.classList.contains('open')
        );

      }
    );


    /* CLOSE AFTER CLICK */

    links
      .querySelectorAll('a')
      .forEach((a) => {

        a.addEventListener(
          'click',
          () => {

            links.classList.remove(
              'open'
            );


            toggle.setAttribute(
              'aria-expanded',
              'false'
            );

          }
        );

      });

  }



  /* ==================================================
     SMOOTH REVEAL ON SCROLL
     ================================================== */

  const observer =
    new IntersectionObserver(

      (entries) => {

        entries.forEach(
          (entry) => {

            if (
              entry.isIntersecting
            ) {

              entry.target.style.opacity =
                '1';


              entry.target.style.transform =
                'translateY(0)';

            }

          }
        );

      },

      {
        threshold: 0.12,

        rootMargin:
          '0px 0px -40px 0px'
      }

    );


  document
    .querySelectorAll(
      '.feature-card, .step, .about-visual, .contact-form, .network-card'
    )
    .forEach(
      (el) => {

        el.style.opacity =
          '0';

        el.style.transform =
          'translateY(24px)';

        el.style.transition =
          'opacity 0.55s ease, transform 0.55s ease';

        observer.observe(el);

      }
    );



  /* ==================================================
     VAJRA NETWORK COUNTERS
     ================================================== */

  const networkCounters =
    document.querySelectorAll(
      '.network-number'
    );


  if (networkCounters.length) {


    const animateCounter =
      (element) => {


        const target =
          Number(
            element.dataset.target || 0
          );


        const suffix =
          element.dataset.suffix || '';


        const duration =
          1800;


        const startTime =
          performance.now();


        const updateCounter =
          (currentTime) => {


            const elapsed =
              currentTime - startTime;


            const progress =
              Math.min(
                elapsed / duration,
                1
              );


            /*
             * Smooth ease-out animation.
             */

            const eased =
              1 -
              Math.pow(
                1 - progress,
                3
              );


            const currentValue =
              Math.floor(
                target * eased
              );


            element.textContent =
              currentValue.toLocaleString(
                'en-IN'
              ) + suffix;


            if (
              progress < 1
            ) {

              requestAnimationFrame(
                updateCounter
              );

            } else {

              element.textContent =
                target.toLocaleString(
                  'en-IN'
                ) + suffix;

            }

          };


        requestAnimationFrame(
          updateCounter
        );

      };



    const counterObserver =
      new IntersectionObserver(

        (entries, observer) => {

          entries.forEach(
            (entry) => {


              if (
                entry.isIntersecting &&
                !entry.target.dataset.animated
              ) {


                entry.target.dataset.animated =
                  'true';


                animateCounter(
                  entry.target
                );


                observer.unobserve(
                  entry.target
                );

              }

            }
          );

        },

        {
          threshold: 0.35
        }

      );



    networkCounters.forEach(
      (counter) => {

        counterObserver.observe(
          counter
        );

      }
    );

  }



  /* ==================================================
     WHATSAPP CONTACT FORM
     ================================================== */

  const contactForm =
    document.getElementById(
      'contactForm'
    );


  if (contactForm) {


    contactForm.addEventListener(
      'submit',
      (event) => {


        /* STOP NORMAL SUBMISSION */

        event.preventDefault();



        /* GET FORM VALUES */

        const name =
          document
            .getElementById('name')
            ?.value
            .trim() ||
          'Customer';


        const email =
          document
            .getElementById('email')
            ?.value
            .trim() ||
          '';


        const phone =
          document
            .getElementById('phone')
            ?.value
            .trim() ||
          '';


        const message =
          document
            .getElementById('message')
            ?.value
            .trim() ||
          '';



        /* CREATE WHATSAPP MESSAGE */

        const whatsappMessage =

          `Hello Vajra, I would like to get started.\n\n` +

          `Name: ${name}\n` +

          `Email: ${email}\n` +

          `Phone: ${phone}\n` +

          `Message: ${message}`;



        /*
         * =================================================
         * WHATSAPP NUMBER
         * =================================================
         *
         * Replace this with your real WhatsApp Business
         * number.
         *
         * Example:
         *
         * +91 98765 43210
         *
         * becomes:
         *
         * 919876543210
         *
         * Do NOT use + or spaces.
         *
         * =================================================
         */

        const whatsappNumber =
          '919999999999';



        /* CREATE URL */

        const whatsappUrl =
          `https://wa.me/${whatsappNumber}` +
          `?text=${encodeURIComponent(
            whatsappMessage
          )}`;



        /* OPEN WHATSAPP */

        window.open(
          whatsappUrl,
          '_blank',
          'noopener,noreferrer'
        );

      }
    );

  }

});