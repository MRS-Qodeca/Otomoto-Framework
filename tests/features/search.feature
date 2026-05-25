Feature: Vehicle Search on Otomoto

  @critical
  Scenario: Search for a passenger car by make and model
    Given The user is on the Otomoto homepage
    When The user accepts the cookies policy
    And The user selects the make "Audi"
    And The user selects the model "A4"
    And The user clicks the search button
    Then The user should see search results for "Osobowe"