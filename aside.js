const BTNS_OPEN_ASIDE = document.querySelectorAll(".btn--aside-open");
const ASIDES_LAYOUT = document.querySelectorAll(".aside__layout");

BTNS_OPEN_ASIDE.forEach((btn) => {
  let id = btn.getAttribute("data-aside-open");
  btn.addEventListener("click", function () {
    document.getElementById(`${id}`).style.transform = "translateX(0)";
  });
});

ASIDES_LAYOUT.forEach((aside) => {
  let sign = Array.from(aside.classList).join().includes("left") ? -1 : 1;

  aside.addEventListener("click", (evt) => {
      let target = evt.target;

    if(target === aside && (window.innerWidth > 360) && (window.innerHeight < 1120)){
      aside.style.transform = `translateX(${sign * 100}vw)`;
    }

    if (target.classList.contains("header__close")) {
      aside.style.transform = `translateX(${sign * 100}vw)`;
    }
  });
});