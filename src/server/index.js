const express = require('express');

const app = express();

app.use(express.static('dist'));
app.get('/api', (req, res) => res.send({ data: "hello" }));
app.listen(8080, () => console.log('Listening on port 8080!'));