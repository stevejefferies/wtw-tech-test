// Load dependecies
var assert = require('chai').assert,
test = require('selenium-webdriver/testing'),
webdriver = require('selenium-webdriver'),
until = webdriver.until,
By = webdriver.By,
HomePage = require('../lib/home.po');
SearchPage = require('../lib/search.po');

var driver;

// Our test
test.describe('Test', function () {

  test.beforeEach(function() {
    // Create driver
    driver = new webdriver.Builder().
    withCapabilities(webdriver.Capabilities.chrome()).
    build();

    // add cookies to cover GDPR & region settings
    driver.get('https://www.willistowerswatson.com');
    driver.manage().addCookie({ 'name': 'notice_gdpr_prefs', 'value': '0,1,2:', 'path': '/', 'domain': '.willistowerswatson.com' })
    driver.manage().addCookie({ 'name': 'wtw#lang', 'value': 'en', 'path': '/', 'domain': '.willistowerswatson.com' })

  });

  test.afterEach(function() {
    // Quit webdriver
    driver.quit();
  })

  test.it('Can search via WTW homepage"', function () {
    var homePage = new HomePage(driver);
    homePage.get();

    homePage.search('test')

    // check results page loaded
    driver.wait(until.titleIs('Search - Willis Towers Watson'), 1000);

    var searchPage = new SearchPage(driver);
    searchPage.sortByDate();
    searchPage.filterTransport();

    // print list of results
    searchPage.getResults().then(function(results) {
      results.forEach(function (element) {
          element.getText().then(function(text){
              console.log(text);
          });
      });
    });
  });
});
