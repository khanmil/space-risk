import React, { useState } from 'react';

// Main App component
const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    conquer: false,
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  // IMPORTANT: Replace this URL with the deployed Google Apps Script URL
  const scriptUrl = 'https://script.google.com/macros/s/AKfycbzR_5FV_ZMEAHdDId1he4kCANlcO8RDNBbn3qoZ8IZ-lv7EK2ub2VSyawX4yyATEgUX/exec';
  
  // This function handles changes to the form inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // This function handles the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous messages and show a loading indicator
    showMessage('Submitting...', 'info');

    // Create a new FormData object to send to the script
    const formSubmissionData = new FormData();
    formSubmissionData.append('name', formData.name);
    formSubmissionData.append('email', formData.email);
    formSubmissionData.append('conquer', formData.conquer ? 'Yes' : 'No');

    try {
      // Use URLSearchParams for form-urlencoded content type
      const response = await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors', // Required for Google Apps Script
        body: new URLSearchParams(formSubmissionData).toString()
      });

      // Since we're using 'no-cors', we can't read the response.
      // A successful fetch without network errors is our best indicator.
      if (response.ok || response.type === 'opaque') {
        showMessage('Submission successful! We\'ve noted your intent to conquer the galaxy.', 'success');
        setFormData({ name: '', email: '', conquer: false }); // Reset form
      } else {
        throw new Error('Failed to submit the form.');
      }
    } catch (error) {
      console.error('Error:', error);
      showMessage('Submission failed. Please check your console for details.', 'error');
    }
  };

  // Function to display messages in the UI
  const showMessage = (text, type) => {
    setMessage(text);
    setMessageType(type);
  };

  return (
    <>
      <style>
        {`
          /* Custom CSS for animations and fixed background */
          @keyframes fade-spin {
            0% {
              transform: rotate(0deg);
              opacity: 0.05;
            }
            50% {
              transform: rotate(180deg);
              opacity: 0.15;
            }
            100% {
              transform: rotate(360deg);
              opacity: 0.05;
            }
          }

          .background-animation {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: url('https://raw.githubusercontent.com/khanmil/space-risk/main/assets/hi.png');
            background-size: cover;
            background-position: center;
            filter: blur(5px);
            z-index: -10;
            animation: fade-spin 30s linear infinite;
          }
          
          /* Custom styling for glow effects and transitions */
          .glow-text {
            text-shadow: 0 0 5px #b5f2ff;
          }
          .glow-input:focus {
            box-shadow: 0 0 10px #63b3ed;
          }
          .glow-button {
            box-shadow: 0 0 10px #6a0dad;
            transition: all 0.3s ease;
          }
          .glow-button:hover {
            box-shadow: 0 0 15px #6a0dad;
          }
          
          /* Utility classes for light mode preferences */
          @media (prefers-color-scheme: light) {
            .light-mode-bg {
              background-color: #f1f5f9;
            }
            .light-mode-text {
              color: #1e293b;
            }
            .light-mode-container {
              background-color: rgba(255, 255, 255, 0.9);
            }
            .light-mode-shadow {
              box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            }
            .light-mode-glow-text {
              text-shadow: none;
            }
            .light-mode-input {
              background-color: #f9fafb;
              color: #1e293b;
              border-color: #d1d5db;
            }
            .light-mode-input:focus {
              border-color: #3b82f6;
              box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25);
            }
            .light-mode-checkbox {
              accent-color: #3b82f6;
              box-shadow: none;
            }
            .light-mode-button {
              background-color: #3b82f6;
              box-shadow: none;
            }
            .light-mode-button:hover {
              background-color: #2563eb;
              box-shadow: none;
            }
            .light-mode-message-info {
              background-color: #e0f2fe;
              color: #0c4a6e;
            }
            .light-mode-message-success {
              background-color: #d1fae5;
              color: #065f46;
            }
            .light-mode-message-error {
              background-color: #fee2e2;
              color: #991b1b;
            }
          }
        `}
      </style>
      
      {/* Background with the spinning image animation */}
      <div className="background-animation"></div>

      {/* Main content area, centered on the screen */}
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div 
          className="w-full max-w-md p-6 sm:p-8 bg-gray-800/80 rounded-2xl shadow-xl backdrop-blur-md text-cyan-200"
          style={{ boxShadow: '0 0 15px rgba(181, 242, 255, 0.2)' }}
        >
          <h1 className="text-2xl font-bold text-center mb-6 glow-text">Galactic Conquest Registration</h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                className="mt-1 block w-full p-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 glow-input"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="mt-1 block w-full p-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 glow-input"
              />
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="conquer"
                name="conquer"
                checked={formData.conquer}
                onChange={handleChange}
                className="h-5 w-5 rounded-md text-purple-600 border-gray-600 accent-purple-600"
              />
              <label htmlFor="conquer" className="ml-2 block text-sm font-medium">
                I want to conquer the galaxy.
              </label>
            </div>
            
            <button
              type="submit"
              className="w-full px-4 py-3 bg-purple-800 text-white font-bold rounded-lg hover:bg-purple-900 active:scale-99 glow-button"
            >
              Submit
            </button>
          </form>
          
          {message && (
            <div 
              className={`mt-4 p-3 rounded-lg text-sm text-center ${
                messageType === 'success' ? 'bg-green-700 text-green-100' :
                messageType === 'error' ? 'bg-red-700 text-red-100' :
                'bg-blue-700 text-blue-100'
              }`}
            >
              {message}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
