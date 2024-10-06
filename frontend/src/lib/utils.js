// src/lib/utils.js

/**
 * Utility function to conditionally join class names.
 * @param {string[]} classes - An array of class names to join.
 * @returns {string} - A string of joined class names.
 */
export const cn = (...classes) => {
    return classes.filter(Boolean).join(' ');
  };
  