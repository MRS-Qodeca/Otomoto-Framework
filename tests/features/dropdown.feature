Feature: Dropdown Component Verification

  Background:
    Given The user navigates to the dropdown page

  Scenario: Select a single option from dropdown by label
    When The user selects option "Option 1" from the dropdown
    Then The dropdown selected value should be "Option 1"

  Scenario: Select another option to verify state change
    When The user selects option "Option 2" from the dropdown
    Then The dropdown selected value should be "Option 2"

# Alternatywna wersja / Alternative
# Feature: Dropdown Component Verification

  # Scenario: User can change dropdown selections sequentially
    # Given The user navigates to the dropdown page
    # When The user selects option "Option 1" from the dropdown
    # Then The dropdown selected value should be "Option 1"
    # And The user selects option "Option 2" from the dropdown
    #Then The dropdown selected value should be "Option 2"