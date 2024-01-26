
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

# Testing
This project uses jest for testing. To run tests use `npm run test` or `npm run test:watch` to run tests in watch mode.


# Deployment

## Staging

## Production




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




# Tech used

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


