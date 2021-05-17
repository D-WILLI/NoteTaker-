const express = require('express');
const fs = require ('fs'); 

// express server 
const app = express();

// port
const PORT = process.env.PORT || 4000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/assets',express.static('./assets'));



// ROUTER

require('./routes/htmlRoutes')(app);
require('./routes/apiRoutes')(app); 


// LISTENER
// The below code effectively "starts" our server

app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
