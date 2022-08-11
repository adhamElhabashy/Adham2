// show setting box onclick on cog icon
document.querySelector(".fa-cog").onclick = function () {
  document.querySelector(".setting-box").classList.toggle("open");
  document.querySelector(".fa-cog").classList.toggle("fa-spin");
};

// // // // // // // // // // // // // // //  // // // // //  // // // //
// switch colors
let colorli = Array.from(document.querySelectorAll(".color-list li"));
colorli.forEach((li) => {
  // add click event
  li.addEventListener("click", function (e) {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    // remove and add active class after click
    handleActive(e);
    // set color in localstorage
    window.localStorage.setItem("color", e.target.dataset.color);
  });
});
// // // // // // // // // // // // // // //  // // // // //  // // // //
// localStorage colors
if (window.localStorage.getItem("color")) {
  // set color property from localStorage
  document.documentElement.style.setProperty(
    "--main-color",
    window.localStorage.getItem("color")
  );
  // remove and add active class from localStorage
  colorli.forEach((li) => {
    li.classList.remove("active");
    if (li.dataset.color === window.localStorage.getItem("color")) {
      li.classList.add("active");
    }
  });
}
// // // // // // // // // // // // // // //  // // // // //  // // // //
if (window.localStorage.getItem("bullets-option")) {
  document.querySelector(".bullets-box").style.display =
    window.localStorage.getItem("bullets-option");
  document.querySelectorAll(".bulletso span").forEach((span) => {
    span.classList.remove("active");
  });
  if (window.localStorage.getItem("bullets-option") === "block") {
    document.querySelector(".bulletso .yes").classList.add("active");
  } else {
    document.querySelector(".bulletso .no").classList.add("active");
  }
}
// // // // // // // // // // // // // // //  // // // // //  // // // //

let random = true;
let counterOne;
// // // // // // // // // // // // //
let randombackselements = document.querySelectorAll(".random-backgrounds span");

// localStorage backgrounds
if (window.localStorage.getItem("randoms")) {
  if (window.localStorage.getItem("randoms") === "true") {
    random = true;
  } else {
    random = false;
  }
  randombackselements.forEach((span) => {
    span.classList.remove("active");
  });
  if (window.localStorage.getItem("randoms") === "true") {
    document.querySelector(".yes").classList.add("active");
  } else {
    document.querySelector(".no").classList.add("active");
  }
} else {
}
// // // // // // // // // // // // // // //  // // // // //  // // // //
// loop on random backgrounds Elements
let caseE = "yes";
randombackselements.forEach((span) => {
  // add onclick event
  span.addEventListener("click", function (e) {
    // remove and add active class
    handleActive(e);
    // set the random background option
    if (e.target.dataset.background === "yes") {
      random = true;
      setBackgrounds();
      window.localStorage.setItem("randoms", true);
    } else {
      random = false;
      clearInterval(counterOne);
      window.localStorage.setItem("randoms", false);
    }
  });
});
// // // // // // // // // // // // // // //  // // // // //  // // // //

// random backgrounds in landing page
function setBackgrounds() {
  if (random === true) {
    counterOne = setInterval(() => {
      let imagesArray = [
        "image1.jpg",
        "image2.jpg",
        "image3.jpg",
        "image4.jpg",
        "image5.jpg",
      ];
      let randomNumber = Math.floor(Math.random() * imagesArray.length);
      document.querySelector(
        ".landing-page"
      ).style.backgroundImage = `url("images/${imagesArray[randomNumber]}")`;
    }, 5000);
  } else {
    clearInterval(counterOne);
  }
}
setBackgrounds();
// // // // // // // // // // // // // // //  // // // // //  // // // //
// animate span width on skills section
window.onscroll = function () {
  console.log(window.scrollY);
};
// on scroll event
window.onscroll = function () {
  let skillsSection = document.querySelector(".skills");
  let skillsOffSet = skillsSection.offsetTop;
  let skillsOuter = skillsSection.offsetHeight;
  if (
    window.pageYOffset >
    skillsOffSet + skillsOuter - this.innerHeight - 100
  ) {
    document.querySelectorAll(".skill-progress span").forEach((span) => {
      span.style.width = `${span.dataset.width}`;
    });
  }
};
// // // // // // // // // // // // // // //  // // // // //  // // // //
// image popup in gallery
// select the images
let images = Array.from(document.querySelectorAll(".gallery img"));
// on click event with forEach
images.forEach((img) => {
  img.addEventListener("click", function () {
    // create overlay
    let overlay = document.createElement("div");

    // add class to overlay
    overlay.className = "popup-overlay";

    // append overlay to body
    document.body.appendChild(overlay);
    // main div
    let mainDiv = document.createElement("div");
    mainDiv.className = "popup-box";
    // divContent
    // // // // // // // // // // // // // // // // // // // // // // // //
    // h3                                                                //
    let h3 = document.createElement("h3");
    // condition to know h3 text
    if (img.getAttribute("alt")) {
      h3.appendChild(document.createTextNode(img.getAttribute("alt"))); //
    } else {
      h3.appendChild(document.createTextNode(images.indexOf(img)));
    } //
    let btn = document.createElement("button");
    let btnText = document.createTextNode("X"); //
    btn.appendChild(btnText); //
    // append h3 to mainDiv
    mainDiv.appendChild(h3); //
    // create img
    let popupImage = document.createElement("img"); //
    //
    popupImage.setAttribute("src", img.getAttribute("src")); //
    // append img to mainDiv
    mainDiv.appendChild(popupImage); //
    // append delete button
    mainDiv.appendChild(btn);
    btn.className = "btn"; //
    // onclick event to delete button
    btn.addEventListener("click", function (e) {
      btn.parentElement.remove(); //
      overlay.remove();
    }); //
    // append mainDiv to body and stylling                              //
    document.querySelector(".gallery").appendChild(mainDiv);
    popupImage.style.cssText = "width: 100%";
  });
});
// // // // // // // // // // // // // // // // // // // // // // // //
// make the link in testimonials change the divs by preventDefualt
let i = document.querySelectorAll(".testimonials i").forEach((i) => {
  let boxs = Array.from(document.querySelectorAll(".testimonials .ts-box"));
  i.addEventListener("click", function (e) {
    if (e.target.classList.contains("fa-angle-right")) {
      let activeBox = "";
      let i = 0;
      for (; i < boxs.length; i++) {
        if (boxs[i].classList.contains("active")) {
          activeBox = boxs[i];
        }
        boxs[i].classList.remove("active");
      }
      if (boxs[boxs.indexOf(activeBox) + 1] !== undefined) {
        boxs[boxs.indexOf(activeBox) + 1].classList.add("active");
      } else {
        boxs[boxs.indexOf(activeBox)].classList.add("active");
      }
    } else {
      let activeBox = "";
      let i = 0;
      for (; i < boxs.length; i++) {
        if (boxs[i].classList.contains("active")) {
          activeBox = boxs[i];
        }
        boxs[i].classList.remove("active");
      }
      if (boxs[boxs.indexOf(activeBox) - 1] !== undefined) {
        boxs[boxs.indexOf(activeBox) - 1].classList.add("active");
        activeBox = boxs[boxs.indexOf(activeBox) - 1];
        activeBox.style.cssText = "";
      } else {
        boxs[boxs.indexOf(activeBox)].classList.add("active");
      }
    }
  });
});
// // // // // // // // // // // // // // // // // // // // // // // //
// make navigation bullets
// loop on bullets to add event onClick
function scrollTo(links) {
  links.forEach((link) => {
    // add the event
    link.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
scrollTo(Array.from(document.querySelectorAll(".bullets-box .bullet")));
scrollTo(Array.from(document.querySelectorAll(".links a")));
// // // // // // // // // // // // // // // // // // // // // // // //
// handle active function
function handleActive(ev) {
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  ev.target.classList.add("active");
}
document.querySelectorAll(".bulletso span").forEach((span) => {
  span.addEventListener("click", function (e) {
    handleActive(e);

    if (span.dataset.display === "yes") {
      document.querySelector(".bullets-box").style.display = "block";
      window.localStorage.setItem("bullets-option", "block");
    } else {
      document.querySelector(".bullets-box").style.display = "none";
      window.localStorage.setItem("bullets-option", "none");
    }
  });
});
// // // // // // // // // // // // // // // // // // // // // // // //
// make button to reset options
document
  .querySelector(".setting-container .reset-options")
  .addEventListener("click", (e) => {
    window.localStorage.removeItem("color");
    window.localStorage.removeItem("randoms");
    window.localStorage.removeItem("bullets-option");
    window.location.reload();
  });
// // // // // // // // // // // // // // // // // // // // // // // //
// arrow of contact
Array.from(document.querySelectorAll(".contact .left i")).forEach((i) => {
  let activeBoxI = "";
  let inputs = Array.from(document.querySelectorAll(".left input"));
  i.addEventListener("click", function (e) {
    Array.from(document.querySelectorAll(".left input.active")).forEach(
      (input) => {
        activeBoxI = input;
        input.classList.remove("active");
      }
    );
    if (e.target.dataset.task === "up") {
      if (inputs[inputs.indexOf(activeBoxI) - 1] !== undefined) {
        inputs[inputs.indexOf(activeBoxI) - 1].classList.add("active");
        inputs[inputs.indexOf(activeBoxI) - 1].focus();
        inputs[inputs.indexOf(activeBoxI) - 1].removeAttribute("readonly");
      } else {
        inputs[inputs.indexOf(activeBoxI)].classList.add("active");
      }
    } else {
      if (inputs[inputs.indexOf(activeBoxI) + 1] !== undefined) {
        inputs[inputs.indexOf(activeBoxI) + 1].classList.add("active");
        inputs[inputs.indexOf(activeBoxI) + 1].focus();
        inputs[inputs.indexOf(activeBoxI) + 1].removeAttribute("readonly");
      } else {
        inputs[inputs.indexOf(activeBoxI)].classList.add("active");
      }
    }
    inputs.forEach((input) => {
      if (input.classList.contains("active") === false) {
        input.setAttribute("readonly", "");
      }
    });
  });
});
document.querySelectorAll("input[readonly]").forEach((input) => {
  input.addEventListener("focus", function (e) {
    e.preventDefault();
  });
});
// // // // // // // // // // // // // // // // // // // // // // // //
// make the menu icon show the menu
document
  .querySelector(".header .links-container .toggle-menu")
  .addEventListener("click", function (e) {
    e.stopPropagation();
    document
      .querySelector(".header .links-container .links")
      .classList.toggle("open");
    this.classList.toggle("menu-open");
  });
// // // // // // // // // // // // // // // // // // // // // // // //
// make any touch remove the menu
document.addEventListener("click", function (e) {
  if (
    e.target !==
      document.querySelector(".header .links-container .toggle-menu") &&
    e.target !== document.querySelector(".header .links-container .links")
  ) {
    if (
      document
        .querySelector(".header .links-container .links")
        .classList.contains("open")
    ) {
      document
        .querySelector(".header .links-container .toggle-menu")
        .classList.toggle("menu-open");
      document
        .querySelector(".header .links-container .links")
        .classList.toggle("open");
    }
  }
});
document.querySelector(".header .links-container .links").onclick = function (
  e
) {
  e.stopPropagation();
};
