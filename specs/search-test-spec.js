test = require('selenium-webdriver/testing'),
webdriver = require('selenium-webdriver'),
until = webdriver.until,
By = webdriver.By;

HomePage = require('../lib/home.po');
SearchPage = require('../lib/search.po');

var driver;

// Our test
test.describe('Test', function () {

  test.before(function() {
    // Create driver
    driver = new webdriver.Builder().
    withCapabilities(webdriver.Capabilities.chrome()).
    build();
  });

  test.beforeEach(function() {
    // add cookie to cover GDPR settings
    driver.get('https://www.willistowerswatson.com');
    driver.manage().addCookie({ 'name': 'notice_gdpr_prefs', 'value': '0,1,2:', 'path': '/', 'domain': '.willistowerswatson.com' })
  })

  test.after(function() {
    driver.quit();
  })

  test.it('Can search via WTW homepage"', function () {
    var homePage = new HomePage(driver);
    homePage.get();
    homePage.ensureRegion('Global | English');

    homePage.search('test');

    var searchPage = new SearchPage(driver);
    searchPage.sortByDate();
    searchPage.filterBy('Transportation');

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
