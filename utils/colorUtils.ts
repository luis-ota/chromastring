export const stringToHex = (str: string): string => {
  if (!str) return '#e2e8f0'; // Default slate-200
  
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xFF;
    color += ('00' + value.toString(16)).substr(-2);
  }
  return color;
};

export const getContrastColor = (hexcolor: string): string => {
  if (!/^#([A-Fa-f0-9]{3}){1,2}$/.test(hexcolor)) return '#000000';

  let r = 0, g = 0, b = 0;
  
  if (hexcolor.length === 4) {
    r = parseInt(hexcolor.substr(1, 1) + hexcolor.substr(1, 1), 16);
    g = parseInt(hexcolor.substr(2, 1) + hexcolor.substr(2, 1), 16);
    b = parseInt(hexcolor.substr(3, 1) + hexcolor.substr(3, 1), 16);
  } 
  else {
    r = parseInt(hexcolor.substr(1, 2), 16);
    g = parseInt(hexcolor.substr(3, 2), 16);
    b = parseInt(hexcolor.substr(5, 2), 16);
  }

  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return yiq >= 128 ? '#000000' : '#ffffff';
};

export const hexToRgbString = (hex: string): string => {
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
      r = parseInt(hex.substring(1, 3), 16);
      g = parseInt(hex.substring(3, 5), 16);
      b = parseInt(hex.substring(5, 7), 16);
    }
    return `${r}, ${g}, ${b}`;
  }