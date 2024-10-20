const http = require('http');

// Sample users data
let users = [
  { "id": 1, "name": "Alice Johnson", "email": "alice@example.com", "age": 25, "phoneNumber": "123-456-7890", "address": "123 Elm St", "role": "admin" },
  { "id": 2, "name": "Bob Smith", "email": "bob@example.com", "age": 30, "phoneNumber": "987-654-3210", "address": "456 Oak St", "role": "user" },
    { "id": 3, "name": "Charlie Brown", "email": "charlie@example.com", "age": 22, "phoneNumber": "555-555-5555", "address": "789 Pine St", "role": "user" },
    { "id": 4, "name": "David Green", "email": "david@example.com", "age": 28, "phoneNumber": "444-444-4444", "address": "101 Maple St", "role": "admin" },
    { "id": 5, "name": "Eva White", "email": "eva@example.com", "age": 27, "phoneNumber": "333-333-3333", "address": "202 Cedar St", "role": "user" },
    { "id": 6, "name": "Frank Black", "email": "frank@example.com", "age": 35, "phoneNumber": "222-222-2222", "address": "303 Birch St", "role": "user" },
    { "id": 7, "name": "Grace Blue", "email": "grace@example.com", "age": 29, "phoneNumber": "111-111-1111", "address": "404 Willow St", "role": "admin" },
    { "id": 8, "name": "Hank Grey", "email": "hank@example.com", "age": 26, "phoneNumber": "666-666-6666", "address": "505 Ash St", "role": "user" },
    { "id": 9, "name": "Ivy Purple", "email": "ivy@example.com", "age": 24, "phoneNumber": "777-777-7777", "address": "606 Spruce St", "role": "user" },
    { "id": 10, "name": "Jack Yellow", "email": "jack@example.com", "age": 31, "phoneNumber": "888-888-8888", "address": "707 Walnut St", "role": "admin" }
];

const server = http.createServer((req, res) => {
  const { method, url } = req;

  // Home route
  if (url === '/' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE', 'Access-Control-Allow-Headers': 'Content-Type' });
    res.end('Welcome to our User Management Board!');
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

  // POST new user
  else if (url === '/users' && method === 'POST') {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      const { id, name, email } = JSON.parse(body);
      const newUser = { id, name, email };
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
