//@ts-nocheck
/**
 * Decodes HTML entities in a given text.
 * @param text - The text containing HTML entities to be decoded.
 * @returns Decoded text without HTML entities.
 */
function decodeHTMLEntities(text: any) {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
}

export default decodeHTMLEntities;
