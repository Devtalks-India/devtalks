const { google } = require('googleapis');
const express = require('express');
const app = express();
const path = require('path');

const port = process.env.PORT || 8080;
app.use(express.static('public'));
app.listen(port, () => {
    console.log('Listening!', port);
});

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'../build/index.html'));
});

/*
app.get('/hello', async (req, res) => {
    const name = req.query.name;
    const result = `Hello ${name}\n\n`;
    res.send(result);
});
*/

app.get('/events', async (req, res) => {
    const events = await getRow();
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
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,GET');
    res.send(JSON.stringify(retval));
});

async function getRow() {
    const auth = await google.auth.getClient({
        scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });

    const api = google.sheets({ version: 'v4', auth });
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
                link: row[4],
                id: row[6],
            });
	} else {
	    upcoming.push({
		title: row[0],
		date: row[1],
		speaker: row[2],
		link: row[4],
                id: row[6],
	    });
	}
    }
    return {past: past, upcoming: upcoming};
}


app.get('/speakers', async (req, res) => {
    const speakers = await getSpeakers();
    let retval;
    if (speakers) {
        retval = {
            status: 'success',
            data: { speakers: speakers }
        }
    } else {
        retval = {
            status: 'error',
            data: { speakers: 'nothing' }
        }
    }
    res.setHeader('content-type', 'application/json');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,GET');
    res.send(JSON.stringify(retval));
});

async function getSpeakers() {
    const auth = await google.auth.getClient({
        scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });

    const api = google.sheets({ version: 'v4', auth });
    const response = await api.spreadsheets.values.get({
        spreadsheetId: '1e2GXQAvCEeJ-iUtQzTCSI_US-6Hh1K_22rYbbokyzj0',
        range: 'Speakers!A:F'
    });

    let frow = true;
    let speakers = [];
    for (let row of response.data.values) {
        if(frow) {
            frow = false;
            continue;
        }
        if(row[6] == 'Disabled') {
            continue;
        }
        speakers.push({
            name: row[0],
            twitter: row[1],
            linkedin: row[2],
            github: row[3],
            personal: row[4],
            photo: row[5]
        });
    }
    return speakers;
}

