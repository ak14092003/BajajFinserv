const express = require('express');
const router = require('./functions/api');
const cors = require('cors')

app.use(cors())

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/bhfl', router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
