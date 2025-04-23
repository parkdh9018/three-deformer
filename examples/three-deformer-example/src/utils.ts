export const capitalizeFirstLetter = (str: string) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : '';

export const lowercaseFirstLetter = (str: string): string =>
  str.charAt(0).toLowerCase() + str.slice(1);
