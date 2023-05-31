/* @author web@2dsd.ru | webtitov.ru */
'use strict';

document.addEventListener("DOMContentLoaded", () => {
  const WebT = {};

  WebT.settings = {
    modal_active_class: '--modal-show'
  };

  WebT.elements = {
    scroll_links: document.querySelectorAll('a[href^="#"]'),
    modal_toggle: document.querySelectorAll('[data-modal-toggle]'),
    modal_box: document.querySelectorAll('[data-modal]'),
    overlay: document.querySelector('.theme-overlay'),
    close_modal: document.querySelectorAll('[data-modal-close]'),
    project_images: document.querySelectorAll('.js-scrollable-image'),
    tooltip_links: document.querySelectorAll('.js-tooltip'),
    ajax_forms: document.querySelectorAll('.ajax-form')
  };

  /* Check if click outside target element */
  const isClickOutside = ($target, $class) => {
    const closeTarget = (e) => {
      if (!e.target.classList.contains($class)) {
        $target.classList.remove($class);
      }
    };
    if ($target === 0) {
      document.body.removeEventListener('click', closeTarget);
    } else {
      document.body.addEventListener('click', closeTarget);
    }
  };

  /* Close all modals */
  const closeModals = () => {
    // close all modals
    for (let i=0; i < WebT.elements.modal_box.length; i++) {
      WebT.elements.modal_box[i].classList.remove(WebT.settings.modal_active_class);
    }
    // remove active classes from modal toggle buttons
    for (let i=0; i < WebT.elements.modal_toggle.length; i++) {
      WebT.elements.modal_toggle[i].classList.remove(WebT.settings.modal_active_class);
    }
    // close overlay
    WebT.elements.overlay.classList.remove(WebT.settings.modal_active_class);
  }

  /* Stick header on scroll */
  const changeHeaderClass = () => {
    let scrollPosY = window.pageYOffset | document.body.scrollTop,
      header = document.getElementsByTagName('header')[0];

    if(scrollPosY  > 70) {
      header.classList.add('sticky-header');
    } else if(scrollPosY <= 70) {
      header.classList.remove('sticky-header');
    }
  };

  /* Modals */
  (() => {
    // Add click event to close modals
    for (let i=0; i < WebT.elements.close_modal.length; i++) {
      WebT.elements.close_modal[i].addEventListener('click', () => {
        closeModals();
      });
    }
    // Add click event to open target modal
    for (let i=0; i < WebT.elements.modal_toggle.length; i++) {
      WebT.elements.modal_toggle[i].addEventListener('click', () => {
        let this_toggle = WebT.elements.modal_toggle[i],
            target_modal = this_toggle.getAttribute('data-modal-toggle');
        // if nav modal opened
        if (target_modal === 'nav' && this_toggle.classList.contains(WebT.settings.modal_active_class)) {
          closeModals();
          WebT.elements.modal_toggle[i].classList.remove(WebT.settings.modal_active_class);
        } else {
          closeModals();
          document.querySelector(`[data-modal='${target_modal}']`).classList.add(WebT.settings.modal_active_class);
          WebT.elements.overlay.classList.add(WebT.settings.modal_active_class);
          WebT.elements.modal_toggle[i].classList.add(WebT.settings.modal_active_class);
        }
      });
    }
  })();

  /* Top carousel */
  (() => {
    let top_carousel =  '#top_carousel';
    let swiper = new Swiper(top_carousel, {
      spaceBetween: 32,
      slidesPerView: 3,
      loop: true,
      navigation: {
        nextEl: '.--top-nav-next',
        prevEl: '.--top-nav-prev',
      },
      breakpoints: {
        320: {
          slidesPerView: 1
        },
        960: {
          centeredSlides: true,
          slidesPerView: 2
        },
        1360: {
          centeredSlides: true,
          slidesPerView: 3
        }
      }
    });
  })();

  /* Clients carousel */
  (() => {
    let clients_carousel =  '#clients_carousel';
    let swiper = new Swiper(clients_carousel, {
      spaceBetween: 1,
      slidesPerView: 1,
      loop: false,
      navigation: {
        nextEl: '.--clients-nav-next',
        prevEl: '.--clients-nav-prev',
      }
    });
  })();

  /* Reviews carousel */
  (() => {
    let reviews_carousel =  '#reviews_carousel';
    let swiper = new Swiper(reviews_carousel, {
      spaceBetween: 32,
      slidesPerView: 3,
      loop: true,
      navigation: {
        nextEl: '.--reviews-nav-next',
        prevEl: '.--reviews-nav-prev',
      },
      breakpoints: {
        320: {
          slidesPerView: 1
        },
        960: {
          slidesPerView: 2
        },
        1360: {
          centeredSlides: true,
          slidesPerView: 3
        }
      }
    });
  })();

  /* FAQ tabs */
  (() => {
    let faq_buttons = document.querySelectorAll('.faq-item__button');

    const closeAllTabs = () => {
      for (let x=0; x < faq_buttons.length; x++) {
        faq_buttons[x].classList.remove('--item-opened');
      }
    }

    for (let i=0; i < faq_buttons.length; i++) {
      faq_buttons[i].addEventListener('click', () => {
        closeAllTabs();
        faq_buttons[i].classList.add('--item-opened');
      });
    }
  })();

  /* Toggle skills title */
  (() => {
    let skill_button_pro = document.getElementById('form_type_pro_button');
    let skill_button_blogger = document.getElementById('form_type_blog_button');
    let skills_title = document.getElementById('skills_title');

    skill_button_pro.addEventListener('click', () => {
      skills_title.textContent = 'Я могу:'
    });

    skill_button_blogger.addEventListener('click', () => {
      skills_title.textContent = 'Я ищу:'
    });
  })();

  /* Anchor smooth scroll */
  (() => {
    WebT.elements.scroll_links.forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        closeModals();
        const offset = -30,
          element = document.querySelector(this.getAttribute('href')),
          target = element.getBoundingClientRect().top + window.pageYOffset + offset;
        window.scrollTo({top: target, behavior: 'smooth'});
      });
    });
  })();

  /* AJAX form send */
  (() => {
    function sendData($data) {
      const XHR = new XMLHttpRequest();

      XHR.addEventListener("error", function (event) {
        alert('Произошла ошибка');
        console.log('Не получилось');
      });

      XHR.addEventListener("load", function (event) {
        if (document.body.classList.contains(WebT.settings.modal_active_class)) {
          document.body.classList.remove(WebT.settings.modal_active_class);
        }
        alert('Форма успешно отправлена!');

        for (let value of $data.values()) {
          console.log(value);
        }
      });

      XHR.open('POST', '/form-send.php');
      XHR.send($data);
    }

    // Вешаем на все формы свое событие отправки
    for (let i = 0; i < WebT.elements.ajax_forms.length; i++) {
      WebT.elements.ajax_forms[i].addEventListener('submit', (event) => {

        let form_button = event.target.querySelector('button[type="submit"]');
        const form_data = new FormData(event.target);

        event.preventDefault();

        sendData(form_data);
        form_button.classList.add('--disabled-button');
        form_button.setAttribute('disabled', 'disabled');
      }, false);
    }
  })();
  
  /* Functions init */
  window.addEventListener('load', changeHeaderClass);
  window.addEventListener('scroll', changeHeaderClass);

  /* Phone inputs mask */
  jQuery('input[type=tel]').mask('+7 (000) 000-00-00');
});