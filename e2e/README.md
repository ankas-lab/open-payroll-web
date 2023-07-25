
# E2E readme.

## About running e2e tests.

We embarked on this project with the full expectation that we would be able to fully document our test suite utilizing Selenium IDE from https://www.selenium.dev/. Unfortunately, despite our best efforts and tireless dedication, we encountered unexpected obstacles that prevented the realization of this objective in its entirety.

The primary challenge was tied to the transaction signing process. We couldn't find a way to make our tool to interface with the sign transactions and consequently, that interaction could not be recorded. Despite this setback, we redirected our approach to compensate for this shortfall. We committed to documenting all other processes that didn't involve the wallet interactions, and succeeded in this venture.

As we proceeded further, we encountered yet another unanticipated hurdle while attempting to use the [selenium-side-runner](https://www.selenium.dev/selenium-ide/docs/en/introduction/command-line-runner). This console tool, typically used to automate all interactions, failed to perform as anticipated because each test suite ran in a unique browser instance. This meant that none of these instances had the necessary preinstalled extensions. Most notably, they were devoid of the requisite wallet that would have been essential for complete execution of our initial plan.

We remain dedicated to addressing these issues and refining the testing procedures for the future. Despite the setbacks, we successfully executed the subsequent instructions:

## Guide to Execute the Test Suite

Please follow these steps:

1. **Install Extensions**
   - Install the `Selenium IDE` extension. (https://www.selenium.dev/selenium-ide/)
   - Install a wallet extension. We recommend `SubWallet`.(https://www.subwallet.app/)

2. **Configure Wallet**
   - Set up your wallet to provide a valid account. 

3. **Set Up open-payroll-web Project**
   - Run the `open-payroll-web` project locally or dockerized, ensuring it's running on `localhost:3000`.

4. **Run the Test Suite**
   - Open the Selenium IDE extension and load the `e2e/OpenPayroll.side` file.
   - Initiate the suite by pressing the `Run All Tests` button. (It's like a play with a list in the right side.)

_Note:_ We understand this method may seem complex. We're actively working on a solution to make test execution simpler, ideally with a single command. For the further versions of the open payroll.
