// stringUtils.js
export function validateStringValue(str) {
  if (typeof str !== "string") {
    throw new TypeError("Input must be a string");
  }
  // Trim leading and trailing whitespace
  let trimmedStr = str.trim();
  // Replace multiple spaces with a single space
  let singleSpacedStr = trimmedStr.replace(/\s+/g, " ");
  return singleSpacedStr;
}
