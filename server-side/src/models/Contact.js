import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['email', 'meet', 'whatsapp'],
    required: true,
  },
  name: { type: String, required: false },
  email: { type: String, required: false },
  data: {
    // Stores specific data based on type (e.g. date, time, topic for meet, or message for email)
    type: Object,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'contacted', 'resolved'],
    default: 'pending'
  },
}, { timestamps: true });

const Contact = mongoose.model('Contact', contactSchema);
export default Contact;
