const express = require('express');
const app = express();
const PORT = 3000;

const router = require('./src/routes/router')
app.get('/', (req, res) => {
    res.send('Hello world!!!!');
})
app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});