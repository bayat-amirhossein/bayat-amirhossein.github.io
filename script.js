const carousels = document.querySelectorAll("[data-carousel]");

carousels.forEach((carousel) => {
  const slides = Array.from(carousel.querySelectorAll(".paper-slide"));
  const dots = Array.from(carousel.querySelectorAll("[data-carousel-dot]"));
  const previousButton = carousel.querySelector("[data-carousel-previous]");
  const nextButton = carousel.querySelector("[data-carousel-next]");
  const interval = Number(carousel.dataset.interval) || 4500;
  let activeIndex = 0;
  let timerId;

  const showSlide = (nextIndex) => {
    activeIndex = (nextIndex + slides.length) % slides.length;

    slides.forEach((slide, index) => {
      slide.classList.toggle("is-active", index === activeIndex);
    });

    dots.forEach((dot, index) => {
      dot.classList.toggle("is-active", index === activeIndex);
    });
  };

  const startTimer = () => {
    timerId = window.setInterval(() => {
      showSlide(activeIndex + 1);
    }, interval);
  };

  const restartTimer = () => {
    window.clearInterval(timerId);
    startTimer();
  };

  previousButton.addEventListener("click", () => {
    showSlide(activeIndex - 1);
    restartTimer();
  });

  nextButton.addEventListener("click", () => {
    showSlide(activeIndex + 1);
    restartTimer();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index);
      restartTimer();
    });
  });

  showSlide(activeIndex);
  startTimer();
});
