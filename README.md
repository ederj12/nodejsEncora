Goal:

Create an application that integrates multiple services into a useful and timesaving workflow.

Objectives:
Build an application in Typescript that provides an API that takes an IP or domain as input and gathers information from multiple sources returning a single result. Your application must farm individual portions of the lookup to various workers who perform the action. The application should then combine the results and return a single payload.

The API should accept:

IP or domain
A list of services to query. This input should be optional with a default list used if none is provided.
The API should then:

Validate input
Break the request into multiple individual tasks
Send those tasks to a pool of 2+ workers. The API must support workers on separate machines/docker containers than the API.
The workers should then perform the tasks and return the results to the application
The application should wait for all tasks for a request to be completed, combine the results and return
Some suggested services available to query:
GeoIP
RDAP
Reverse DNS
Ping
Bonus Points:

Add additional services (VirusTotal, open ports, website status, domain availability, etc)
API uses GraphQL
API has a Swagger Spec (if you use REST)
Support partial results on error or rate limit
What we are looking for:

How you organize your project
What tooling you use (linting, unit testing) ((bonus points if you use our tslint/prettify rules!))
Creativity and performanc