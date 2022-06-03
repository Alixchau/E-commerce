# Lola E-commerce Web Application

### [Live Site] (https://e-commerce-mern-deploy.herokuapp.com/)


<img src="https://i.ibb.co/ZG0BxMM/Screenshot-2022-05-30-234719.png" alt="Screenshot-2022-05-30-234719" border="0">
### [watch the video demo](https://youtu.be/i6pFppFDyNE)

## Introduction

Lola is a responsive full stack E-commerce shopping site, it allows users can browse products by category/color/size and sort them, manage shopping cart and view their orders after payment.

You can register a new account or use below test account for this site</br>
test account: kk </br>
password: 123

### Other Functionalities

1. User authentication
2. New user registration
3. Browse products by categories
4. Filter products by size, color
5. Sort items by time or price
6. Payment by Stripe API
7. Instant update on UI for cart & order data
8. Responsive design 

### Technology used

1. React
2. Redux Toolkit
3. Styled Components
4. Node
5. Express
6. MongoDB
7. Stripe Api for payment
8. CyptoJS for user password encryption

### Setup: 

1. Clone both frontend and api repository 
2. Add env variable as below
   1. MONGO_URL (MongoDB connection string)
   2. SECRET_PASSPHRASE (for CryptoJS password encryption)
   3. JWT_SECRET 
   4. STRIPE_KEY (Stipe api private key)
3. Run npm start on both api and frontend



