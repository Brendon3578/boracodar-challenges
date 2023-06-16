const hslRegex = /[ ]|[\t]|[\n]|[\r]/gi;

// extract from https://www.html-code-generator.com/javascript/color-converter-script
function hslToHex(hsl) {
  /* esse código abaixo é para resolver o problema do código de não suportar
    valores que contenham quebra de linhas, recuos, e tabulações (\n,\t,\r)
    e remover esses caracteres especiais
    */
  hsl = hsl.replaceAll(hslRegex, "").replaceAll(",", ", ");

  hsl = hsl.match(
    /^hsla?\(\s?(\d+)(?:deg)?,?\s(\d+)%,?\s(\d+)%,?\s?(?:\/\s?\d+%|\s+[\d+]?\.?\d+)?\)$/i
  );
  if (!hsl) {
    console.log("O seguinte valor HSL deu errado:", hsl);
    return null;
  }

  let h = hsl[1];
  let s = hsl[2];
  let l = hsl[3];
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = function (p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  const toHex = function (x) {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return "#" + toHex(r) + toHex(g) + toHex(b);
}

function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}
