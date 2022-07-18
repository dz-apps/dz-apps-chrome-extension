const optOutWords = ["musk", "elon"];
const elementSelectors = {
  digg: "article",
  reddit: '[data-testid="post-container"], [id^=Carousel]',
};

// Trigger on first DOM idle
requestIdleCallback(() => findAndHideDOMEls());

// Trigger on subsequent data fetches
let oldXHROpen = window.XMLHttpRequest.prototype.open;
window.XMLHttpRequest.prototype.open = function (method, url) {
  this.addEventListener("load", function () {
    findAndHideDOMEls();
  });

  return oldXHROpen.apply(this, arguments);
};

// Find/Hide containers with text matching optOutWords
const findAndHideDOMEls = () => {
  console.log("FINDING AND REPLACING");
  const els = document.querySelectorAll(
    Object.values(elementSelectors).join(", ")
  );
  els.forEach((el) => {
    if (
      optOutWords.some((word) => el.innerText?.toLowerCase().includes(word))
    ) {
      el.style.display = "none";
      console.log("Hiding: ", el.innerText);
    }
  });
};
