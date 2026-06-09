Feature: Advanced Vehicle Search

  @advanced @critical
  Scenario: Search with basic criteria and verify results data reliability
    Given The user is on the Otomoto homepage
    When The user accepts the cookies policy
    And The user selects the make "<Make>"
    And The user selects the model "<Model>"
    And The user sets minimum production year to "<YearFrom>"
    And The user sets maximum price to "<PriceTo>"
    Then The search results should only display valid vehicles matching year "<YearFrom>" and price "<PriceTo>"

    Examples:
      | Make  | Model   | YearFrom | PriceTo |
      | BMW   | Seria 5 | 2020     | 250000  |
      | Audi  | A4      | 2021     | 150000  |
      | Toyota| Yaris   | 2020     | 80000   |