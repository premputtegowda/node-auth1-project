const server = require('./server.js');

const port = 4007;

server.listen(port, () => console.log(`server runnign on ${port}`))