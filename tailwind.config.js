/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{html,js}", "./app.js"],
  theme: {
    extend: {
      backgroundImage: {
        'abstract-background':
          // Write the Url path to an image in the directory /public/media/background.png
          "url('/images/background2.jpg')",
      },
    },
  },
  plugins: [],
};
