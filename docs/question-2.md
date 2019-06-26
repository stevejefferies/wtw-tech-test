# Question 2

The full solution for question 2 is available in this repository. See README.md
for full instructions on installation and execution.

## Tool Rational

The choice of Mocha + Selenium was chosen to provide the basis for this
framework owing to:
1. The website under test - being a fairly standard site, with fairly static
content (i.e. it is not a complex single page application). It was deemed
appropriate to use the official Selenium-webdriver bindings over any tooling
built on top of the core selenium tool to provide additional functionality. The
official bindings provide suitable functionality for this site.
2. Mocha was chosen as a widely used test framework as well as being flexible
and simple to use. The commonality of the framework provides increased
confidence in the ability to maintain such a solution long-term.

Non-selenium tooling using Cypress was investigated as a potential alternative
for this solution. However the website under test did not work with the tool. It
is suspected that the frame-busting technology used on the website under test is
preventing suitable automation using Cypress for the production site. Although
the tooling may provide a suitable alternative in a non-production environment
if the frame-busting technology can be removed.
