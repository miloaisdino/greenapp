# EcoRewards
By Keith Ong (keith_ong@u.nus.edu) and Maximus Tan (maximus@u.nus.edu)

## Motivation 

There is an increasing amount of concern over environmental damage that humans are causing over the years. We want to do our part in saving the environment by incentivising users to be more environmentally-friendly through the use of our app. Offering rewards for recycling is a powerful motivator, and we hope to increase participation rates through this incentive.


## Aim 

With growing worries about how humans harm the environment, we want to help by encouraging people to be greener with our app. We're offering rewards for recycling to get more people involved. Our aim is to make a big change in how we all treat the planet, so it stays healthy for years to come. With our app, we hope to encourage users to be greener and create a positive feedback loop where users feel rewarded for their eco-friendly actions.


## User Stories

As an environmentally conscious user who wants to do their part in saving the environment, I want to be able to log my recycling records through the application.
As a rewards centered user who wants to earn rewards, I want to be able to claim rewards through the application using my points.
As a business owner committed to corporate social responsibility, I want to partner with the app to offer exclusive rewards or promotions to users, enhancing my brand’s image.





## Features

- Feature 1 (core): Scan the QR code at participating recycling bins to log a disposal (geolocation)
- Feature 2 (core): Points leaderboard
- Feature 3 (core): CRUD features for account, points and redemption
- Feature 4 (extension): Port over to an mobile application (probably android)
- Feature 5 (extension): Merchant dashboard & analytics and adding points to NUS Smart Dining
- Feature 6 (extension): Using AI api (Clarifai) to identify trash, can explore doing the pipeline ourselves if there are extra time
- Feature 7 (extension): Using our mobile app to scan QR code
- Feature 8 (extension): Verify user is near to the bin and find nearby bins 


## Tech Stack

### Web
- React
- TailwindCSS
- Toast
- Eslint & Prettier
- Express.js
- Postgresql (supabase)
- Redis
- RabbitMQ

### Mobile app
- React Native
- TailwindCSS
- Reusing backend and database from Web

