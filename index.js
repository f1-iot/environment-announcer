const Particle = require('particle-api-js');
const dotenv = require('dotenv');
const particle = new Particle();
const speakTemperature = require('./speakTemperature');

dotenv.config();

particle
  .login({
    username: process.env.PARTICLE_USERNAME,
    password: process.env.PARTICLE_PASSWORD
  })
  .then(
    function(data) {
      const token = data.body.access_token;
      watchForEvents(token);
    },
    function(err) {
      console.log('Could not log in.', err);
    }
  );

function watchForEvents(token) {
  particle
    .getEventStream({
      auth: token,
      name: 'environment',
      deviceId: 'mine'
    })
    .then(stream => {
      stream.on('event', data => {
        const { tf } = JSON.parse(data.data);
        outputTemperature(tf);
      });
    });
}

function outputTemperature(t) {
  console.log('Temperature', t);
  speakTemperature(t);
}
