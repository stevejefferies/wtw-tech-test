var webdriver = require('selenium-webdriver'),
until = webdriver.until,
By = webdriver.By;

var HomePage = function HomePage(driver) {
  this.driver = driver;
  this.region = By.id('btnCountrySelector');
  this.searchInput = By.id('site_search');
  this.searchButton = By.css('#site_search + span button');

  this.get = function() {
    this.driver.get('https://www.willistowerswatson.com');
    this.driver.wait(until.titleIs(
      'Willis Towers Watson | Risk, Broking, HR, Benefits - Willis Towers Watson'), 1000);
    return webdriver.promise.fulfilled(true);
  };

  this.ensureRegion = function(region) {
    var d = webdriver.promise.defer();
    var self = this;
    this.driver.findElement(this.region).getText().then(function(currentRegion) {
      if (!(currentRegion.includes(region))) {
        self.setRegion(region).then(function() {
          d.fulfill();
        });
      }
    });
    return d.promise;
  };

  this.setRegion = function(region) {
    var d = webdriver.promise.defer();
    this.driver.findElement(this.region).click();
    this.driver.wait(until.elementIsVisible(this.driver.findElement(
      By.css(`a[title='${region}']`)
    )));
    this.driver.findElement(By.css(`a[title='${region}']`)).click();
    this.driver.wait(until.elementTextContains(
      this.driver.findElement(this.region), region), 1000).then(function() {
        d.fulfill();
      });
    return d.promise;
  }

  this.search = function(searchTerm) {
    var d = webdriver.promise.defer();
    this.driver.findElement(this.searchInput).sendKeys(searchTerm);
    this.driver.findElement(this.searchButton).click().then(function() {
      d.fulfill();
    });
    return d.promise;
  };
};

module.exports = HomePage
