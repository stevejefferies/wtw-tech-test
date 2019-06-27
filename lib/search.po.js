var webdriver = require('selenium-webdriver');
until = webdriver.until,
By = webdriver.By;


var SearchPage = function SearchPage(driver) {
  this.driver = driver;
  // search elements
  this.searchInput =By.css('input[form]');
  this.searchButton = By.css('a.CoveoSearchButton');
  this.results = By.css('.coveo-results-title');
  // sort elements
  this.relevanceSort = By.css('[title="Relevance"]');
  this.dateSort = By.css('[title="Date"]');

  driver.wait(until.titleIs('Search - Willis Towers Watson'), 1000);

  this.get = function() {
    this.driver.get('https://www.willistowerswatson.com/Search');
    driver.wait(until.titleIs('Search - Willis Towers Watson'), 1000);
    return webdriver.promise.fulfilled(true);
  };

  this.search = function(searchTerm) {
    var d = webdriver.promise.defer();
    this.driver.findElement(this.searchInput).sendKeys(searchTerm);
    this.driver.findElement(this.searchButton).click().then(function() {
      d.fulfill();
    });
    return d.promise;
  };

  this.getResults = function(){
    var d = webdriver.promise.defer();
    this.driver.findElements(this.results).then(function(elements){
      d.fulfill(elements);
    });
    return d.promise;
  };

  this.sortByDate = function() {
    var self = this;
    var d = webdriver.promise.defer();
    this.driver.findElement(this.dateSort).getAttribute('class')
    .then(function(classes){
        if (!(classes.includes('coveo-selected'))) {
          self.driver.wait(until.elementLocated(self.dateSort), 1000).then(function(el) {
            el.click();
            d.fulfill();
          });
        }
     });
     return d.promise;
  };

  this.filterBy = function(filterTerm) {
    var d = webdriver.promise.defer();
    this.driver.wait(until.elementLocated(By.css(`[title=${filterTerm}]`)), 1000).then(function(el) {
      el.click();
    });
    this.driver.wait(until.elementLocated(
      By.xpath(`//*[contains(@class, "coveo-facet-breadcrumb-caption") and text()="${filterTerm}"]`)), 1000).then(function() {
      d.fulfill();
    });
    return d.promise;
  }
};

module.exports = SearchPage
