const { countBills } = require("../databaseFunction/billQuery");

async function generateInvoiceNumber(userId) {
  try {
    // Count the number of existing bills for the user
    let count = await countBills(userId);
    if (typeof count !== 'number' || count < 0) {
      throw new Error('Invalid bill count');
    }

    // Get the current date and format the year and month
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString().slice(-2);
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');

    // Generate the invoice number with padding for the count
    const invoiceNo = `${year}/${month}/INV/${String(count + 1).padStart(3, '0')}`;
    return invoiceNo;
  } catch (error) {
    console.error('Error generating invoice number:', error);
    throw error;  // Re-throw the error after logging
  }
}

module.exports = generateInvoiceNumber;
