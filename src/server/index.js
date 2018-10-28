const express = require('express');

const app = express();

app.use(express.static('dist'));
app.get('/', (req, res) => res.send());
app.listen(8080, () => console.log('Listening on port 8080!'));