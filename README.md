
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


# Tech used

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


- github actions
- tailwindcss
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