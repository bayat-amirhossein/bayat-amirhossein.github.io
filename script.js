const carousels = document.querySelectorAll("[data-carousel]");

carousels.forEach((carousel) => {
  const image = carousel.querySelector("[data-carousel-image]");
  const slides = (carousel.dataset.images || "")
    .split("|")
    .map((source) => source.trim())
    .filter(Boolean);
  const dots = Array.from(carousel.querySelectorAll("[data-carousel-dot]"));
  const previousButton = carousel.querySelector("[data-carousel-previous]");
  const nextButton = carousel.querySelector("[data-carousel-next]");
  const interval = Number(carousel.dataset.interval) || 4500;
  const altPrefix = carousel.dataset.altPrefix || "Paper figure";
  let activeIndex = 0;
  let timerId;

  if (!image || slides.length === 0) {
    return;
  }

  const showSlide = (nextIndex) => {
    activeIndex = (nextIndex + slides.length) % slides.length;

    image.classList.add("is-changing");

    window.setTimeout(() => {
      image.src = slides[activeIndex];
      image.alt = `${altPrefix} ${activeIndex + 1}`;
      image.classList.remove("is-changing");
    }, 180);

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

  if (previousButton) {
    previousButton.addEventListener("click", () => {
      showSlide(activeIndex - 1);
      restartTimer();
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      showSlide(activeIndex + 1);
      restartTimer();
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index);
      restartTimer();
    });
  });

  showSlide(activeIndex);
  startTimer();
});
