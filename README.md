# StockMarketdata
Allow multiple users to perform some operations including build update concurrently

## Development
Please follow these instructions to start server 
<ul>
<li>Download and Install Node.Js <b>v12.18.3</b> from this link: <a href="https://nodejs.org/en/download/">Download Node.Js</a></li>
<li>Follow this instruction to install MongoDB <b>v4.4.0</b>: <a href="https://docs.mongodb.com/manual/installation/">Install MongoDB</a></li>
<li>Set <code>NODE_ENV</code> to <code>development</code></li>
<li>Cd to project directory and execute <code>npm install</code></li>
<li>run <code>npm start</code></li>
</ul>

## Production
Please follow these instructions use docker to deploy server
<ul>
<li>Install docker from this link: <a href="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwjeseKVk9nrAhVUj3IEHTVuBXQQFjABegQIAhAB&url=https%3A%2F%2Fdocs.docker.com%2Fengine%2Finstall%2F&usg=AOvVaw3oxUtu6GW_HNWz3ZCPMLU_">Install Docker</a> </li>
<li>Cd to project directory and execute <code>npm run build</code></li>
</ul>

## Finally
The server will start at port 9090 and is accessible via this <a href="http://localhost:9090">link</a><br>
Note that the API to insert data and fetch data from the database is REST 




