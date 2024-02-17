export function getUrlSearchParams(): {};
export function testJsonSchema(data: any): (string | true)[] | (string | false)[];
export function resolvePath(object: any, path: any, defaultValue?: null): any;
export function setPath(object: any, path: any, newValue: any): void;
/**
 * Returns the text content of an element and its descendents, including A11y text that would otherwise be hidden.
 *
 * Script elements are entirely omitted. Graphical and form elements represented in tags <img>, <area>, <svg>,
 * or <input> (with attribute type="image") are omitted except where attributes (in order of preference) aria-labelledby,
 * aria-label, alt, or title are set to non-empty values.
 *
 * Adapted from implementation on 456 Berea Street, see link below.
 *
 * @param {Element} el                  The target element to render text from.
 * @returns {string} The text contnet of the element and its children.
 * @see {@link https://www.456bereastreet.com/archive/201105/get_element_text_including_alt_text_for_images_with_javascript/ Roger Johanssonu's 456 Berea Street}
 */
export function getElementText(el: Element): string;
export const LAYER_LIMIT: 3;
//# sourceMappingURL=utils.d.ts.map