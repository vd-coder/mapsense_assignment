# mapsense_assignment
## Docker Image
To run sever as docker container,<br>
`` docker run -p 3000:3000 -e PORT=3000 -e SECRET_KEY="thiissecret" -e DB_CONN="connectdb" dawravaibhav/mapsense``
## Environment Variables
   <ol>
     <li>PORT (Optional) : Port on which sever will run</li>
     <li> SECRET_KEY (Compulsory) : Key to generate and validate JWT tokens</li>
     <li> DB_CONN (Compulsory) : Connection string to connect to MongoDB </li>
   </ol>

   
