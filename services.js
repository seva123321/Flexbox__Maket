let srcImage = [
  "Lenovo-logo",
  "Samsung-logo",
  "Apple-logo",
  "ViewSonic-logo",
  "Bosch-logo",
  "HP-logo",
  "Acer-logo",
  "Sony-logo",
  "Lenovo-logo",
  "Samsung-logo",
  "Apple-logo",
];

const SECTION = document.querySelector(".srv");
const LIST = document.querySelector(".srv__list");
const TEMPLATE = document.querySelector("#brand-template");
let btnShowList = document.querySelector(".srv__show");

for (let i = 0; i < srcImage.length; i++) {
  let clone = TEMPLATE.content.cloneNode(true);
  clone.querySelector("img").src = "public/img/" + `${srcImage[i]}.png`;
  clone.querySelector("img").srcset = "public/img/" + `${srcImage[i]}.svg`;
  LIST.appendChild(clone);
}

let makeElement = function (tag, className, text) {
  let element = document.createElement(tag);
  if (Array.isArray(className)) {
    element.classList.add(...className);
  } else {
    element.classList.add(className);
  }

  if (text) {
    element.textContent = text;
  }
  return element;
};

let shift = 0;
let swiping = function (btnPrevious, btnNext, pannel) {
  let margin = +getComputedStyle(LIST.children[0]).marginRight.split("px")[0];
  let itemWidth = +LIST.children[0].offsetWidth + margin;

  let paginationIsActive = function (sign) {
    for (let i = 0; i < pannel.children.length; i++) {
      if (pannel.children[i].classList.contains("swiper-pagination--active")) {
        pannel.children[i].classList.remove("swiper-pagination--active");
        pannel.children[i + sign].classList.add("swiper-pagination--active");
        break;
      }
    }
  };

  btnNext.addEventListener("click", function (e) {
    if (shift > (srcImage.length - 1) * -itemWidth) {
      shift -= itemWidth;
      let sign = 1;
      paginationIsActive(sign);
    }
    LIST.style.transform = `translate(${shift}px)`;
  });

  btnPrevious.addEventListener("click", function (e) {
    if (shift < 0) {
      shift += itemWidth;
      let sign = -1;
      paginationIsActive(sign);
    }
    LIST.style.transform = `translate(${shift}px)`;
  });
};

if (window.innerWidth < 330) {
  let pannel = makeElement("div", "swiper-pannel");

  for (let i = 0; i < srcImage.length; i++) {
    let pagination = makeElement("div", "swiper-pagination");

    if (i == 0) {
      pagination = makeElement("div", [
        "swiper-pagination",
        "swiper-pagination--active",
      ]);
    }
    pagination.dataset.index = i;
    pannel.appendChild(pagination);
  }

  let btnPrevious = makeElement("div", "swiper-button-prev");
  let btnNext = makeElement("div", "swiper-button-next");
  pannel.addEventListener("click", function (evt) {
    let target = evt.target;
    let newIndex = target.dataset.index;
    if (target.classList.contains("swiper-pagination")) {
      let margin = +getComputedStyle(LIST.children[0]).marginRight.split(
        "px"
      )[0];
      let itemWidth = +LIST.children[0].offsetWidth + margin;
      shift = -newIndex * itemWidth;
      LIST.style.transform = `translate(${shift}px)`;
      pannel
        .querySelector(".swiper-pagination--active")
        .classList.remove("swiper-pagination--active");
      target.classList.add("swiper-pagination--active");
    }
  });

  swiping(btnPrevious, btnNext, pannel);

  LIST.parentElement.appendChild(pannel);
  LIST.parentElement.appendChild(btnPrevious);
  LIST.parentElement.appendChild(btnNext);
} else {
  let btnShowList = makeElement("button", "srv__show");
  let arrow = makeElement("div", ["srv__show--arrow", "about__check-box"]);
  let textBtn = makeElement("span", "srv__show--text", "Показать все");

  btnShowList.appendChild(arrow);
  btnShowList.appendChild(textBtn);
  SECTION.appendChild(btnShowList);

  btnShowList.addEventListener("click", () => {
    let arrow = btnShowList.querySelector(".srv__show--arrow");
    let textBtn = btnShowList.querySelector(".srv__show--text");
    textBtn.textContent = "Показать все";

    if (!LIST.classList.contains("srv__list--show-all")) {
      textBtn.textContent = "Скрыть";
    }

    LIST.classList.toggle("srv__list--show-all");
    arrow.classList.toggle("srv__show--arrow--rotate");
  });
}
