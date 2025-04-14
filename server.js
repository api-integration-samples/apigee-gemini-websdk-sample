// src/index.ts
const express = require('express');
const app = express();
// json middleware
app.use(express.json());
app.use(express.static('public'));
const port = 8080;

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.post('/', function(request, response){
  console.log(request.body);      // your JSON
  response.send(request.body);    // echo the result back
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});