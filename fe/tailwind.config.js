/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  module: {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
};