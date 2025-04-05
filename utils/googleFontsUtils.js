// googleFontsUtils.js

// Fetch fonts from the Google Fonts API using your API key.
export const fetchFonts = async () => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/webfonts/v1/webfonts?key=${process.env.NEXT_PUBLIC_GOOGLE_FONT_API_KEY}`
    );
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error("Error fetching fonts:", error);
    return [];
  }
};

// Filter fonts based on a search query (case-insensitive).
export const filterFonts = (fonts, query) => {
  return fonts.filter((font) =>
    font.family.toLowerCase().includes(query.toLowerCase())
  );
};

// Get available weights (variants) for a selected font.
// If the font is not found, return a default weight ["400"].
export const getAvailableWeights = (fonts, selectedFont) => {
  const font = fonts.find((font) => font.family === selectedFont);
  return font ? font.variants : ["400"];
};

// Generate the Google Fonts URL for the selected font and weights.
// The URL will be in the format expected by Google Fonts.
export const generateFontLink = (selectedFont, availableWeights) => {
  if (!selectedFont) return "";
  return `https://fonts.googleapis.com/css2?family=${selectedFont.replace(
    /\s/g,
    "+"
  )}:wght@${availableWeights.join(";")}&display=swap`;
};
