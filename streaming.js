const fs = require('fs');

// Create a readable stream
const readStream = fs.createReadStream('./example.txt', { encoding: 'utf-8' });

// Listen for 'data' event to read chunks of data
readStream.on('data', (chunk) => {
  console.log('Received chunk:', chunk);
});

// Listen for 'end' event when streaming is complete
readStream.on('end', () => {
  console.log('Finished reading file.');
});

// Handle any errors
readStream.on('error', (error) => {
  console.error('Error reading file:', error);
});



const fs = require('fs');

// Create a readable stream
const readableStream = fs.createReadStream('./input.txt', { encoding: 'utf-8' });

// Listen for data chunks
readableStream.on('data', (chunk) => {
  console.log('Received chunk:', chunk);
});

// Listen for the end of the stream
readableStream.on('end', () => {
  console.log('No more data.');
});

// Handle any errors
readableStream.on('error', (error) => {
  console.error('Error:', error);
});
