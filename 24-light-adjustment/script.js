const rootEl = document.querySelector(":root");

function setCssVariable(cssVariable, value) {
  rootEl.style.setProperty(cssVariable, value);
}

const setHslCssColor = {
  hue(value) {
    setCssVariable("--hsl-hue", value);
  },
  saturation(value) {
    setCssVariable("--hsl-saturation", `${value}%`);
  },
  lightness(value) {
    setCssVariable("--hsl-lightness", `${value}%`);
  },
};

function getHSLShadeColor(shade) {
  return getComputedStyle(rootEl).getPropertyValue(
    `--hsl-current-color-${shade}`
  );
}

const hslRangeInputsEls = document.querySelectorAll("[data-hsl]");
hslRangeInputsEls.forEach((rangeInput) => {
  rangeInput.addEventListener("input", (e) => {
    let selectedHSLProperty = rangeInput.dataset.hsl;
    let currentHSLPropertyValue = e.target.value;

    debounce(() => setHexadecimalColorShadesText(), 500)();
    setHslCssColor[selectedHSLProperty](currentHSLPropertyValue);
  });
});

// create colors hexadecimal pallete
const shadesColorsEls = document.querySelectorAll("[data-color-shades]");

function setHexadecimalColorShadesText() {
  shadesColorsEls.forEach((shadeColorEl) => {
    let shade = shadeColorEl.dataset.colorShades;
    hexColor = getHSLShadeColor(shade);
    // console.log(hslToHex(hexColor));
    shadeColorEl.children[0].textContent = hslToHex(hexColor);
  });
}

shadesColorsEls.forEach((el) =>
  el.addEventListener("click", () => {
    let hexDecimalSpanEl = el.children[0];

    // Copy the text inside the text field
    navigator.clipboard.writeText(hexDecimalSpanEl.textContent);

    // Alert the copied text
    alert(
      "Foi copiado a seguinte cor, no valor de hexadecimal: " +
        hexDecimalSpanEl.textContent
    );
  })
);

// adicionar os valores de hexadecimal na paleta de cores dentro do elemento span
setHexadecimalColorShadesText();
