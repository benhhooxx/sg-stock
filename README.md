# SG Stock Webapp

## Folder Structure

```
.
├── src
│   ├── assets 
│   ├── css
│   ├── pages (Focus page control, business logic)
│   ├── partials (Focus customer-facing layer)
│   ├── services  (Focus on reusable service)
│   ├── state  (Focus state management)
│   ├── utils (Focus on reusable component)
│   ├── App.js
│   └── index.js
├── package-lock.json
└── package.json
```

---
This project was developed by [React.js](https://reactjs.org/), and modularize the resource with [Webpack](https://webpack.js.org). Furthermore, I would like to pickup a new styling skills via this project, and the styles was takecare by [Tailwind](https://tailwindcss.com/). For the testing, this project is use [JEST.js](https://jestjs.io/) as a testing framework.

<p>
  <a href="https://tailwindcss.com/#gh-light-mode-only" target="_blank">
    <img src="https://raw.githubusercontent.com/tailwindlabs/tailwindcss/db475be6ddf087ff96cc326e891ac125d4f9e4e8/.github/logo-light.svg" alt="Tailwind CSS" width="350" height="70">
  </a>
</p>

### Why React.js?

Apart form the below common benefits, React.js is better for me to deal with the state, lifecycle, test issues:
- Speend
- Flexibility
- Performance
- Usability
- Reusable Component

### Why Webpack?

1. Webpack is a good friend to gather my all dependencies with the help of an easy to set up config file. 
2. Webpack also provides a lot of loaders which transform files from a different language to Javascript, ot inline images as data URLs. 
3. [Plugins](https://webpack.js.org/plugins/) can intercept runtime events supplied by webpack (e.g. [HtmlWebpackPlugin](https://webpack.js.org/plugins/html-webpack-plugin/))

### Why Tailwind?

Tailwind let me use CSS/[SCSS](https://sass-lang.com/) to reproduce what exactly the general styling libraries (Material UI, Ant.design etc.) do and offers: 
- Control over styling - customize themes and components easily
- Faster CSS styling process
- Responsive modifiers
- Thorough documentation

### Why JEST.js?

JEST.js is a test framework which easy to use, and it serves below benefits
 - Fast & Safe
 - Easy Mocking
 - Code Coverage
 - Great Exceptions

---


1. How to package (build) your component;

TODO: write after AWS deployment

--- 

1. How to start your component;

## Development server

Run `npm start` for a dev server.

## Build

Run `npm run build` to build the project

## Running unit tests


---


3. Assumptions (if any) that you have made in your implementation;

Business case, sorted the not ready first, and sortby createdAt

---


4. Special cases handling (if any); and

Pagination, search will set 0
Toast Message, 10s

---


5. Purpose / functionality of the component, if it is an extra component.

 - Pagination 
 - Searchbar
 - Toast
 - Tooltip