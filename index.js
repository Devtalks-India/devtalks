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

app.get('/s/:rid', async (req, res) => {
    const rowid = req.params.rid;
    const events = await getRow(rowid);
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
    res.setHeader('content-type', 'application/json');
    res.send(JSON.stringify(retval));
});

async function getRow(id) {
    const auth = await google.auth.getClient({
        scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });

    const api = google.sheets({ version: 'v4', auth });
    const response = await api.spreadsheets.values.get({
        spreadsheetId: '1e2GXQAvCEeJ-iUtQzTCSI_US-6Hh1K_22rYbbokyzj0',
        range: 'Events!A:E'
    });

    let frow = true;
    let events = [push:[], upcoming:[]];
    for (let row of response.data.values) {
	if(frow) {
	    frow = false;
	    continue;
	}
	if(row[3] === 'past') {
            events.past.push({
                title: row[0],
                date: row[1],
                speaker: row[2],
                link: row[4]
            });
	} else {
	    events.upcoming.push({
		title: row[0].
		date: row[1].
		speaker: row[2].
		link: row[4].
	    });
	}
    }
    return events;
}
