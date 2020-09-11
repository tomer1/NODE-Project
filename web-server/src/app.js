const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();
const publicDirectory = path.join(__dirname, '../public/');
const viewsPath = path.join(__dirname, '../templates/views/');
const partialsPath = path.join(__dirname, '../templates/partials/');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to server
app.use(express.static(publicDirectory));

app.get('', (req, res) => {
  res.render('index', {
    title: 'this is index ',
    name: 'Tomer Mor',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Tomer Mor',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help ',
    name: 'Tomer Mor',
  });
});

app.get('/weather', (req, res) => {
  res.send({ forecast: "it's snowing", location: 'Israel' });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    errorMsg: 'Help article  not found',
  });
});
app.get('*', (req, res) => {
  res.render('404', {
    errorMsg: 'Page not found',
  });
});

app.listen(3000, () => {
  console.log('Server is up in port 3000');
});
