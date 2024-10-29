const express = require('express');
const app = express();

app.get('/', (req, res) => {
    console.log(req.body);
    res.send('this is our first express server');
})

// get
// post
// put
// delete
// all
// use




app.listen(5000, () => {
    console.log('server listening on port 5000...')
});