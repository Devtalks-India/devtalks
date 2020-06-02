const { google } = require('googleapis');
const express = require('express');
const app = express();

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('Listening!', port);
});

app.get('/', async (req, res) => {
    res.send('DevTalks-Events-API');
});

/*
app.get('/hello', async (req, res) => {
    const name = req.query.name;
    const result = `Hello ${name}\n\n`;
    res.send(result);
});
*/

app.get('/events', async (req, res) => {
    const events = await getApi('events');
    let retval;
    if (events) {
        retval = {
            status: 'success',
            data: { events: events }
        }
    } else {
        retval = {
            status: 'error',
            data: { events: 'nothing' }
        }
    }
    getRes(retval);
});

function getRes(retval) {
    res.setHeader('content-type', 'application/json');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,GET');
    res.send(JSON.stringify(retval));
}

async function getApi(type = 'events') {
    const auth = await google.auth.getClient({
        scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });

    const api = google.sheets({ version: 'v4', auth });
    if(type == 'events') {
        const response = await api.spreadsheets.values.get({
            spreadsheetId: '1e2GXQAvCEeJ-iUtQzTCSI_US-6Hh1K_22rYbbokyzj0',
            range: 'Events!A:F'
        });

        let frow = true;
        let past = [];
        let upcoming = [];
        for (let row of response.data.values) {
            if(frow) {
                frow = false;
                continue;
            }
            if(row[5] == 'Disabled') {
                continue;
            }
            if(row[3] == 'Past') {
                    past.push({
                        title: row[0],
                        date: row[1],
                        speaker: row[2],
                        link: row[4]
                    });
            } else {
                upcoming.push({
                title: row[0],
                date: row[1],
                speaker: row[2],
                link: row[4]
                });
            }
        }
        return {past: past, upcoming: upcoming};
    }
}
