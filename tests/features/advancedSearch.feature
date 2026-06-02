Feature: Advanced Vehicle Search on Otomoto

  @advanced @critical
  Scenario Outline: Search with advanced filters and verify results data reliability
    Given The user is on the Otomoto homepage
    When The user accepts the cookies policy
    And The user selects the make "<Make>"
    And The user selects the model "<Model>"
    And The user sets minimum production year to "<YearFrom>"
    And The user selects fuel type as "<FuelType>"
    And The user selects country of origin as "<Country>"
    And The user clicks the search button
    Then The search results should only display valid vehicles matching year "<YearFrom>" and fuel "<FuelType>"

    # Macierz testowa z dwoma skrajnie różnymi autami i filtrami:
    Examples:
      | Make          | Model      | YearFrom | FuelType | Country |
      | BMW           | Seria 5    | 2020     | Benzyna  | Niemcy  |
      | Volkswagen    | Tiguan     | 2018     | Diesel   | Polska  |