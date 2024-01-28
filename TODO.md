Bee Delight






# ====================
#
#       TODOs
#
# ====================


- add some tailwindui components
  - make sure a11y is taken care of
  - basket in header
  - components
    x products list
    - filter component
    x product page
    - basket
    - thank you page
    - header

- add end to end tests
  - add cypress

- test UU
  - make it possible to select a product to navigate to the product page

- move logic to utils
  - create tests

- add node version to pkg.json


- create some more products

----------------

- research: how to do a full payment circle with stripe?

- show basket in header with number of items
- Show how many items are added to basket in the header
- make sure UU is taken care of

- create a config file
- Integrate login

- create a mapper for products and prices fetched in action function

- create util for formatting price
  - show as 120,00 [currency]

- add loader

- make the app white
  - make sure all components are white
  - cookie banner too

- add some nice components from tailwindui

- explain the difference between rich and link product card

- clean the code

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

# Release -> prod
- create shop tenant in auth0 using the propper name of the app
- create images for "not found" and error page
- create propduction env in vercel
  - set auth0 for productino
  - fix env variables for production
- sitemap -> is the base url with or without wwww?
- do a production release


# Improvements
- add real flow
- snapshot testing / integration testing
- error message to user -> ex, payment failed
- handle validation of forms
- payment form state could be one state with an object
  -> but the card component would be third party
- DISCUSSION: when filtering on category, should search filter on category or on all products?
- price util that returns price based on currency, adds decimals, and makes sure the price is a number
  -> add good tests


# ====================
#
#       DONE
#
# ====================
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
