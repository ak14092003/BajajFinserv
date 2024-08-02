const express = require('express');
const router = express.Router();

const USER_ID = "john_doe_17091999";
const EMAIL = "john@xyz.com";
const ROLL_NUMBER = "ABCD123";

const isNumber = (item) => {
    return !isNaN(item);
};

const isAlphabet = (item) => {
    return /^[a-zA-Z]$/.test(item);
};

router.post('/', (req, res) => {
    try {
        const data = req.body.data;

        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                message: 'Invalid input'
            });
        }

        const numbers = data.filter(isNumber);
        const alphabets = data.filter(isAlphabet);
        const highestAlphabet = alphabets.length > 0 ? [alphabets.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' })).pop()] : [];

        res.json({
            is_success: true,
            user_id: USER_ID,
            email: EMAIL,
            roll_number: ROLL_NUMBER,
            numbers: numbers,
            alphabets: alphabets,
            highest_alphabet: highestAlphabet
        });
    } catch (error) {
        res.status(500).json({
            is_success: false,
            message: 'Server error'
        });
    }
});

router.get('/', (req, res) => {
    res.json({ operation_code: 1 });
});

const app = express();
app.use(express.json());
app.use('/.netlify/functions/api', router);

module.exports.handler = require('serverless-http')(app);
