const http = require('http');
const fs = require('fs');

// Load users from users.json (simulating a database)
let users = JSON.parse(fs.readFileSync('users.json', 'utf8'));

// Helper function to send JSON responses
function sendResponse(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*', // Allow CORS from any domain
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE', // Allowed methods
    'Access-Control-Allow-Headers': 'Content-Type' // Allowed headers
  });
  res.end(JSON.stringify(data));
}

// Create server
const server = http.createServer((req, res) => {
  const { method, url } = req;

  // GET all users
  if (method === 'GET' && url === '/users') {
    sendResponse(res, 200, users);

  // GET single user by userId
  } else if (method === 'GET' && url.startsWith('/users/')) {
    const id = parseInt(url.split('/')[2]);
    const user = users.find(u => u.id === id);
    if (user) {
      sendResponse(res, 200, user);
    } else {
      sendResponse(res, 404, { message: 'User not found' });
    }

  // POST new user
  } else if (method === 'POST' && url === '/users') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const newUser = JSON.parse(body);
      users.push(newUser);
      sendResponse(res, 201, { message: 'User added successfully', newUser });
    });

  // PUT update user by userId
  } else if (method === 'PUT' && url.startsWith('/users/')) {
    const id = parseInt(url.split('/')[2]);
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const updatedUser = JSON.parse(body);
      const index = users.findIndex(u => u.id === id);
      if (index !== -1) {
        users[index] = { ...users[index], ...updatedUser };
        sendResponse(res, 200, { message: 'User updated', user: users[index] });
      } else {
        sendResponse(res, 404, { message: 'User not found' });
      }
    });

  // DELETE user by userId
  } else if (method === 'DELETE' && url.startsWith('/users/')) {
    const id = parseInt(url.split('/')[2]);
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) {
      users.splice(index, 1);
      sendResponse(res, 200, { message: 'User deleted' });
    } else {
      sendResponse(res, 404, { message: 'User not found' });
    }

  // Handle unsupported routes
  } else {
    sendResponse(res, 404, { message: 'Route not found' });
  }
});

// Start the server on port 3000
server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
