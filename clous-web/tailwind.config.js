/** @type {import('tailwindcss').Config} */
export const withMT = require("@material-tailwind/react/utils/withMT");


 
module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    
      extend: {
        colors: {
          "button-orange": "#F26C21",
          "primary": "#F26C21",
          "dark-blue-greenish": "#333132", 
          "light-orange": "#FFE4D5",
          "new-beige": "#FFFEF7",
          "new-gray": "#DDDDDD",
          "dark-gray": "#6e6e6e",
          "shade-gray": "#9e9e9e",
          "light-blue": "#8FC0FF", // why is light-blue not converting? @alvipe PS: never mind, changing color needs
          "super-white": "#FFFFFF",
          "secondary": "#FFFFFF",
          "main-white": "#FAFAFA",
          "blue-gray-100": "#F26C21",
          "beige-gray": "#F2F3F0"
        },

      size: {
        'sm': ['10rem']
      },
   
      fontSize: {
          '7xl': ['5rem', '1' ],
          
        },  
      
        fontFamily: {
          sans: ["Montserrat", "sans-serif"],
  serif: ["Montserrat", "san-serif"],
  body: ["Montserrat", "sans-serif"],
        },
      },
      boxShadow: {
        navbar: "0px 10px 8px 0px rgba(3, 3, 4, 0.03), 0 1px 2px -1px rgba(3, 3, 4, 0.03)",
      },
    
  },
  plugins: [
    function ({ addUtilities }) {
      const extendUnderline = {
        ".underline": {
          textDecoration: "underline",
          "text-decoration-color": "#f26c21",
        },
      };
      addUtilities(extendUnderline);
     
    },
  ],
});

