# Question 1

## Part a
Testing of the form should be handled through a series of test conditions to
cover the functionality to a suitable level.

#### Prerequisites
- In order to cover the following criteria, access to the underlying database is
required in order to be able to set the test currencies
- The process updating the exchange rates as a background process must be
stopped in order to simulate the

#### Test conditions
The following scenarios should be executed to cover the functionality of this
form, in call cases the following script is followed:

Test script
(for all below conditions)
1. Set the exchange rate of Pound Sterling -> Euro to 0.80
2. Set the commission rates (from Pound Sterling) as follows:
    * Minimum commission = £10
    * £0.01 - £99.99 = 15%
    * £100.00 - £999.99 = 10%
    * £1000.00+ = 5%
2. Execute the following scenarios by setting the relevant fields
3. Ensure the actual values match the expected

**Base and target currency conversions**

Scenario | Base Currency  | Target Currency | Amount to Convert | Commission? | Expected
-------- | -------------  | --------------- | ----------------- | ----------- | --------
1        | Pound Sterling | Euro            | 100.00            | No          | 80.00
2        | Pound Sterling | Pound Sterling  | 100.00            | No          | 100.00

**Amount to convert (boundary value analysis)**

Scenario | Base Currency  | Target Currency | Amount to Convert | Commission? | Expected
-------- | -------------  | --------------- | ----------------- | ----------- | --------
3        | Pound Sterling | Euro            | -0.01             |  No         | Invalid
4        | Pound Sterling | Euro            | 0.00              |  No         | 0.00
5        | Pound Sterling | Euro            | 0.01              |  No         | 0.008 (rounded to 0.01)

Note: valid boundary value covered by scenario 1

Query: is there a maximum limit on conversion amount? If so this needs testing
with additional upper boundary value analysis

**Commission calculations**

Scenario | Base Currency  | Target Currency | Amount to Convert | Commission? | Expected
-------- | -------------  | --------------- | ----------------- | ----------- | --------
6        | Pound Sterling | Euro            | 66.66             |  Yes        | 43.328 (rounded to 43.33)
7        | Pound Sterling | Euro            | 66.67             |  Yes        | 43.3355 (rounded to 43.34)
8        | Pound Sterling | Euro            | 99.99             |  Yes        | 64.9935 (rounded to 64.99)
9        | Pound Sterling | Euro            | 100.00            |  Yes        | 70
10       | Pound Sterling | Euro            | 999.99            |  Yes        | 699.993 (rounded to 699.99)
11       | Pound Sterling | Euro            | 1000.00           |  Yes        | 750

Note: No commission valid conversion scenario covered by scenario 1

**Additional scenarios**

In addition to the above calculation focused scenarios, tests to check that the
following scenarios are invalid should be performed:
1. Amount to convert, numerical with more than 2 decimal places e.g. "10.012"
2. Amount to convert, non-numeric characters e.g.: "abc"
3. Amount to convert, numeric with currency symbol e.g. "£10.00"
4. Non-populated base currency field
5. Non-populated target currency field
6. Non-populated base and target currency fields

## Part b
The following scenarios would be executed:
1. Add a valid currency (e.g. a currency which meets naming criteria) - check
that the currency appears in the database, can be updated by the background
process and appears in conversion UI
2. Negative creation conditions (e.g. a currency which has an invalid name) -
check that this is not added to the database
3. Currency deletion - check that the currency no longer appears in the database
or the conversion UI
4. Currency edit - check that an edit is reflected to the database and where
applicable to the conversion UI

## Part c
The following scenarios would be executed:

**Minimum conversion value**

1. negative value (-0.01)
2. zero value (0.00)
3. positive value (2 decimal places) (10.01)
4. non-numeric value (abc)
5. value with 3 decimal places (10.011)

**Commission range**

Minimum | Maximum | Rate  | Positive/Negative Test
------- | ------- | ----- | ----------------------
0.00    | 100.00  | 5.00  | Positive              
-0.01   | 100.00  | 5.00  | Negative               
0.00    | -0.01   | 5.00  | Negative               
20.00   | 10.00   | 5.00  | Negative               
0.00    | 100.00  | -0.01 | Negative               

In addition, non-numeric values for minimum, maximum and rate should be tested
all of which would constitute a negative test case

## Part d
The form should be checked to ensure it exposes its UI controls to assistive
technology, for example screen readers, braille readers. In addition it should
allow keyboard based navigation for those users with reduced mobility. The UI
should also support the use of high-contrast models to support those with
related eyesight issues.

## Part e
Given the application is a desktop based application, providing suitable UI
automation hooks would improve both the automation stability and speed of
initial scripting. If the application is a purely Windows application, adhering
to the Microsoft UI Automation standards and framework would be suitable.

## Part f
Localisation testing would need to cover the following:
1. All static English text was converted to the local language (buttons, labels,
menus)
2. All numeric formats for currency values align with the localised region
3. All currencies were converted (if applicable) to the local language
4. Any accessibility laws for that region were applied to the UI

## Part g
The following issues are observed:
- The form allows blank currencies rather than defaulting to a currency
- Convert button is active even though form is incomplete
- Typo panel heading "Currency converson" should read "Currency conversion"
- "Convert" and "Close" button text layout is not consistent
