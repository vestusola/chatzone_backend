let express = require('express');
let cors = require('cors');
let bodyParser = require("body-parser");
let app = express();
let helmet = require('helmet');

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes
let api = require("./routes/api");

app.use('/api/v1', api);

// Set Port
let port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});