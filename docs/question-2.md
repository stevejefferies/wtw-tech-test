# Question 2

The full solution for question 2 is available in this repository. See README.md
in the repository root for full instructions on installation and execution.

## Architecture
The solution is designed to provide a simple structure to the problem whilst
also being suitable for future extension.

The solution keeps the test contained with a spec file - although there is only
one spec in this example, it is recommended that additional specs are added and
grouped by the page (or functionality) they are testing, additional folders
under the specs folder should be used to split large areas of functionality.

The lib folder contains a set of page objects to abstract the detail of
individual page interaction away from the tests. For the solution, only page
objects for the pages utilised by the tests were created. Additionally the page
objects would be extended to provide a full coverage of the functionality on
these pages.

Hooks within the Mocha framework are used to start and stop the driver and
associated Chrome browser instance before the test suite executes via the before
and after hooks. The beforeEach hook is used to set the state before each test
runs.

## Tool Rational

The choice of Mocha + Selenium was chosen to provide the basis for this
framework owing to:
1. The website under test - being a fairly standard site, with fairly static
content (i.e. it is not a complex single page application). It was deemed
appropriate to use the official Selenium-webdriver bindings over any tooling
built on top of the core selenium tool to provide additional functionality. The
official bindings provide suitable functionality for this site without needing
additional functionality provided by tools such as Protractor.
2. Mocha was chosen as a widely used test framework as well as being flexible
and simple to use. The commonality of the framework provides increased
confidence in the ability to maintain such a solution long-term.

Non-selenium tooling using Cypress was investigated as a potential alternative
for this solution. However the website under test did not work with the tool. It
is suspected that the frame-busting technology used on the website under test is
preventing suitable automation using Cypress for the production site. Although
the tooling may provide a suitable alternative in a non-production environment
if the frame-busting technology can be removed.
