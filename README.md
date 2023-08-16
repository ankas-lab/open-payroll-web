# Open Payroll Web

## Overview
Open Payroll's web application is a user-centric platform that revolutionizes payroll management. It offers users the ability to create, manage, and claim funds from multiple payrolls. The platform prioritizes transparency and flexibility, allowing users to configure their own systems by customizing parameters like base amounts and multipliers. By leveraging this web application, individuals gain seamless oversight and convenient access to their funds across various payrolls, ensuring efficient and user-friendly management.

## Built with

- 📦 NextJS as framework for the application.
- 📘 React framework.
- 🐳 Docker for development and testing operations.

## 🚀 Run app

- Clone the repository with the following command and enter the project folder:

    ```bash
    git clone https://github.com/ankas-lab/open-payroll-web.git && cd open-payroll-web
    ```

### Docker

- ⚠️ Requirements:
  - docker >= 20

1. Make sure your daemon `docker` is running in your system.

2. Build the docker image:

    ```bash
    docker build -t open-payroll-web:0.1.0 .
    ```

3. Run the docker container:

    ```bash
    docker run -p 3000:3000 open-payroll-web:0.1.0
    ```

4. Open your browser and go to `http://localhost:3000`.

