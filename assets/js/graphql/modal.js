/**
 * Creates a link with the given `data` attributes that opens a modal with the given `modalId`.
 * @param {string} modalId - The HTML `id` of the target modal element.
 * @param {string} text - The text of the link.
 * @param {object} data - The data attributes to add to the link.
 * @returns {string} The created link.
 */
export function modalLink(modalId, text, data={}) {
  const dataAttrs =
    Object.entries(data)
      .map(([key, value]) => `data-${key}="${value}"`)
      .join(' ');
  return `<a href="#${modalId}" ${dataAttrs} uk-toggle>${text}</a>`;
}


/**
 * Extracts the `data` embedded by `modalLink` from the given modal `event`.
 * @param {Event} event - The modal event to extract data from.
 * @returns {object} The data extracted from the event.
 */
export function modalEventToLinkData(event) {
  const [{$el: link}, ...uikitComponents] = event.detail;
  return link.dataset;
}
