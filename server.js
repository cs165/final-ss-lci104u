const express = require('express');
const bodyParser = require('body-parser');
const googleSheets = require('gsa-sheets');
const exphbs = require('express-handlebars');

// TODO(you): Update the contents of privateSettings accordingly, as you did
// in HW5, then uncomment this line.
// const key = require('./privateSettings.json');

// TODO(you): Change the value of this string to the spreadsheet id for your
// GSA spreadsheet, as you did in HW5, then uncomment these lines.
// const SPREADSHEET_ID = '__YOUR__SPREADSHEET__ID__HERE__';
// const sheet = googleSheets(key.client_email, key.private_key, SPREADSHEET_ID);

const app = express();
const hbs = exphbs.create();
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
const jsonParser = bodyParser.json();

app.use(express.static('public'));

async function  goStart(req, res) {
  res.render('index');
}
app.get('/', goStart);

function born() {
  var d = Date.now();
  if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
    d += performance.now(); //use high-precision timer if available
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}
app.get('/id',born);

async function  goEdit(req, res) {
  res.render('edit');
}
app.get('/id/:id', goEdit);
// TODO(you): Add at least 1 GET route and 1 POST route.

// Please don't change this; this is needed to deploy on Heroku.
const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Server listening on port ${port}!`);
});
