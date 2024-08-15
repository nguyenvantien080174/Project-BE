const express = require('express');
const app = express();
const PORT = 3000;

const admin = require ('./src/routes/admin');
const RequestEditor = require('./src/routes/request-editor.router')

app.get('/', (req, res) => {
    res.send('Hello world!!!!');
})
app.use('/api', admin);
app.use('/api', RequestEditor);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});