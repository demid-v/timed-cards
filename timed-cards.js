const carousel = document.getElementById("carousel");
const containerEls = Array.from(document.getElementsByClassName("container"));

const classes = containerEls
  .map((el) => {
    return el.className.match(/c-\d/g)[0];
  })
  .reduce((acc, elClass, index, classes) => {
    acc[elClass] = classes[index - 1] || classes[classes.length - 1];
    return acc;
  }, {});
classes["c-1"] = "c-0";
classes["c-0"] = "c-6";

const changeClass = (el) => {
  const match = el.className.match(/c-\d/g)[0];
  el.classList.remove(match);
  el.classList.add(classes[match]);
};

const changeClasses = async (container) => {
  for (let i = 0; i < container.length; i++) {
    changeClass(container[i]);
  }
};

const rotate = (object) => {
  var container = object;

  if (container instanceof Event) {
    container = [container.target];

    carousel.appendChild(container[0]);
    var lastEl = containerEls.shift();
    containerEls.push(lastEl);
  }

  changeClasses(container);
  lastEl?.removeEventListener("transitionend", rotate);
};

var carouselAnimation;

const carouselAnimationFunc = () => {
  carouselAnimation = setInterval(() => {
    changeClasses(containerEls);
    containerEls[0].addEventListener("transitionend", rotate);
  }, 3000);
};
carouselAnimationFunc();

function visibilityListener() {
  switch (document.visibilityState) {
    case "hidden":
      clearInterval(carouselAnimation);
      break;
    case "visible":
      carouselAnimationFunc();
      break;
  }
}

document.addEventListener("visibilitychange", visibilityListener);
