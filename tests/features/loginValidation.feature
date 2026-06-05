Feature: Login Validation

  Scenario: Attempt login with non-existent user and verify error message
    Given I have the Otomoto homepage open
    When I navigate to the login screen
    And I enter email "test_automation_2026@wp.pl"
    And I enter incorrect password "PancerneHaslo123!"
    And I click the submit button
    Then the system displays an invalid credentials error message