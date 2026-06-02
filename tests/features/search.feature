Feature: Vehicle Search on Otomoto - Basic Data Driven

  @critical
  Scenario Outline: Search for a passenger car by various makes and models
    Given The user is on the Otomoto homepage
    When The user accepts the cookies policy
    And The user selects the make "<Make>"
    And The user selects the model "<Model>"
    And The user clicks the search button
    Then The user should see search results for "<Make>"
    And The page should display found vehicles or a proper no-results message

    Examples:
      | Make          | Model      |
      | Audi          | A4 Allroad |
      | BMW           | Seria 3    |
      | Mercedes-Benz | Klasa C    |
      | Volkswagen    | Golf       |
      | Toyota        | RAV4       |
      | Hyundai       | i30        |
      | Mazda         | 6          |
      | Porsche       | 911        |