/**
 * Converts a string to Title Case.
 * Capitalizes the first letter of each word.
 * @param {string} str The input string.
 * @returns {string} The string in Title Case.
 */
export const toTitleCase = (str) => {
    if (typeof str !== 'string' || str === null) {
        return '';
    }
    return str
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

/**
 * Converts a string to Sentence Case, handling multiple sentences within a paragraph.
 * Capitalizes the first letter of each sentence and lowercases the rest of the string,
 * except for characters immediately following sentence-ending punctuation (., !, ?).
 *
 * @param {string} str The input string.
 * @returns {string} The string in Sentence Case.
 */
export const toSentenceCase = (str) => {
    if (typeof str !== 'string' || str === null) {
        return ''; // Return empty string for non-string or null input
    }

    // 1. Trim leading/trailing whitespace from the entire string.
    let formattedStr = str.trim();

    // Handle empty string after trimming
    if (formattedStr.length === 0) {
        return '';
    }

    // 2. Convert the entire string to lowercase first for consistent processing.
    formattedStr = formattedStr.toLowerCase();

    // 3. Flag to determine if the next alphabetic character should be capitalized.
    //    It starts as true because the very first character of the string should be capitalized.
    let capitalizeNext = true;

    // 4. Iterate through each character of the string.
    for (let i = 0; i < formattedStr.length; i++) {
        const char = formattedStr[i];

        // If `capitalizeNext` is true and the current character is an alphabet (a-z):
        if (capitalizeNext && /[a-z]/.test(char)) {
            // Capitalize the current character and rebuild the string.
            formattedStr = formattedStr.substring(0, i) + char.toUpperCase() + formattedStr.substring(i + 1);
            capitalizeNext = false; // Reset the flag, as we've capitalized the character.
        }
        // If the current character is a sentence-ending punctuation (period, exclamation, question mark):
        else if (/[.!?]/.test(char)) {
            // Set the flag to true, indicating that the next alphabetic character encountered should be capitalized.
            capitalizeNext = true;
        }
        // If it's not an alphabet and not punctuation, and we're still waiting to capitalize (e.g., a space after punctuation),
        // we just continue, `capitalizeNext` remains true.
    }

    return formattedStr;
};

/**
 * Converts a string to UPPERCASE.
 * @param {string} str The input string.
 * @returns {string} The string in UPPERCASE.
 */
export const toUpperCase = (str) => {
    if (typeof str !== 'string' || str === null) {
        return ''; // Return empty string for non-string or null input
    }
    return str.toUpperCase();
};