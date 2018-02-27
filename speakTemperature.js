const AWS = require('aws-sdk');
const Speaker = require('speaker');

function speakTemperature(temp) {
  const polly = new AWS.Polly();
  polly.synthesizeSpeech(
    {
      OutputFormat: 'pcm',
      SampleRate: '16000',
      Text: 'All Gaul is divided into three parts',
      TextType: 'text',
      VoiceId: 'Joanna'
    },
    (err, data) => {
      if (err) {
        console.log('Error getting speech data', err);
      } else {
        const speaker = new Speaker({
          sampleRate: 8000,
          channels: 2,
          bitDepth: 16
        });

        speaker.write(data.AudioStream);
      }
    }
  );
}

require('dotenv').config();
speakTemperature(20);

module.exports = speakTemperature;
