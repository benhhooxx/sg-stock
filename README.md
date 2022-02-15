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
│   ├── tests (Focus on testcases with xxx.test.js)
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

- Webpack is a good friend to gather my all dependencies with the help of an easy to set up config file. 
- Webpack also provides a lot of loaders which transform files from a different language to Javascript, ot inline images as data URLs. 
- [Plugins](https://webpack.js.org/plugins/) can intercept runtime events supplied by webpack (e.g. [HtmlWebpackPlugin](https://webpack.js.org/plugins/html-webpack-plugin/))

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

## Development server

Run `npm run serve` for a dev server.

---
## Build

Run `npm run build` to build the project.

The build folder path is adjusted with the webpack, and the artifacts currently is deploying to the [AWS S3](https://aws.amazon.com/s3/). 

To-do item in the deployment stage, we also can do the CI/CD pipeline to deploy automatically.

---
## Running unit tests

Run `npm run test` to run ten unit tests.

---

## Business Details

- The searchbar in the stock list page is added to enhance the user experience
- The list of the order basket is sorted by createdAt
---


## Special Handling


- Pagination page will set value as 0 if searchbar triggered
- Toast Message will clear every 10 second by useEffect triggering

---

## Utils Components Details 

 - Pagination (shared to stock list page and order basket page)
 - Searchbar (reusable component for return search keyword)
 - Toast (display the toast message for alert user)
 - Tooltip (informative tooltip to display extra message to users)