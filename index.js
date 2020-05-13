const { google } = require('googleapis');
const express = require('express');
const app = express();

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('Listening!', port);
});

app.get('/', async (req, res) => {
    res.send('Rotify!');
});

app.get('/hello', async (req, res) => {
    const name = req.query.name;
    const result = `Hello ${name}\n\n`;
    res.send(result);
});

app.get('/s/:rid', async (req, res) => {
    const rowid = req.params.rid;
    const row = await getRow(rowid);
    let retval;
    if (row) {
        retval = {
            status: 'success',
            data: { row: row }
        }
    } else {
        retval = {
            status: 'error',
            data: { row: 'nothing' }
        }
    }
    res.setHeader('content-type', 'application/json');
    res.send(JSON.stringify(retval));
});

async function getRow(id) {
    const auth = await google.auth.getClient({
        scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });

    const api = google.sheets({ version: 'v4', auth });
    const response = await api.spreadsheets.values.get({
        spreadsheetId: '16Icc4k8p8e5lqr53ImieUKNQjV4getadDRxhY9bZWyc',
        range: 'Points!A:D'
    });

    for (let row of response.data.values) {
        if (row[0] == id) {
            return {
                id: row[0],
                point: row[1],
                team: row[2],
                added: row[3],
                closed: row[4]
            };
        }
    }
}