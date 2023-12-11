//@ts-nocheck
/**
 * Parses the color object and returns the corresponding RGB value.
 * @param color - The color object to parse.
 * @returns  The RGB value of the color.
 */
const expColorObjectParser = (color: any) => {
  return typeof color === 'string'
    ? hexToRGB(JSON.parse(color)?.value)
    : hexToRGB(color?.value);
};

function hexToRGB(color: any) {
  if (color) {
    color = color?.replace('#', '');
    if (color.length === 3) {
      color = color?.replace(/(.)/g, '$1$1');
    }

    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);

    let alpha;
    if (color.length === 8) {
      color = color?.replace(/(.)/g, '$1$1');
      alpha = parseInt(color.substring(6, 8), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    return `rgb(${r}, ${g}, ${b})`;
  } else return 'rgb(0,0,0)';
}

export { expColorObjectParser };
