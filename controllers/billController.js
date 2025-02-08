const { countBills, getAllBill, getBill, addBillToDatabase } = require('../databaseFunction/billQuery');
const makePdf = require('../utils/htmlToPdf');
const { PassThrough } = require('stream');
const generateInvoiceNumber = require('../utils/invoiceNo');

async function getNewInvoiceNumber(req, res) {
    try{
        const invoiceNo = await generateInvoiceNumber(req.session._id);
        res.status(200).json({ invoiceNo: invoiceNo });
    }
    catch (err) {
        res.status(500).send("error");
    }
}

function historyOfBills(req, res) {
    getAllBill(req.session._id).then(function (bills) {
        res.status(200).json(bills);
    }).catch(err => {
        res.status(500).send("error");
    })

}

async function newBill(req, res) {
    const body = req.body;
    try {
        if (!body.invoiceNo){
            body.invoiceNo =await generateInvoiceNumber(req.session._id);
        }
        addBillToDatabase({ invoiceNo: body.invoiceNo, billdetails: body.billdetails, billItems: body.billItems, grandTotal: body.grandTotal, date: body.date, billedBy: req.session._id }).then(async function (bill) {
            try {
                const pdf = await makePdf('bill', bill);
                const pdfStream = new PassThrough()
                pdfStream.end(pdf)
                res.set({
                    'Content-Type': 'application/pdf',
                    'Content-Disposition': `attachment; filename="bill ${bill.invoiceNo}.pdf"`
                });
                pdfStream.pipe(res)
                return;
            } catch (error) {
                console.log(101, error);
                res.status(500).send("ERROR");
            }
            // res.status(200).json(bill);
        }).catch(function (err) {
            console.log(106, err)
            res.status(500).send("ERROR");
        });
    } catch (error) {
        console.log(110, error)
        res.status(500).send("ERROR");
    }
}

async function getBillPdf(req, res) {
    try {
        const invoiceNo = req.query.invoiceNo;
        if (typeof (invoiceNo) != "string") {
            res.status(500).send(error);
        }
        const billData = await getBill(invoiceNo)
        // console.log(billData);
        if (!billData) {
            res.status(500).send(error);
        }
        const pdf = await makePdf('bill', billData);
        // console.log(16,pdf);
        // res.setHeader("Content-Type", "application/pdf");
        // res.send(pdf);

        const pdfStream = new PassThrough()
        pdfStream.end(pdf)
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="bill ${invoiceNo}.pdf"`
        });
        pdfStream.pipe(res)
        return;
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    getNewInvoiceNumber,
    historyOfBills,
    newBill,
    getBillPdf
}