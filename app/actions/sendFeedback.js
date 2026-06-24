'use server';
import nodemailer from 'nodemailer';

export async function sendFeedback(formData) {
  const name = formData.get('name') || 'Anonimo';
  const email = formData.get('email') || 'Nessuna email';
  const message = formData.get('message');

  // Configure the email engine
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Change this if you use Outlook/Yahoo
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    // Send the email to yourself
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, 
      replyTo: email !== 'Nessuna email' ? email : process.env.EMAIL_USER,
      subject: `[Portfolio] Nuovo Feedback Quiz da: ${name}`,
      text: `Hai ricevuto un nuovo messaggio dal quiz di Italiano.\n\nNome: ${name}\nEmail: ${email}\n\nMessaggio:\n${message}`,
    });
    
    return { success: true };
  } catch (error) {
    console.error("Errore email:", error);
    return { success: false };
  }
}