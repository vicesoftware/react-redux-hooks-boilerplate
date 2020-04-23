<!-- TOC -->

- [Overview](#overview)
    - [Overview Video](#overview-video)
- [Installation and Running](#installation-and-running)
    - [Available Scripts](#available-scripts)
        - [`npm start`](#npm-start)
        - [`npm test`](#npm-test)
        - [`npm run build`](#npm-run-build)
        - [`npm run eject`](#npm-run-eject)
- [Goals](#goals)
    - [Good Starting Point](#good-starting-point)
    - [High Developer Ergonomics](#high-developer-ergonomics)
    - [Create Software with High Asset Value](#create-software-with-high-asset-value)
    - [Maximize the Value of the Tools we are Using](#maximize-the-value-of-the-tools-we-are-using)
    - [Scale Well in Complex Apps](#scale-well-in-complex-apps)
- [Features](#features)
    - [Authentication Flow with Redux](#authentication-flow-with-redux)
    - [Permission Based Authorization with Redux](#permission-based-authorization-with-redux)
    - [Redux Caching](#redux-caching)
    - [Background Loading with Redux](#background-loading-with-redux)
    - [Background Loading](#background-loading)
    - [Automatic Linting and Code Beutification](#automatic-linting-and-code-beutification)
    - [Circular Dependency Detection](#circular-dependency-detection)
    - [Feature Module Generation in VS Code](#feature-module-generation-in-vs-code)
- [Configuration](#configuration)
    - [API Proxy](#api-proxy)
- [Learn More](#learn-more)
    - [Code Splitting](#code-splitting)
    - [Analyzing the Bundle Size](#analyzing-the-bundle-size)
    - [Making a Progressive Web App](#making-a-progressive-web-app)
    - [Advanced Configuration](#advanced-configuration)
    - [Deployment](#deployment)
    - [`npm run build` fails to minify](#npm-run-build-fails-to-minify)

<!-- /TOC -->

# Overview
This is a React boilerplate focused on enabling high developer velocity while implementing idiomatic Redux Hooks and React Hooks.

## Overview Video
Here's a video that walks through some of the major features of this boilerplate.

[![Overview](_docs/boilerplateOverivew.gif)](https://www.youtube.com/watch?v=4l9KUffb9cc)

# Installation and Running

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

- Runs the app in the development mode.
- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
- The page will reload if you make edits.<br />
- Prettier will run and auto-format your code whenever a file is saved.
- You will also see any lint errors in the console.
  - *Currently lint errors get written out twice. We will try and fix this soon.*

### `npm test`

- Launches the test runner in the interactive watch mode.
- See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

---
**NOTE**

Note that you must place `node-module` mocks in the `webapp/src/__mocks__` director because `create-react-app` reset Jest's `roots` config for performance reasons. I lost half a day on figuring this out so figured I'd share. The PR is below.

https://github.com/facebook/create-react-app/pull/7480/files

---

### `npm run build`

- Builds the app for production to the `build` folder.
- It correctly bundles React in production mode and optimizes the build for the best performance.
- The build is minified and the filenames include the hashes.
- Your app is ready to be deployed!
- See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

# Goals
These are the goals of this boilerplate

## Good Starting Point
We don't want to waste time or our clients budgets rewriting the same code over and over for things every web app needs like 

- authentication
- authorization
- popups (errors, notifications)
- busy indicators
- caching
- forms and validations
- ect...

## High Developer Ergonomics
We want to make sure that  
- developers are able to do the 80% they need to do most often easily without a lot of boilerplate
- new developers on the project can get up and running quickly and modify the code confidently

## Create Software with High Asset Value
It's much easier to create software that is a liability, that offers little value to the sponsors without the team that wrote it. We want the systems built with this boilerplate to be easy to transfer from one team to another. We often help clients to build apps that their own teams will take over one day and want that transfer to be as easy as possible.

## Maximize the Value of the Tools we are Using
We don't want to include libraries because they are popular, we want to include them because they add value that we want to take advantage of. So for example if we are using Redux then we want to take advantage of the valuable features it provide (dev tooling, serializable state, etc...).

## Scale Well in Complex Apps
We want to make sure that if the projects that use this boilerplate become successful and complex overtime that they won't outgrow the patterns, infrastructure and best practices.

# Features
Below are some of the features that we've added to this boilerplate

## Authentication Flow with Redux
We provide a login flow that you can plug in Auth0 or whatever IDP you like to use. Our authentication flow will allow you to call your IDP and handles redirecting from protected routes to Sign In page for you as well as redirecting back to the calling page after successful sign in. The user profile returned from your IDP will be put into redux and available on the `state.userContext` slice.

## Permission Based Authorization with Redux
We have added `withRestrictedAccess(component, permissions)` HOC which takes `permissions` array that will be cross referenced with `state.userContext.permissions` automatically and prevent access for users without the configured permissions.

## Redux Caching
Via the `doAsync` module that can be easily used with `createAsyncThunk` from `redux-toolkit` we support redux caching. Passing `useCaching: true` to `doAsync({url, useCaching: true})` will not go to the server if the data has already been fetched and is in redux. 

## Background Loading with Redux
The `busyIndicator` module allows for redux based busy indicator management. Our `doAsync` module will automoatically turn on and off the busy indicator for you as you call the API. You can also manually turn on and off the busy indicator and there is support for named busy indicators allowing for creating regional busy indicators. 

## Background Loading
Via the `doAsync` module that can be easily used with `createAsyncThunk` from `redux-toolkit` we support background loading of data via API calls. Passing `noBusySpinner: true` to `doAsync({url, noBusySpinner: true})` will start a call to the API but not turn on the busy indicator. Note that if a call comes through for the same url before the first background call returns then the busy spinner will be turned on and the API will not be called and the current request will not be sent to the API.

## Automatic Linting and Code Beutification
Every time a file is saved when the app is running in dev via `npm start` that file will be beautified via prettier and the prettier rules have been configured to match the eslint rules.

## Circular Dependency Detection
If you introduce a circular dependency in your `import` statements the build will fail and you will be forced to fix it by refactoring your code. If circular references aren't fixed you will eventually get a very hard to fix `object null` null type of exception. This usually happens after there are a lot of circular references in the code making cleaning all up difficult and expensive.

## Feature Module Generation in VS Code
Our architecture uses a pattern we call `feature module` and we have added a blueprint template that will allow generating a working `feature module` from the context menu. The video below walks through quickly creating a feature using this approach.

[![Generating Feature Modules](_docs/featureModule.gif)](https://www.youtube.com/watch?v=Aoz6VPHQr-4&t=6s)

# Configuration
Below are configurations supported in this boilerplate.

## API Proxy
coming soon...

# Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

## Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

## Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

## Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

## Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

## `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
