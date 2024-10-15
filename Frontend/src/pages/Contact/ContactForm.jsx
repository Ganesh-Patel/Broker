import React, { useState } from 'react';
import axios from 'axios';
import { MoonLoader } from 'react-spinners';

const ContatcForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formStatus, setFormStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Regular expressions for validation
  const nameRegex = /^[a-zA-Z\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const minMessageLength = 10;

  const submit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate form data
    if (!name || !email || !message) {
      setFormStatus('Please fill out all fields.');
      setIsLoading(false);
      return;
    }

    if (!nameRegex.test(name)) {
      setFormStatus('Please enter a valid name (letters and spaces only).');
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
      // Make the API call for live form submission
      const response = await axios.post('https://contact-form-pgqm.onrender.com/submit-form', {
        name,
        email,
        message,
      });

      if (response.status === 200) {
        setFormStatus('Thank you for your message! We will be in touch soon.');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setFormStatus('Failed to send message. Please try again later.');
      }
    } catch (error) {
      setFormStatus('Failed to send message. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-transparent shadow-lg rounded-lg mt-4">
      <h2 className="text-3xl font-bold text-center text-teal-900 mb-6">Contact ProHomes</h2>
      <form onSubmit={submit} className="space-y-4">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-teal-300 placeholder-gray-400 text-gray-900 bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-teal-300 placeholder-gray-400 text-gray-900 bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
          />
        </div>
        <textarea
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-4 py-2 border border-teal-300 placeholder-gray-400 text-gray-900 bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition h-32 resize-none"
        />
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 bg-gray-900 text-white rounded-lg transition duration-300 flex items-center justify-center ${
            isLoading ? 'bg-teal-300 cursor-not-allowed' : 'hover:bg-teal-700'
          }`}
        >
          {isLoading ? (
            <MoonLoader size={20} className='text-gray-600' />
          ) : (
            'Send Message'
          )}
        </button>
        {formStatus && (
          <p className={`mt-4 text-center ${formStatus.includes('Failed') ? 'text-red-600' : 'text-gray-800'}`}>
            {formStatus}
          </p>
        )}
      </form>
    </div>
  );
};

export default ContatcForm;
