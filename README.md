
A fully working shop with all that is needed to start selling stuff like honey and bees.

# Prerequisites

Node version `18`  is required to run this project. You can use [nvm](https://github.com/nvm-sh/nvm) to install and manage node versions.


# Getting Started

```bash

  # set propper node version -> v18
  nvm use

  # install dependencies
  npm i

  # run dev server -> http://localhost:3000
  npm run dev

  # run tests
  npm run test

  # run tests in watch mode
  npm run test:watch

  # set version (major, minor, patch)
  npm run release


```



# Vercel

- Staging: [bee-shop-git-develop-milosz.vercel.app](bee-shop-git-develop-milosz.vercel.app)


# Testing
This project uses jest for testing. To run tests use `npm run test` or `npm run test:watch` to run tests in watch mode.


# Deployment

- versioning



## Staging

## Production
...



---
# --- NOTES ---




Integrated with
Stripe
…

- Installed nextjs `npx create-next-app@latest`
- added nvm https://github.com/nvm-sh/nvm

- added cookie banner -> how to test?


# fetching products from stripe

```javascript
  const url = 'https://api.stripe.com/v1/products?limit=3';
  const options = {
    method: 'GET',
    headers: {
      'Authorization': 'Basic ' + Buffer.from('sk_test_xxxxx:').toString('base64')
    }
  };
```


Filtering from stripe


  encodeURIComponent("name:'alpine' OR active:'true'");@

  https://api.stripe.com/v1/products/search?query=name%3A'alpine'%20OR%20active%3A'true'



# Stripe
[DOC](https://stripe.com/docs/payments/checkout/pricing-table#embed)

TEST CARD: 4242424242424242

Stripe cli: https://github.com/stripe/stripe-cli

```
  # Proxy for stripe webhook

  stripe listen --forward-to http://localhost:3000/api/payment-webhook

  # Listen for logs

  stripe logs tail


  # Trigger a test webhook not using app
  stripe trigger customer.subscription.created

```

## Payment flow
- user selects product
- user initiates payment (client) -> session is created on the server from a POST request from the client 
  -> sessionStamp is added to success url and metadata 
- client gets session id and redirects to checkout page from Stripe
- user completes payment on stripe
- user is redirected to thank you page
  -> transaction data is fetched based on the sessionStamp in the return url
    -> a 3 second timeout is added to the thank you page to make sure that the webhook has time to update the order on the user 
- server gets webhook from stripe and updates order on user in the database
- user can see order in profile page


# Mongodb


```JavaScript
  // Connectiong to the mongodb
  import { connectToDatabase } from "@/utils/connectToDatabase";

  const { client } = await connectToDatabase();
  const db = client.db(`${process.env.MONGODB_CLIENT_DB}`);

  const collection = db.collection(
    `${process.env.MONGODB_CLIENT_COLLECTION_TRANSACTIONS}`
  );
```


# Tech used

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


- github actions- tailwindcss
- nextjs
- vercel

- stripe
- mongodb
- auth0


# Versions:
0.1.0 -> initial commit
0.1.1 -> show products, show product details, add to basket logic
0.1.2 -> added localstorage logic and "golden path" flow from selecting product to payment and thank you page
0.1.3 -> fixed some build issues on vercel
0.1.4 -> Filter on category
0.1.5 -> Add some nice components from tailwindui