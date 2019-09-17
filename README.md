
# Employee Portal
### Employee portal App with two basic functionalities

##### UI Server Details
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version **_8.3.3_**. It is the basic implementation of Employee portal.
Check the Angular dependencies used in this project [here](https://github.com/thesammit/demo-portal-employee/blob/master/UI/package.json).

##### Backend Server Details
The Backend server is built with [Spring Boot](https://github.com/spring-projects/spring-boot) version **_2.1.8_**. Java 8 is used as platform to run the API. Application scaffold-ed from `https://start.spring.io/`

## Running the Application server

#### UI Server

Install [Node.js](https://nodejs.org/en/) LTS version to run the application. After installation, reach to the git folder location of Application Path "`{application_path}`" to prepare the Angular environment.

Then, run the commands in order, 
1. `{application_path}:/> cd .\UI\` 
2. `npm install`

Run `npm start` to start the dev server. 
Open browser and go to`http://localhost:4200/`. 

#### API Server
First reach to path `{application_path}\employee-portal\` and 
Run `mvn clean install` to build the Spring Boot server. 
Finally run `mvn spring-boot:run` to start the API.

*Note: First Start the API server and then start the UI server.*

## Build UI

Run `ng build` to build the project. The build artifacts will be stored in the `dist\` directory. Use the `--prod` flag for a production build.

## Build API

Run `mvn package` to build the jar file in target folder. Otherwise, you can just run `mvn clean install` to create the jar which will also be present in target folder.

## Running unit tests

For UI, Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io). 
For APIs `mvn test` will run the test cases along with the build. You will get the code coverage report at location `{application_path}\employee-portal\target\jacoco-report`

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

To get more help on the Spring Boot go check out the [Help README](https://github.com/thesammit/demo-portal-employee/blob/master/employee-portal/HELP.md).
