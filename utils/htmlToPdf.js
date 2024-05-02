const puppeteer = require("pdf-puppeteer");
const ejs = require("ejs");
const fs = require('fs')

function readEjs(template, data) {
    return new Promise((resolve, reject) => {
        try {
            // console.log(data)
            ejs.renderFile(`views/${template}.ejs`, data, (err, html) => {
                err ? reject(err) : resolve(html)
            })
        } catch (error) {
            reject(error)
        }
    })
}

/**
*    @param template - This is name of ejs file in views folder
*    @param data - data to render in ejs
*    @param orientation - orientation of pdf
*    @return - a promise: in resolve pdf buffer and in reject false 
*/
function makePdf(template, data, orientation = 'portrait') {
    const pdfOptions = {
        format: 'A4',
        landscape: orientation.toLowerCase() === 'landscape'
    };
    // console.log(data);
    return new Promise(async (resolve, reject) => {
        const html = await readEjs(template, data)
        puppeteer(html, (pdf) => {
            // console.log(26, pdf);
            resolve(pdf);
            return;
        }, pdfOptions, {
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
            ],
            headless: 'new'
        });
    });
}

// module.exports = { makePdf }
module.exports = makePdf;