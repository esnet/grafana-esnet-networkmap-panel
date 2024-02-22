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
export function getElementText(el) {
	var text = '';
    const supportedTagSelectors = ['img', 'area', 'input[type="image"]', 'svg'];
    const a11yAttributes = ['aria-labelledby', 'aria-label', 'alt', 'title'];
	// Text node (3) or CDATA node (4) - return its text
	if (el.nodeType === 3 || el.nodeType === 4) {
		text = el.nodeValue || '';
	// If node is an element (1) and an <img>, <svg>, <input type="image">, or <area> element, return its a11y text
	} else if (el.nodeType === 1 && (supportedTagSelectors.find(selector => el.matches(selector)))) {
    text = a11yAttributes.reduce((acc, attributeName) => {
        if (!!acc) {
            return acc;
        } else if (el.hasAttribute(attributeName)) {
            acc = el.getAttribute(attributeName) || '';
        }
        return acc;
    }, '');
	// Traverse children unless this is a script or style element
	} else if ( (el.nodeType === 1) && !el.tagName.match(/^(script|style)$/i) ) {
		var children = el.childNodes;
		for (var i = 0, l = children.length; i < l; i++) {
			text += getElementText(children[i]);
		}
	}
	return text;
};