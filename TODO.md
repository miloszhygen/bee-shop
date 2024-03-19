Bee Delight





# ====================
#
#       TODOs
#
# ====================
- create white background for the app
- make the pages look nice
  - start with thank-you page
  - the rest
- make the header look nice
- make the footer look nice
- make the search/filter look nice

- Loading/spinner component
    - When getting products
    - When searching
    - When ordering
    x loading thank you page

- add some tailwindui components
  - make sure a11y is taken care of
  x basket in header
  - components
    x products list
    - filter component
    x product page
    x basket
    - thank you page
    - header

- How to work on my project
Explain the test mode variable
- add to env var file
- add to readme

- test UU
  - make it possible to select a product to navigate to the product page

- move logic to utils
  - create tests
    - create util for formatting price
      - show as 120,00 [currency]


----------------
- search string needs to be lowercased

- handle failed payment on thank you page

- handle failed product fetching -> show error message


PAYMENT:
  - when creating a pament session add user id to success_url so that it is possible to fetch transaction data for the user? -> use a uuid from nano that is added to the metadata and later added to db for easy fetching? -> when fetching for a transaction: if no user id use uuid?
      - ex -> adding the `payment_intent` and use it in the database then fetch it when on the thank you page?
      - this means that a transactions table has to be created in the database
        - if user is logged in add user_id to the transaction data, use later to filter all transactions for a user
      - Product data in db
          name
          sessionStamp
          product id
          price id
          qty
          price pr unit
          total
          total
          user_id

- ask aidan about sending emails
  - stripe can send an confirmaiton email -> find out how

- add comment on pages on how they work
  - thank you page
  - basket
  - main page


- add to readme -> copy and renaming env.local
  - have these env variables …

- the payment flow
  - if user is not logged in or dont want to register -> how can user see order - link / email?
  - user logged in -> show order in profile page


- make sure UU is taken care of


- Integrate login

- create a mapper for products and prices fetched in action function



- make the app white
  - make sure all components are white
  - cookie banner too


- explain the difference between rich and link product card


- breadcrum navigation

- the count component should be a seperate component used inside the product card components

- the url to a product should be the product name

- fix all the small things pre release

- add tax to checkout form

- add comments to payment api endpoint on how to be used

- move all {price?.unit_amount / 100} to a util and add tests
- create logic for calculating subtotal in basket?

- improve setFilterValues({ ...filterValues, search: "" }); in filter component

- move logic for getting proiducts in localstorage in Basket and NavBar into one place

- when navigating from the basket there has to be a smarter way to close the basket than to use useEffect on different pages?

- update Qty with counter

- bug tracking -> sentry

- favicons

- Add comments on payment on how to integrate
  -> Do the same for search and fetch products

- create an error message component -> see Basket component

- add env variable when on test env. Show hide components
  -> basket small red text above "Go to payment" button

- all alert calls should be a component

- add mongodb
  - add transaction from webhook to db

- upidate readme with:
  - add how to set up stripe
  - webhook
  - products

- move product and price fetching to seperate file and import where used

- admin panel (CRUD)
  - add products
  - remove products
  - update products

# Release -> prod
- create shop tenant in auth0 using the propper name of the app
- create images for "not found" and error page
- create propduction env in vercel
  - set auth0 for productino
  - fix env variables for production
- sitemap -> is the base url with or without wwww?
- do a production release


# Improvements
- snapshot testing / integration testing
- error message to user -> ex, payment failed
- handle validation of forms
- price util that returns price based on currency, adds decimals, and makes sure the price is a number
  -> add good tests


# ====================
#
#       DONE
#
# ====================
x NEXT: add cypress tests
  x golden path -> from selecting product to payment and thank you page
  x Where do i set the api key and where is it used?
  x Add variables to production secret

x add end to end tests
  x add cypress

x payment form state could be one state with an object
  x -> but the card component would be third party

x add real flow

x work offline
  x fetch products
  x filter products

x On test filder mockdata on category too

x fetch products from stripe
x add node version to pkg.json
x create some more products
x create a config file
x add loader
x add some nice components from tailwindui
x clean the code

x Readme - how to use mongodb and setup

x add a 3 second timeout on the thank you page to make sure that the webhook has time to update the order on the user
  x fetch transaction data based on sessionStamp


x add version
x make it work on vercel

x clean the code

x set up endpoint and configure database
x finalize the webhook logic
  x listen for checkout.session
    x create a trasanction api endpioint and send data to it
    x get payment_intent and fetch the payment data
    x update database with sessionStamp etc
    x see TODO below
    x DO NOT set settimeout on the thank you page but on server that fetches the data when page is loading
x fetch transaction data on thank you page

x add env variables to vercel

x make sure all works without connection to stripe

x create a failed payment page

x how to connect user to payment?
  x Can I use the session id or do something in the session endpoint??

x create a webhook to retrieve the payment and add to user data in database
  x for now just log the payment data to console
    x rest comes when login and db is in place

x move endpoint URLS to env variables

x show payment details in thank you page - possible -> yes, use sessionStamp

x add text on basket under payment button
  x "By clicking the button you will be redirected to Stripe to complete the payment"

x research: how to do a full payment circle with stripe?
  x test the logic

x show basket in header with number of items
x Show how many items are added to basket in the header

x Create logic for handling selected product and add to basket
x create a product page
x fake the payment process
x product name should be a link to product page

x filtering on category
x check the assignment file -> have I missed something?

x make the different pages
  x check footer for pages

x add filtreing on category, title and description
    x add two more products 1. honey and 1. bee
    x add useDebounce -> see previous code
    x create a search action function
      x search on category
      x title
      x description
    x create a search component
      x input field
      x category dropdown

x mock the whole flow
  x add payment details component
  x add payment api endpoint
  x add thank you page
  x clear localstorage

x handle refresh of page
  x fetch basket from localstorage
  x add tests

x remove product from basket
x summarize price in basket
x add button "go to payment"

x go to product page
  x fetch product data
  x check if count data already exists
  x add product to basket


x add product to basket
  x context
x create basket component

x Show products list
  x add "add to basket" button"
x Create basket component
