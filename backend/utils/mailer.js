const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendOrderNotification(order, orderId) {
  const itemsList = order.items
    .map((i) => `- ${i.name} (Rs. ${i.price})`)
    .join('\n');

  const mailOptions = {
    from: `"MKR Store" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    subject: `New Order Received — #${orderId}`,
    text: `
A new order has been placed on MKR Store.

Order ID: #${orderId}
Customer Name: ${order.customer_name}
Phone: ${order.phone}
Address: ${order.address}
City: ${order.city || 'N/A'}

Items:
${itemsList}

${order.plate_text ? `Custom Plate Text: ${order.plate_text}\nPlate Color: ${order.plate_color}` : ''}

Total: Rs. ${order.total}
Payment Method: NayaPay (pending verification)

Please contact the customer to confirm payment and proceed with the order.
    `,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { sendOrderNotification };