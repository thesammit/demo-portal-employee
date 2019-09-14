# Employee Portal
### Employee portal App with two basic functionalities

##### UI Details
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version **_8.3.3_**. It is the basic implementation of Employee portal.

[![dependencies Status](https://david-dm.org/thesammit/demo-portal-employee/status.svg)][david-badge-url]
[![devDependencies Status](https://david-dm.org/thesammit/demo-portal-employee/dev-status.svg)][david-dev-badge-url]

[david-badge-url]: https://david-dm.org/thesammit/demo-portal-employee
[david-dev-badge-url]: https://david-dm.org/thesammit/demo-portal-employee?type=dev

##### Backend Server Details
The Backend server is built with [Spring Boot](https://github.com/spring-projects/spring-boot) version **_2.1.8_**. Java 8 is used as platform to run the API. Application scaffold-ed from `https://start.spring.io/`

## Running the Application server

#### UI

Install Node.js LTS version to run the application. Then to prepare the Angular environment then reach to Application Path.

Then, run the commands, first `{application_path}:/> cd ./UI` then `npm install`

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

#### API Server

Run `mvn install` and then `java -jar target/employee-portal-0.0.1-SNAPSHOT.jar` to build the Spring Boot server. Finally run `mvn spring-boot:run` to start the API.

## Build UI

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

To get more help on the Spring Boot go check out the [Help README](https://github.com/thesammit/demo-portal-employee/blob/master/employee-portal/HELP.md).
