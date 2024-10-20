const http = require('http');

// Sample users data (could be replaced with a database)
let users = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Doe", email: "jane@example.com" },
  // More sample users can be added here
];

// Function to generate the next user ID
const getNextUserId = () => {
  if (users.length === 0) {
    return 1; // If there are no users, start from ID 1
  }
  return Math.max(...users.map(user => user.id)) + 1; // Get the highest ID and add 1
};

const server = http.createServer((req, res) => {
  const { method, url } = req;

  // Home route
  if (url === '/' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE', 'Access-Control-Allow-Headers': 'Content-Type' });
    res.end('Welcome to our User Management API!');
  }

  // GET all users
  else if (url === '/users' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE', 'Access-Control-Allow-Headers': 'Content-Type' });
    res.end(JSON.stringify(users));
  }

  // GET single user by ID
  else if (url.match(/\/users\/\d+/) && method === 'GET') {
    const id = url.split('/')[2];
    const user = users.find(u => u.id === parseInt(id));

    if (user) {
      res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE', 'Access-Control-Allow-Headers': 'Content-Type' });
      res.end(JSON.stringify(user));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User not found' }));
    }
  }

  // POST new user (without ID)
  else if (url === '/users' && method === 'POST') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const { name, email } = JSON.parse(body);
      const newUser = { id: getNextUserId(), name, email };
      users.push(newUser);

      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newUser));
    });
  }

  // PUT update user by ID
  else if (url.match(/\/users\/\d+/) && method === 'PUT') {
    const id = url.split('/')[2];
    const user = users.find(u => u.id === parseInt(id));

    if (user) {
      let body = '';

      req.on('data', chunk => {
        body += chunk.toString();
      });

      req.on('end', () => {
        const { name, email } = JSON.parse(body);
        user.name = name || user.name;
        user.email = email || user.email;

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(user));
      });
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User not found' }));
    }
  }

  // DELETE user by ID
  else if (url.match(/\/users\/\d+/) && method === 'DELETE') {
    const id = url.split('/')[2];
    users = users.filter(u => u.id !== parseInt(id));

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'User deleted' }));
  }

  // Route not found
  else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
});

// Listen on dynamic port or default port 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
