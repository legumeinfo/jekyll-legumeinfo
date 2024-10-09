/**
 * Used to descend nested bins; given a key, sets the default value for the key if it's not present, and then returns the value for the key.
 * @param {object} bin - An object object serving as the current bin.
 * @param {string} key - The key whoe value should be returned (and to possibly set the default value for in the bin).
 * @param {inknown} defaultValue - The default value to assign the key in the bin if the key is not present.
 * @returns {unknown} The value for the given in key in the given bin.
 */
export function nextBin(bin, key, defaultValue) {
  if (!(key in bin)) {
    bin[key] = defaultValue;
  }
  return bin[key];
}


/**
 * Encodes content in a file with the given filename and then triggers a download of the file.
 * @param {string} filename - The name of the file to be created and downloaded.
 * @param {string} content - The content to put in the created file.
 */
export function downloadFile(filename, content) {
  // create the file
  const file = new File(["\ufeff"+content], filename, {type: "text/plain:charset=UTF-8"});
  // create a ObjectURL for downloading the file
  const url = window.URL.createObjectURL(file);
  // create a hidden link and set the href to the file URL
  const link = document.createElement("a");
  link.style = "display: none";
  link.href = url;
  link.download = file.name;
  // "click" the hidden link
  link.click();
  // clean up
  link.remove();
  window.URL.revokeObjectURL(url);
}
