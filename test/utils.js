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

/**
 * Returns a new string based on inStr but removes any sequential repeats of a specified targetStr by 1.
 * Single occurances of targetStr are removed.
 *
 * @param {String} inStr    		The string to modify
 * @param {String} target			Optional. The string to match for repeats and alter by reducing the repeated occurance by one.
 * 									By default, the targetStr will match all occurances of whitespace at the end or start of
 * 									inStr and remove them (functionally equivolanet to String.trim()).
 * @param {boolean} limitToTwo  	Optional. By default, all repetitions in a sequence are taken into account when reducing the
 * 									repeat by one. Set to true to limit such considerations to two repetitions, such as when
 * 									dealing with paired characters like single or double quotes.
 * @returns {String}
 */
export function removeRepeats(inStr, target = ' ', limitToTwo = false) {
	const inStrLen = inStr.length;
	let acc = [];
	for (let i = 0; i < inStrLen - 1; i++) {
		let currChar = inStr[i];
		let nextChar;
		if (i + 1 < inStrLen) {
			nextChar = inStr[i + 1];
		} else {
			nextChar = null;
		}

		if (currChar === target) {
			let iterationCount = Number.MAX_VALUE; 	// no limit
			if (limitToTwo) {
				iterationCount = 1;
			}
			while (nextChar === target && nextChar !== null && iterationCount > 0) {
				if (iterationCount > 0) {
					iterationCount--;
				}
				// deliberely skip pushing current char and push next char on accumulator
				acc.push(nextChar);
				i++;
				currChar = nextChar;
				if (i + 1 < inStrLen) {
					nextChar = inStr[i + 1];
				} else {
					nextChar = null;
				}
			}
		} else {
			acc.push(currChar);
		}
	}
	return acc.join("");
}