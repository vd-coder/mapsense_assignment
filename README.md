# Mapsense_Assignment
## Docker Image
To run sever as docker container,<br>
`` docker run -p 3000:3000 -e PORT=3000 -e SECRET_KEY="thiissecret" -e DB_CONN="connectdb" dawravaibhav/mapsense``
## Environment Variables
   <ol>
     <li>PORT (Optional) : Port on which sever will run</li>
     <li> SECRET_KEY (Compulsory) : Key to generate and validate JWT tokens</li>
     <li> DB_CONN (Compulsory) : Connection string to connect to MongoDB </li>
   </ol>

## Instructions
1) Clone the repository and setup .env file
2) Run  ``npm install``
3) Run ``npm start``

## Design Decisons
 1) MongoDB was used  instead of MySQL becasuse MongoDB allows easy scaling and faster queries.
 2) Express was used as framework for setting up HTTP sever as it allows to focus just on developing logic for application and not worry about managing issues about creating a server.

## [API Documentation](https://documenter.getpostman.com/view/25088960/2s9YyvB183)
