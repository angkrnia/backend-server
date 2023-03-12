const express = require('express');
const cors = require('cors');

const route = require('./route');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(
    '/',
    express.urlencoded({
        extended: false,
    })
);

route(app);

app.listen(port, () => {
    console.log(`This app is listening on port ${port} - Kawah Edukasi`);
});
