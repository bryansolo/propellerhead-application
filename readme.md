# Propellerhead Interview Exercise
Bryan Solomon

## Quick Start
To run:
```
npm install
npm start
```
Then in a browser, navigate to [http://localhost:3000](http://localhost:3000)

## Requirements

### Customers have the following information associated with them:
* Unique customer identifier.
* Status: one of "prospective", "current" or "non-active".
* Creation date and time.
* General information like name and contact details.

* The company can also make notes for each customer. A customer can have any number of notes associated with them.

### The user should be able to:
* Filter and sort the list of customers.
* Click on a customer in the list to view their details and add/edit notes for that customer.
* Change a customer's status.

### Notes
* Construct a full-stack application with a browser user interface and data store.
* You may use any programming languages, data store and frameworks you want.
* A user interface for editing customer details other than their status and the notes is not required.

## Response from Bryan

I built an angular1 based UI because that's what I can iterate in fastest. I used a filesystem database called nedb. It had no concept of schemas or models so I kind-of home-rolled my own validation - but good input sanitization is still missing (see below in list of things I hate) so don't go live with this ;)
I used node and express because they're insanely easy to spin up quickly which is what I required for this exercise. 
You will see the GET API can accept queries but I don't use it - one iteration of the app did and I just left it so that it can be built upon.
To sort the customer list by an attribute click on the header for that attribute. You can click again for descending
Don't be alarmed: I got names from LinkedIn, emails are made up, and phone numbers are all different Pizza Huts in NZ. Pizzaaaaaaaa!

Things I still hate:

* No security - authn, authz, session tokens, etc. it would all be needed to take this to production
* For the 'customers' api, the request syntax from the client is tightly coupled with the database because I feed queries straight in, so swapping dbs would be impossible without a frontend change. I had to move quickly here so didn't mess with all that but it's obviously tech debt and an adapter pattern should be used to decouple them
* Very little db input sanitization, and no security considerations here whatsoever
* No paginating - loading all customers in memory would not scale
* No enum type for attributes like 'Status'. A better db and affiliated framework would've helped with this but I wanted to be agile and nedb is the lightweight tool I needed
* No build system added because I didn't have time
* No tests written because I didn't have time


Thanks for the fun assignment. Hope you like what you see and that we can move forward with the application process. Cheers!
bryan();