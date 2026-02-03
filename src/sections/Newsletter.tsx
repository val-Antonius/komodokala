"use client";

import { Send, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollReveal } from '@/components/ScrollReveal';
import { useState } from 'react';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <section className="py-16 md:py-20 bg-ocean-dark">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Get Insider Tips & Exclusive Deals
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="text-white/80 mb-8">
            Subscribe to our newsletter for travel tips, seasonal promotions, and hidden gems in Komodo National Park
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="flex-1 relative">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full h-12 px-4 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-xl focus:ring-2 focus:ring-coral focus:border-transparent"
                required
              />
            </div>
            <Button
              type="submit"
              disabled={isSubmitted}
              className={`h-12 px-6 font-semibold rounded-xl transition-all ${isSubmitted
                  ? 'bg-green-500 hover:bg-green-500'
                  : 'bg-coral hover:bg-coral-hover'
                }`}
            >
              {isSubmitted ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Subscribed!
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Subscribe
                </>
              )}
            </Button>
          </form>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <p className="text-white/50 text-sm mt-4">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
