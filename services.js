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

let titleTechniqueName = [
  "Ремонт ноутбуков",
  "Ремонт планшетов",
  "Ремонт ПК",
  "Ремонт мониторов",
  "Ремонт телефонов",
  "Ремонт геймпадов",
  "Ремонт телевизоров",
];

const SOURCE = [srcImage, titleTechniqueName];
let elemOffset = new Array(SOURCE.length).fill(0)

// const SECTION = document.querySelector(".srv");
const LIST = document.querySelector(".srv__list");
const LIST2 = document.querySelectorAll(".srv__list")[1];
const LIST_COMMON = document.querySelectorAll(".srv__list");
const TEMPLATE_BRAND = document.querySelector("#brand-template");
const TEMPLATE_TECHNIQUE = document.querySelector("#technique-template");
const TEMPLATE_PRICE = document.querySelector("#price-template");
let btnShowList = document.querySelector(".srv__show");
// let shift = 0;

for (let i = 0; i < srcImage.length; i++) {
  let clone = TEMPLATE_BRAND.content.cloneNode(true);
  clone.querySelector("img").src = "public/img/" + `${srcImage[i]}.png`;
  clone.querySelector("img").srcset = "public/img/" + `${srcImage[i]}.svg`;
  LIST.appendChild(clone);
}

for (let i = 0; i < titleTechniqueName.length; i++) {
  let clone = TEMPLATE_TECHNIQUE.content.cloneNode(true);
  clone.querySelector(".srv__title").textContent = titleTechniqueName[i];
  LIST2.appendChild(clone);
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

let pannelClick = function (pannel, elementTransform, index) {
  pannel.addEventListener("click", function (evt) {
    let target = evt.target;
    let newIndex = target.dataset.index;
    if (target.classList.contains("swiper-pagination")) {
      let margin = +getComputedStyle(elementTransform.children[0]).marginRight.split(
        "px"
      )[0];
      let itemWidth = +elementTransform.children[0].offsetWidth + margin;
      elemOffset[index] = -newIndex * itemWidth;
      elementTransform.style.transform = `translate(${elemOffset[index]}px)`;
      pannel
        .querySelector(".swiper-pagination--active")
        .classList.remove("swiper-pagination--active");
      target.classList.add("swiper-pagination--active");
    }
  });
};

let makePaginationPannel = function (paginationCount) {
  let pannel = makeElement("div", "swiper-pannel");

  for (let i = 0; i < paginationCount.length; i++) {
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


  return pannel;
};


let swiping = function (btnPrevious, btnNext, pannel, elementTransform, index) {
  let margin = +getComputedStyle(elementTransform.children[0]).marginRight.split("px")[0];
  let itemWidth = +elementTransform.children[0].offsetWidth + margin;

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
    if (elemOffset[index] > (srcImage.length - 1) * -itemWidth) {
      elemOffset[index] -= itemWidth;
      let sign = 1;
      paginationIsActive(sign);
    }
    elementTransform.style.transform = `translate(${elemOffset[index]}px)`;
  });

  btnPrevious.addEventListener("click", function (e) {
    if (elemOffset[index] < 0) {
      elemOffset[index] += itemWidth;
      let sign = -1;
      paginationIsActive(sign);
    }
    elementTransform.style.transform = `translate(${elemOffset[index]}px)`;
  });
};

let btnListener = function (btn, elementShow) {
  btn.addEventListener("click", () => {
    let arrow = btn.querySelector(".srv__show--arrow");
    let textBtn = btn.querySelector(".srv__show--text");
    textBtn.textContent = "Показать все";

    if (!elementShow.classList.contains("srv__list--show-all")) {
      textBtn.textContent = "Скрыть";
    }

    elementShow.classList.toggle("srv__list--show-all");
    arrow.classList.toggle("srv__show--arrow--rotate");
  });
};

if (window.innerWidth < 330) {
  LIST_COMMON.forEach((list, index) => {
    let pannel = makePaginationPannel(SOURCE[index]);
    pannelClick(pannel, list, index);
    
    let btnPrevious = makeElement("div", "swiper-button-prev");
    let btnNext = makeElement("div", "swiper-button-next");

    swiping(btnPrevious, btnNext, pannel, list, index);

    list.parentElement.appendChild(pannel);
    list.parentElement.appendChild(btnPrevious);
    list.parentElement.appendChild(btnNext);
  });

} else {
  LIST_COMMON.forEach((list) => {
    let btnShowList = makeElement("button", "srv__show");
    let arrow = makeElement("div", ["srv__show--arrow", "about__check-box"]);
    let textBtn = makeElement("span", "srv__show--text", "Показать все");

    btnShowList.appendChild(arrow);
    btnShowList.appendChild(textBtn);

    list.closest(".srv").appendChild(btnShowList);

    btnListener(btnShowList, list);
  });
}
