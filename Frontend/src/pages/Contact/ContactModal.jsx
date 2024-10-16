import React, { useState } from 'react';
import axios from 'axios';
import { MoonLoader } from 'react-spinners';
import emailjs from 'emailjs-com';
import './modalStyles.css'; 

const ContactModal = ({ listing, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [message, setMessage] = useState('');
  const [formStatus, setFormStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const minMessageLength = 10;

  const submit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate form data
    if (!name || !email || !contactNumber || !message) {
      setFormStatus('Please fill out all fields.');
      setIsLoading(false);
      return;
    }

    if (!emailRegex.test(email)) {
      setFormStatus('Please enter a valid email address.');
      setIsLoading(false);
      return;
    }

    if (message.length < minMessageLength) {
      setFormStatus(`Message must be at least ${minMessageLength} characters long.`);
      setIsLoading(false);
      return;
    }

    try {
      // Sending email to landlord
      const landlordTemplateParams = {
        to_name: 'Landlord', // Replace with landlord's name or dynamic data if available
        to_email: listing.userRef.email,
        from_name: name,
        from_email: email,
        contactNumber,
        message,
        listingId: listing._id,
      };

      await emailjs.send(
        'service_3prevah', // Service ID
        'template_158', // Template ID for the message to the landlord
        landlordTemplateParams,
        'K1uJbznyFYj_ot4IV' // Replace with your EmailJS user ID
      );

      // Sending acknowledgment email to the user
      const ackTemplateParams = {
        to_name:name,
        to_email: email, 
        from_name: name,
        listingId: listing._id,
        message,
      };

      await emailjs.send(
        'service_3prevah', // Service ID
        'template_158158', // Replace with your acknowledgment template ID
        ackTemplateParams,
        'K1uJbznyFYj_ot4IV' // Replace with your EmailJS user ID
      );

      setFormStatus('Thank you for your message! The landlord will contact you soon.');
      setName('');
      setEmail('');
      setContactNumber('');
      setMessage('');
      onClose();
    } catch (error) {
      setFormStatus('Failed to send message. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2 className="text-2xl font-bold mb-4">Contact Landlord</h2>
        <form onSubmit={submit} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full text-gray-600 px-4 py-2 border rounded-lg"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full text-gray-600  px-4 py-2 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Contact Number / WhatsApp Number"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            className="w-full text-gray-600  px-4 py-2 border rounded-lg"
          />
          <textarea
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full text-gray-600  px-4 py-2 border rounded-lg h-32 resize-none"
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 bg-blue-500 text-white rounded-lg ${
              isLoading ? 'bg-gray-400 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? <MoonLoader size={20} color="#ffffff" /> : 'Send Message'}
          </button>
          {formStatus && <p className={`mt-2 text-center ${formStatus.includes('Failed') ? 'text-red-600' : 'text-green-600'}`}>{formStatus}</p>}
        </form>
        <button className="mt-4 text-teal-500" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ContactModal;
