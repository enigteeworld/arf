import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  CheckCircle,
  MessageSquare,
  FileText,
  Users,
  Heart
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

// Contact Method Card
function ContactCard({ 
  icon: Icon, 
  title, 
  content, 
  action, 
  href 
}: { 
  icon: React.ElementType; 
  title: string; 
  content: string; 
  action: string;
  href: string;
}) {
  return (
    <a 
      href={href}
      className="block bg-[#0D1B2A] rounded-xl p-6 border border-[rgba(244,246,250,0.08)] card-hover group"
    >
      <div className="w-12 h-12 rounded-full bg-[#0B0F17] flex items-center justify-center mb-4 border border-[rgba(244,246,250,0.08)] group-hover:border-[#FF4D2E] transition-colors">
        <Icon className="w-5 h-5 text-[#FF4D2E]" />
      </div>
      <h3 className="font-heading font-bold text-[#F4F6FA] text-lg mb-2">{title}</h3>
      <p className="text-[#A9B3C2] text-sm mb-4">{content}</p>
      <span className="text-[#FF4D2E] text-sm font-medium group-hover:underline">{action}</span>
    </a>
  );
}

export default function Contact() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = pageRef.current?.querySelectorAll('.animate-section');
      sections?.forEach((section) => {
        gsap.fromTo(section,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      const cardGroups = pageRef.current?.querySelectorAll('.card-group');
      cardGroups?.forEach((group) => {
        const cards = group.querySelectorAll('.stagger-card');
        gsap.fromTo(cards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: group,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Open email client with pre-filled message
    const subject = encodeURIComponent(`Contact Form: ${formData.subject}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:hello@alliancerelief.fund?subject=${subject}&body=${body}`;
    setDialogOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Us',
      content: 'For general inquiries and donations',
      action: 'hello@alliancerelief.fund',
      href: 'mailto:hello@alliancerelief.fund'
    },
    {
      icon: Send,
      title: 'Donations',
      content: 'To make a contribution',
      action: 'donations@alliancerelief.fund',
      href: 'mailto:donations@alliancerelief.fund'
    },
    {
      icon: FileText,
      title: 'Reports',
      content: 'Request weekly field reports',
      action: 'reports@alliancerelief.fund',
      href: 'mailto:reports@alliancerelief.fund'
    },
    {
      icon: Users,
      title: 'Partnerships',
      content: 'Corporate partnership inquiries',
      action: 'partners@alliancerelief.fund',
      href: 'mailto:partners@alliancerelief.fund'
    },
  ];

  const faqs = [
    {
      question: 'How quickly is aid deployed?',
      answer: 'We aim to deploy aid within 24-72 hours of receiving contributions. Our local partners are pre-positioned to respond rapidly.'
    },
    {
      question: 'How do I know my donation is being used effectively?',
      answer: 'We publish weekly field reports detailing every dollar spent, aid delivered, and lives impacted. Full transparency is our promise.'
    },
    {
      question: 'Can I designate my donation for a specific purpose?',
      answer: 'Yes, you can specify whether your contribution should go toward shelter, medical aid, food, or general relief efforts.'
    },
    {
      question: 'Are donations tax-deductible?',
      answer: 'Yes, Alliance Relief Fund is a registered nonprofit. EIN is available upon request for tax purposes.'
    },
  ];

  return (
    <div ref={pageRef} className="pt-20 md:pt-24">
      {/* Hero Section */}
      <section className="relative w-full py-20 md:py-32 bg-[#0B0F17]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center_top,rgba(13,27,42,0.55)_0%,transparent_60%)]" />
        <div className="relative z-10 max-w-[900px] mx-auto px-4 sm:px-6 lg:px-[6vw] text-center">
          <span className="animate-section font-mono text-xs tracking-[0.18em] text-[#A9B3C2] uppercase block mb-4">
            Contact Us
          </span>
          <h1 className="animate-section font-heading font-bold text-[#F4F6FA] text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
            Get in touch.
          </h1>
          <p className="animate-section text-[#A9B3C2] text-base md:text-lg leading-relaxed max-w-[600px] mx-auto mb-8">
            Have questions about our work, want to donate, or interested in partnering? 
            We'd love to hear from you.
          </p>
          
          {/* Administration Support */}
          <div className="animate-section inline-flex items-center gap-3 px-5 py-3 bg-[#0D1B2A]/80 rounded-full border border-[rgba(244,246,250,0.08)]">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-[rgba(244,246,250,0.2)]">
              <img src="/images/trump_portrait.jpg" alt="" className="w-full h-full object-cover" />
            </div>
            <span className="text-[#A9B3C2] text-sm">Supported by the Trump Administration</span>
          </div>
        </div>
      </section>

      {/* Contact Methods Section */}
      <section className="relative w-full py-16 md:py-24 bg-[#0B0F17]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-[6vw]">
          <div className="card-group grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {contactMethods.map((method, index) => (
              <div key={index} className="stagger-card">
                <ContactCard {...method} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="relative w-full py-16 md:py-24 bg-[#0B0F17]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,77,46,0.04)_0%,transparent_60%)]" />
        <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-[6vw]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form */}
            <div className="animate-section">
              <span className="font-mono text-xs tracking-[0.18em] text-[#A9B3C2] uppercase block mb-4">
                Send a Message
              </span>
              <h2 className="font-heading font-bold text-[#F4F6FA] text-2xl sm:text-3xl mb-6">
                We'd love to hear from you
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[#A9B3C2] text-sm mb-2">Your Name</label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="bg-[#0D1B2A] border-[rgba(244,246,250,0.08)] text-[#F4F6FA] placeholder:text-[#A9B3C2]/50 focus:border-[#FF4D2E] focus:ring-[#FF4D2E]/20"
                    />
                  </div>
                  <div>
                    <label className="block text-[#A9B3C2] text-sm mb-2">Email Address</label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="bg-[#0D1B2A] border-[rgba(244,246,250,0.08)] text-[#F4F6FA] placeholder:text-[#A9B3C2]/50 focus:border-[#FF4D2E] focus:ring-[#FF4D2E]/20"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-[#A9B3C2] text-sm mb-2">Subject</label>
                  <Input
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    required
                    className="bg-[#0D1B2A] border-[rgba(244,246,250,0.08)] text-[#F4F6FA] placeholder:text-[#A9B3C2]/50 focus:border-[#FF4D2E] focus:ring-[#FF4D2E]/20"
                  />
                </div>
                
                <div>
                  <label className="block text-[#A9B3C2] text-sm mb-2">Message</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your inquiry..."
                    required
                    rows={5}
                    className="bg-[#0D1B2A] border-[rgba(244,246,250,0.08)] text-[#F4F6FA] placeholder:text-[#A9B3C2]/50 focus:border-[#FF4D2E] focus:ring-[#FF4D2E]/20 resize-none"
                  />
                </div>
                
                <Button 
                  type="submit"
                  className="w-full sm:w-auto bg-[#FF4D2E] hover:bg-[#E04327] text-white rounded-full px-8 py-3 text-sm font-medium btn-hover"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </div>
            
            {/* Contact Info */}
            <div className="animate-section">
              <span className="font-mono text-xs tracking-[0.18em] text-[#A9B3C2] uppercase block mb-4">
                Our Office
              </span>
              <h2 className="font-heading font-bold text-[#F4F6FA] text-2xl sm:text-3xl mb-6">
                Visit or reach out
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#0D1B2A] flex items-center justify-center flex-shrink-0 border border-[rgba(244,246,250,0.08)]">
                    <MapPin className="w-4 h-4 text-[#FF4D2E]" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-[#F4F6FA] text-base mb-1">Address</h4>
                    <p className="text-[#A9B3C2] text-sm">
                      350 Fifth Avenue, Suite 4500<br />
                      New York, NY 10118<br />
                      United States
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#0D1B2A] flex items-center justify-center flex-shrink-0 border border-[rgba(244,246,250,0.08)]">
                    <Clock className="w-4 h-4 text-[#FF4D2E]" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-[#F4F6FA] text-base mb-1">Office Hours</h4>
                    <p className="text-[#A9B3C2] text-sm">
                      Monday - Friday: 9:00 AM - 6:00 PM EST<br />
                      Saturday - Sunday: Closed
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#0D1B2A] flex items-center justify-center flex-shrink-0 border border-[rgba(244,246,250,0.08)]">
                    <MessageSquare className="w-4 h-4 text-[#FF4D2E]" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-[#F4F6FA] text-base mb-1">Response Time</h4>
                    <p className="text-[#A9B3C2] text-sm">
                      We aim to respond to all inquiries within 24 hours.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Emergency Notice */}
              <div className="mt-8 p-5 bg-[#0D1B2A] rounded-xl border border-[rgba(244,246,250,0.08)]">
                <div className="flex items-start gap-3">
                  <Heart className="w-5 h-5 text-[#FF4D2E] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-heading font-bold text-[#F4F6FA] text-sm mb-1">Emergency Aid Inquiries</h4>
                    <p className="text-[#A9B3C2] text-sm">
                      For urgent aid requests, please email{' '}
                      <a href="mailto:emergency@alliancerelief.fund" className="text-[#FF4D2E] hover:underline">
                        emergency@alliancerelief.fund
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative w-full py-16 md:py-24 bg-[#0B0F17]">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-[6vw]">
          <div className="text-center mb-12">
            <span className="animate-section font-mono text-xs tracking-[0.18em] text-[#A9B3C2] uppercase block mb-4">
              FAQ
            </span>
            <h2 className="animate-section font-heading font-bold text-[#F4F6FA] text-2xl sm:text-3xl md:text-4xl">
              Frequently asked questions
            </h2>
          </div>
          
          <div className="animate-section space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-[#0D1B2A] rounded-xl p-5 md:p-6 border border-[rgba(244,246,250,0.08)]"
              >
                <h3 className="font-heading font-bold text-[#F4F6FA] text-base mb-2 flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#FF4D2E] flex-shrink-0 mt-0.5" />
                  {faq.question}
                </h3>
                <p className="text-[#A9B3C2] text-sm leading-relaxed pl-8">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative w-full py-20 md:py-32 bg-[#0B0F17]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,77,46,0.06)_0%,transparent_50%)]" />
        <div className="relative z-10 max-w-[800px] mx-auto px-4 sm:px-6 lg:px-[6vw] text-center">
          <div className="animate-section">
            <h2 className="font-heading font-bold text-[#F4F6FA] text-3xl sm:text-4xl md:text-5xl mb-6">
              Ready to make a difference?
            </h2>
            <p className="text-[#A9B3C2] text-base md:text-lg leading-relaxed max-w-[600px] mx-auto mb-8">
              Your contribution directly funds shelter, medical aid, and transport for families in crisis.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="/donate"
                className="bg-[#FF4D2E] hover:bg-[#E04327] text-white rounded-full px-10 py-3 text-base font-medium btn-hover transition-colors"
              >
                Donate Now
              </a>
              <a 
                href="mailto:hello@alliancerelief.fund"
                className="text-[#A9B3C2] hover:text-[#F4F6FA] transition-colors text-sm underline underline-offset-4"
              >
                Send us an email
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Success Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-[#0D1B2A] border-[rgba(244,246,250,0.08)] text-[#F4F6FA] max-w-md">
          <DialogHeader>
            <div className="mx-auto w-12 h-12 rounded-full bg-[#0B0F17] flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6 text-[#FF4D2E]" />
            </div>
            <DialogTitle className="font-heading text-xl text-center">Message Ready to Send</DialogTitle>
            <DialogDescription className="text-[#A9B3C2] text-center">
              Your email client will open with your message pre-filled. Simply send the email to complete your inquiry.
            </DialogDescription>
          </DialogHeader>
          <div className="pt-4 text-center">
            <Button 
              onClick={() => setDialogOpen(false)}
              className="bg-[#FF4D2E] hover:bg-[#E04327] text-white rounded-full px-8"
            >
              Got it
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
