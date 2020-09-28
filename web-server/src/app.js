const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

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
console.log("dd");
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
  if (!req.query.address) {
    return res.send({ error: 'You must provide a address query' });
  }

  geocode(req.query.address, (error, response) => {
    if (error) {
      return res.send({ error: error });
    }
    const { location, latitude, longitude } = response;
    fore
    cast(latitude, longitude, (error, response) => {
      if (error) {
        return res.send({ error: error });
      }

      return res.send({ forecast: response, location: location, address: req.query.address });
    });
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({ error: 'You must provide a search query' });
  }
  res.send({ products: [] });
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
