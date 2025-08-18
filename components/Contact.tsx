"use client";
import React, { useState } from 'react';
import Header from './reusable-components/Header';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { motion } from 'framer-motion';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        alert('Message sent successfully!');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        alert('Failed to send message.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('An error occurred while sending the message.');
    } finally {
      setLoading(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <Header title="Contact Us" />
      <motion.div
        className="max-w-xl mx-auto"
        variants={formVariants}
        initial="hidden"
        animate="visible"
      >
        <form className="space-y-6" onSubmit={handleSubmit}>
          <motion.div variants={itemVariants}>
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <Input id="name" type="text" placeholder="Name" required value={name} onChange={(e) => setName(e.target.value)} />
          </motion.div>
          <motion.div variants={itemVariants}>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <Input id="email" type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </motion.div>
          <motion.div variants={itemVariants}>
            <label htmlFor="message" className="sr-only">
              Message
            </label>
            <Textarea
              id="message"
              placeholder="Message"
              rows={4}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </motion.div>
          <motion.div className="text-center" variants={itemVariants}>
            <Button type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </section>
  );
}
