var webdriver = require('selenium-webdriver'),
By = webdriver.By;

var HomePage = function HomePage(driver) {
  this.driver = driver;
  this.searchInput = By.id('site_search');
  this.searchButton = By.css('#site_search + span button');

  this.get = function() {
    this.driver.get('https://www.willistowerswatson.com');
    return webdriver.promise.fulfilled(true);
  };

  this.search = function(searchTerm) {
    var d = webdriver.promise.defer();
    driver.findElement(this.searchInput).sendKeys(searchTerm);
    driver.findElement(this.searchButton).click().then(function() {
      d.fulfill();
    });
    return d.promise;
  };
};

module.exports = HomePage
