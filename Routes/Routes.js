const Express = require('express')
const Routes = Express.Router()
const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const path = require('path')

const SCOPES = ['https://www.googleapis.com/auth/drive']
const TOKEN_PATH = require('../token.json');
const CREDENTIALS = require('../credentials.json')

const oauthclient2 = new google.auth.OAuth2(
    CREDENTIALS.client_id, CREDENTIALS.client_secret, CREDENTIALS.redirect_uri
)
oauthclient2.setCredentials({ refresh_token: CREDENTIALS.refresh_token })
const drive = google.drive({
    version: 'v3',
    auth: oauthclient2
})

Routes.get('/google-drive', async (req, res) => {
    try {
        const listFile = await drive.files.list({})
        console.log(listFile.data.files)
        res.send(listFile.data.files)
    } catch (error) {
        console.log(error.message)
        res.send('get')
    }
    
})

Routes.get('/google-drive/:id', async (req, res) => {
    let id = '1FmFH1_Wa3k6Mj5WwoPjyfoWZqC82dY5C'
    try {
        let getFile = await drive.files.get({ fileId: id })
        .then(response => response).catch(err => false)
        if ( !getFile ) {
            res.sendStatus(500)
        } else {
            res.send(getFile)
        }
    } catch (error) {
        console.log(error.message)
        res.send('get')
    }
})

Routes.post('/google-drive', async (req, res) => {
    try {
        const createFile = await drive.files.create({
            requestBody: {
                name: 'sa',
                mimeType: 'image/jpg',
                parent: ['1Qe0TQC4tTQp4GjSb817T9PLTljMXaVHg']
            },

            media: {
                mimeType: 'image/jpg',
                body: fs.createReadStream(path.join(__dirname, 'sa.jpg'))
            },

            fields: 'id'
        })

        console.log(createFile)
        res.send('success')
    } catch (error) {
        console.log('error')
        console.log(error.message)
    }
})

module.exports = Routes