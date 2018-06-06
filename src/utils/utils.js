const removeNonprintableChars = (s) => {
  return s.replace(/[^\x20-\x7E]+/g, '');
};

const removeSpaces = (s) => {
  return s.replace(/^\s+|\s+$/g,'');
};

export { removeSpaces, removeNonprintableChars };
