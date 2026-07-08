import Contact from '../models/Contact.js';
import sendContactEmail from '../utils/sendContactEmail.js';

export const submitContact = async (req, res) => {
  try {
    const { type, name, email, data } = req.body;

    if (!type || !data) {
      return res.status(400).json({ success: false, message: 'Type and data are required' });
    }

    const newContact = await Contact.create({
      type,
      name,
      email,
      data
    });

    // Fire and forget email notification to admin
    sendContactEmail(type, { name, email, ...data }).catch(console.error);

    return res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully',
      contactId: newContact._id
    });
  } catch (error) {
    console.error("Submit Contact Error:", error);
    res.status(500).json({ success: false, message: 'Server error while submitting enquiry' });
  }
};
