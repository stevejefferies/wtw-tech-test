var webdriver = require('selenium-webdriver'),
until = webdriver.until,
By = webdriver.By;

var SearchPage = function SearchPage(driver) {
  this.driver = driver;

  // search elements
  this.searchInput = driver.findElement(By.css('input[form]'));
  this.searchButton = driver.findElement(By.css('a.CoveoSearchButton'));
  this.results = By.css('.coveo-results-title');

  // sort elements
  relevanceSort = driver.findElement(By.css('[title="Relevance"]'));
  dateSort = driver.findElement(By.css('[title="Date"]'));

  // filter elements
  transport = driver.findElement(By.css('[title=Transportation]'));
  transportCrumb = '';

  this.get = function() {
    this.driver.get('https://www.willistowerswatson.com/Search');
    return webdriver.promise.fulfilled(true);
  };

  this.search = function(searchTerm) {
    var d = webdriver.promise.defer();
    this.searchInput.sendKeys(searchTerm);
    this.searchButton.click().then(function() {
      d.fulfill();
    });
    return d.promise;
  };

  this.getResults = function(){
    var d = webdriver.promise.defer();
    driver.findElements(this.results).then(function(elements){
      d.fulfill(elements);
    });
    return d.promise;
  };

  this.sortByDate = function() {
    var d = webdriver.promise.defer();
    dateSort.getAttribute('class')
    .then(function(classes){
        if (!(classes.includes('coveo-selected'))) {
          dateSort.click().then(function() {
            d.fulfill();
          });
        }
     });
     return d.promise;
  };

  this.filterTransport = function() {
    var d = webdriver.promise.defer();
    transport.click()
    driver.wait(until.elementLocated(By.xpath('//*[contains(@class, "coveo-facet-breadcrumb-caption") and text()="Transportation"]')), 1000).then(function() {
      d.fulfill();
    });
    return d.promise;
  }
};

module.exports = SearchPage
