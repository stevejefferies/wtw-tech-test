# WTW Technical Test
Solution to the WTW technical web test.

This repository contains a JavaScript based automation framework built around
Selenium, Mocha and Node.js. It is designed to provide a lightweight solution to
the immediate problem posed in the WTW technical test yet also be extensible to
support wider front-end automation of the WTW website.

## Prerequisites

**Operating System** - although tested on Windows 10 only, this solution should
work on any operating system which supported by node.js and Chrome.

**Browsers** - this solution targets Chrome as a browser only, you need to have
Chrome installed. It is recommended that you upgrade to the latest version for
the release channel you are using. Beta and Canary release channels should work
provided you are using a compatible version of chromedriver (see installation
steps).


## Installation
1. Clone this repository:
  ```
  git clone https://github.com/stevejefferies/wtw-tech-test.git
  ```
2. Install node.js- https://nodejs.org. Note: you should install the
  latest long term support (LTS) version. This will install both node.js and the
  node package manager (npm).

  Ensure both node.js and npm are installed correctly:
  ```
  node -v
  npm -v
  ```
3. Install node modules:
  ```
  cd path/to/repository
  npm install --save-dev
  ```
4. Install chromedriver:
  - download driver corresponding to your version of chrome and operating system
  from http://chromedriver.chromium.org/downloads
  - extract and ensure the driver executable is on your system path


## Running Tests
#### Local running
Locally you can start the test using the following command from a terminal
window. This will execute the test and show the results in the terminal window.
```
cd path/to/repository
npm run test
```

#### Running in a CI environment
If you wish to run the tests in a CI environment and output the results into a
xUnit format, you sould use the `test-ci` script:
```
cd path/to/repository
npm run test-ci
```
