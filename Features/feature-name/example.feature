Feature: Login

Scenario: Registered customer logs in

Given that the Customer has a registered email

And have password

When completing the login details

Then it should be possible to login

But the Customer must complete the correct email
