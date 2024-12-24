<!-- /-------------------------------------------------- -->

# An introduction to the project

This project is meant for a starter template for any project.

#### (about the path system)

- the (auth) is holding the signup and login folders with a layout checking if there is a user.
- the (authenticate-path) is holding the folders which verified users can go to
- the (path) is holding the folders which any user can go to.
- the (admin) is holding the admin rights only

#### (about the packages)

- icons = lucide-react, mui
- shadcn = manage ui components
- state manager = redux


#### (about auth controllers)

- in the boiler-plate-controllers/auth-controls.tsx
- Control which authentication you want to add to your app. Just set it to `true` then you are good to go

## Payment Systems

Adding the following payment systems to the app;

#### Stripe

- you can add your stripe product id in the .env.local file.
- change the "loggedUser.id" in the checkout_subscribe_session and checkout_one_time_session routes with current user id.
- Set up subscription payment. (checkout_subscribe_session is holding the subscription payment)
- Set up one time payment (checkout_one_time_session is holding the one time payment)

- After successful payment, user is redirected to the success page
- If payment is failed, user is redirected to the failed page

#### Google pay

#### Paystack

- Add paystack payment

## (about the colors)

- Give the variable name of your colors in the tailwind.config.ts file.
- Select the color from the "default" section in the tailwind.config.ts file.
- Set the colors in the globals.css file. and start using it.


## (backend as a service)
Using the firebase for the backend for the main branch
- database = firebase
- auth = firebase

Using the appwrite for the backend for the appwrite-branch branch
- database = appwrite
- auth = appwrite