const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

// Step 3: Define the listener
eventEmitter.on('sayHello', (name) => {
  console.log(`Hello, ${name}!`);
});

// Step 4: Emit the event
eventEmitter.emit('sayHello', 'Alice');
