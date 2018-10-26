export interface RgbColor {
  alpha: number;
  blue: number;
  green: number;
  red: number;
}

export interface HslColor {
  alpha: number;
  hue: number;
  lightness: number;
  saturation: number;
}

export interface HsvColor {
  hue: number;
  saturation: number;
  value: number;
  alpha: number;
}

function decompose({ red, green, blue, alpha }: RgbColor) {
  return {
    max: Math.max(red, green, blue),
    min: Math.min(red, green, blue),
    red: red / 255,
    green: green / 255,
    blue: blue / 255,
    alpha,
  };
}

export function defaultColor(): RgbColor {
  return {
    alpha: 1,
    blue: 255,
    green: 255,
    red: 255,
  };
}

export function isColor(value: any): value is RgbColor {
  return (
    typeof value === 'object' &&
    typeof value.alpha === 'number' &&
    typeof value.blue === 'number' &&
    typeof value.green === 'number' &&
    typeof value.red === 'number'
  );
}

export function hexToRgb(hex: string): RgbColor | null {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        red: parseInt(result[1], 16),
        green: parseInt(result[2], 16),
        blue: parseInt(result[3], 16),
        alpha: 1,
      }
    : null;
}

export function hsvToRgb({
  alpha,
  hue,
  saturation,
  value,
}: HsvColor): RgbColor {
  let red: number = 0;
  let green: number = 0;
  let blue: number = 0;

  const i = Math.floor(hue * 6);
  const f = hue * 6 - i;
  const p = value * (1 - saturation);
  const q = value * (1 - f * saturation);
  const t = value * (1 - (1 - f) * saturation);

  switch (i % 6) {
    case 0:
      red = value;
      green = t;
      blue = p;
      break;
    case 1:
      red = q;
      green = value;
      blue = p;
      break;
    case 2:
      red = p;
      green = value;
      blue = t;
      break;
    case 3:
      red = p;
      green = q;
      blue = value;
      break;
    case 4:
      red = t;
      green = p;
      blue = value;
      break;
    case 5:
      red = value;
      green = p;
      blue = q;
      break;
  }

  return {
    alpha,
    red: Math.round(red * 255),
    green: Math.round(green * 255),
    blue: Math.round(blue * 255),
  };
}

export function rgbToCss(color: RgbColor): string {
  return `rgba(${color.red},${color.green},${color.blue},${color.alpha})`;
}

export function rgbToHex(color: RgbColor): string {
  const rgb = color.blue | (color.green << 8) | (color.red << 16);
  return '#' + (0x1000000 + rgb).toString(16).slice(1);
}

export function rgbToHsl(color: RgbColor): HslColor {
  const { alpha, blue, green, max, min, red } = decompose(color);
  const lightness = (max + min) / 510;
  const diff = max - min;
  const saturation =
    lightness > 0.5 ? diff / (2 - max - min) : diff / (max + min);
  let hue: number = 0;

  if (max === min) {
    return { hue, saturation, lightness, alpha };
  }

  if (max === color.red) {
    hue = (green - blue) / diff + (green < blue ? 6 : 0);
  } else if (max === color.green) {
    hue = (blue - red) / diff + 2;
  } else {
    hue = (red - green) / diff + 4;
  }

  hue /= 6;
  return { hue, saturation, lightness, alpha };
}

export function rgbToHsv(color: RgbColor): HsvColor {
  const { alpha, blue, green, max, min, red } = decompose(color);
  const saturation = max === 0 ? 0 : (max - min) / max;
  const diff = (max - min) / 255;
  let hue = 0;
  let value = max / 255;

  if (max === min) {
    return { hue, saturation, value, alpha };
  }

  if (max === color.red) {
    hue = (green - blue) / diff + (green < blue ? 6 : 0);
  } else if (max === color.green) {
    hue = (blue - red) / diff + 2;
  } else {
    hue = (red - green) / diff + 4;
  }

  hue /= 6;
  return { hue, saturation, value, alpha };
}
