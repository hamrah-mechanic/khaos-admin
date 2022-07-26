export const stringfyObject = o => {
  Object.keys(o).forEach(k => {
    if (typeof o[k] === 'object') {
      return stringfyObject(o[k]);
    }

    o[k] = '' + o[k];
  });

  return o;
};
