const express = require('express');
const router = express.Router();
const { Resend } = require('resend');
const rateLimit = require('express-rate-limit');

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Rate limiting to prevent abuse
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message:
    'Too many contact form submissions from this IP, please try again later.',
});

// Contact form endpoint
router.post('/', contactLimiter, async (req, res) => {
  const { name, email, phone, company, message } = req.body;

  // Validate required fields
  if (!name || !email || !message) {
    return res.status(400).json({
      error: 'Name, email, and message are required fields.',
    });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      error: 'Please provide a valid email address.',
    });
  }

  try {
    // Compose email subject with name and email
    const subject = `Contact Form: ${name} <${email}>`;

    // Compose email body with all fields
    const htmlBody = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
      ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
      <hr>
      <h3>Message:</h3>
      <p>${message.replace(/\n/g, '<br>')}</p>
      <hr>
      <p style="color: #666; font-size: 12px;">
        This email was sent from the Business Solutions contact form at ${new Date().toLocaleString()}
      </p>
    `;

    const textBody = `
New Contact Form Submission

Name: ${name}
Email: ${email}
${phone ? `Phone: ${phone}` : ''}
${company ? `Company: ${company}` : ''}

Message:
${message}

---
This email was sent from the Business Solutions contact form at ${new Date().toLocaleString()}
    `;

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: `${process.env.MAIL_DEFAULT_NAME} <${process.env.MAIL_FROM}>`,
      to: process.env.MAIL_TO,
      subject,
      html: htmlBody,
      text: textBody,
      reply_to: email, // Set reply-to as the sender's email
    });

    if (error) {
      return res.status(500).json({
        error: 'Failed to send email. Please try again later.',
      });
    }

    // Also send a confirmation email to the user
    try {
      await resend.emails.send({
        from: `${process.env.MAIL_DEFAULT_NAME} <${process.env.MAIL_FROM}>`,
        to: email,
        subject: 'Thank you for contacting Business Solutions',
        html: `
          <h2>Thank you for reaching out!</h2>
          <p>Dear ${name},</p>
          <p>We have received your message and will get back to you within 24 hours.</p>
          <p>Here's a copy of your message:</p>
          <hr>
          <p>${message.replace(/\n/g, '<br>')}</p>
          <hr>
          <p>Best regards,<br>Business Solutions Team</p>
        `,
        text: `
Thank you for reaching out!

Dear ${name},

We have received your message and will get back to you within 24 hours.

Here's a copy of your message:
${message}

Best regards,
Business Solutions Team
        `,
      });
    } catch (confirmError) {
      // Don't fail the main request if confirmation email fails
      // Silently continue
    }

    res.status(200).json({
      success: true,
      message:
        'Your message has been sent successfully! We will get back to you soon.',
    });
  } catch (error) {
    return res.status(500).json({
      error:
        'An error occurred while sending your message. Please try again later.',
    });
  }
});

module.exports = router;
