import React from 'react';

/**
 * Highlights the parts of the given text that match the query.
 *
 * @param {string} text - The text to be searched.
 * @param {string} query - The search query.
 * @returns {Array} An array of React elements with matching parts highlighted.
 */
export function highlightText(text, query) {
  if (!query.trim()) return text;
  
  const regex = new RegExp(`(${query})`, 'gi');
  const parts = text.split(regex);
  
  return parts.map((part, index) =>
    regex.test(part) ? (
      <span key={index} style={{ backgroundColor: '#a1e619' }}>
        {part}
      </span>
    ) : (
      part
    )
  );
}
