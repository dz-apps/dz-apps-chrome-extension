const replacements = [
  // Plural
  {
    search: ["democrats", "republicans", "conservatives", "progressives"],
    replace: "Gov. Officials", // Source this from user option!,
  },
  // Singular
  {
    search: [
      "democrat",
      "republican",
      "GOP",
      "left-wing",
      "right-wing",
      "progressive",
      "conservative",
    ],
    replace: "US Government", // Source this from user option!,
  },
];

window.onload = () => findAndReplaceDOMEls(replacements);

// TODO: need a good general purpose trigger when more content is loaded
let oldXHROpen = window.XMLHttpRequest.prototype.open;
window.XMLHttpRequest.prototype.open = function (method, url) {
  this.addEventListener("load", function () {
    findAndReplaceDOMEls();
  });

  return oldXHROpen.apply(this, arguments);
};
