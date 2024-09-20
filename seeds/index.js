const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers')
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error" , console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected")
});

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0 ; i<200 ; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20)+10;
        const camp = new Campground({
            author: '66e2fd1dc5bcef4f9eb12c84',
            location: `${cities[random1000].city} , ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            // image: `https://picsum.photos/400?random=${Math.random()}`,
            geometry: {
              type: "Point",
              coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude,
              ]
          },
            images :  [
                {
                  url: 'https://res.cloudinary.com/dlumzwx2z/image/upload/v1726561772/yelpcamp/jpf2jjbuzie4jtqbaugo.jpg',
                  filename: 'yelpcamp/jpf2jjbuzie4jtqbaugo',
                },
                {
                  url: 'https://res.cloudinary.com/dlumzwx2z/image/upload/v1726561775/yelpcamp/hhrfnh9s5m6k5daklmel.jpg',
                  filename: 'yelpcamp/hhrfnh9s5m6k5daklmel',
                }
              ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum aperiam at qui veritatis exercitationem amet, corrupti maiores fugit iste incidunt autem dolorem provident aliquid sit ea rerum, perferendis sed fuga.',
            price

        })
     await camp.save();
    }
}

seedDB();