# PHA
MVP project that uses [NASA's Asteroids - NeoWs](https://api.nasa.gov) to track Potentially Hazardous Asteroids. 

## How PHA works
1. Calls NASA's NeoWs API and filters astroids with the property `is_potentially_hazardous_asteroid : true`
2. Astroids are stored in a MongoDB collection because NASA's NeoWs is limited 7 day periods.

## Getting Started
```
npm install
npm build
npm start
```
open [localhost:3000](http://localhost:3000) in your browser

