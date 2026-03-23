import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { 
  Heart, 
  Home, 
  Droplets, 
  Zap, 
  Users,
  CheckCircle,
  Shield,
  Eye,
  Clock,
  Mail,
  ArrowRight,
  Building2
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

// Tier Card Component
function TierCard({ 
  amount, 
  description, 
  icon: Icon, 
  features,
  highlighted = false 
}: { 
  amount: string; 
  description: string; 
  icon: React.ElementType; 
  features: string[];
  highlighted?: boolean;
}) {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <div 
        onClick={() => setDialogOpen(true)}
        className={`relative rounded-xl overflow-hidden cursor-pointer card-hover group ${
          highlighted 
            ? 'bg-[#0D1B2A] border-2 border-[#FF4D2E]' 
            : 'bg-[#0D1B2A] border border-[rgba(244,246,250,0.08)]'
        }`}
      >
        {highlighted && (
          <div className="absolute top-0 left-0 right-0 bg-[#FF4D2E] text-white text-xs font-medium text-center py-1">
            MOST POPULAR
          </div>
        )}
        <div className={`p-6 md:p-8 ${highlighted ? 'pt-10' : ''}`}>
          <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 ${
            highlighted ? 'bg-[#FF4D2E]' : 'bg-[#0B0F17] border border-[rgba(244,246,250,0.08)]'
          }`}>
            <Icon className={`w-6 h-6 ${highlighted ? 'text-white' : 'text-[#FF4D2E]'}`} />
          </div>
          <div className="font-heading font-bold text-[#F4F6FA] text-4xl md:text-5xl mb-2">{amount}</div>
          <p className="text-[#A9B3C2] text-sm mb-6">{description}</p>
          <ul className="space-y-3 mb-8">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3 text-sm">
                <CheckCircle className="w-4 h-4 text-[#FF4D2E] flex-shrink-0 mt-0.5" />
                <span className="text-[#A9B3C2]">{feature}</span>
              </li>
            ))}
          </ul>
          <Button 
            className={`w-full rounded-full py-3 ${
              highlighted 
                ? 'bg-[#FF4D2E] hover:bg-[#E04327] text-white' 
                : 'bg-[#0B0F17] hover:bg-[#1a2332] text-[#F4F6FA] border border-[rgba(244,246,250,0.08)]'
            }`}
          >
            Select
          </Button>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-[#0D1B2A] border-[rgba(244,246,250,0.08)] text-[#F4F6FA] max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">Contribute {amount}</DialogTitle>
            <DialogDescription className="text-[#A9B3C2]">
              To contribute {amount} for "{description}", please email our donations team.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="bg-[#0B0F17] rounded-lg p-4 border border-[rgba(244,246,250,0.08)]">
              <p className="text-sm text-[#A9B3C2] mb-2">Email us at:</p>
              <a 
                href={`mailto:donations@alliancerelief.fund?subject=Donation: ${amount}`}
                className="text-[#FF4D2E] font-mono text-sm hover:underline flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                donations@alliancerelief.fund
              </a>
            </div>
            <p className="text-xs text-[#A9B3C2]">
              Our team will respond within 24 hours with payment instructions and a personalized thank you.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default function Donate() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [customDialogOpen, setCustomDialogOpen] = useState(false);
  const [corporateDialogOpen, setCorporateDialogOpen] = useState(false);

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

  const tiers = [
    {
      amount: '$50',
      description: 'Emergency meals + water for a family',
      icon: Droplets,
      features: [
        'Feeds a family for one week',
        'Clean water supply',
        'Basic hygiene kit',
        'Weekly impact report'
      ]
    },
    {
      amount: '$150',
      description: 'Temporary shelter kit + supplies',
      icon: Home,
      features: [
        'Emergency shelter materials',
        'Sleeping bags & blankets',
        'Hygiene supplies',
        'Weekly impact report'
      ],
      highlighted: true
    },
    {
      amount: '$500',
      description: 'Medical support + transport',
      icon: Heart,
      features: [
        'Emergency medical kit',
        'Transport for urgent cases',
        'Medication supply',
        'Weekly impact report'
      ]
    },
  ];

  const trustIndicators = [
    { icon: Shield, title: 'Secure', description: 'All transactions are secure and encrypted' },
    { icon: Eye, title: 'Transparent', description: '100% of donations go to aid programs' },
    { icon: Clock, title: 'Fast', description: 'Aid deployed within 24-72 hours' },
    { icon: Users, title: 'Trusted', description: 'Partnered with 25+ local organizations' },
  ];

  return (
    <div ref={pageRef} className="pt-20 md:pt-24">
      {/* Hero Section */}
      <section className="relative w-full py-20 md:py-32 bg-[#0B0F17]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center_top,rgba(13,27,42,0.55)_0%,transparent_60%)]" />
        <div className="relative z-10 max-w-[900px] mx-auto px-4 sm:px-6 lg:px-[6vw] text-center">
          <span className="animate-section font-mono text-xs tracking-[0.18em] text-[#A9B3C2] uppercase block mb-4">
            Donate
          </span>
          <h1 className="animate-section font-heading font-bold text-[#F4F6FA] text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
            Your contribution saves lives.
          </h1>
          <p className="animate-section text-[#A9B3C2] text-base md:text-lg leading-relaxed max-w-[700px] mx-auto">
            100% of your donation goes directly to aid programs. Choose a tier that works for you 
            and help us provide shelter, medical aid, and essential supplies to families in crisis.
          </p>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="relative w-full py-12 md:py-16 bg-[#0B0F17] border-y border-[rgba(244,246,250,0.08)]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-[6vw]">
          <div className="card-group grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {trustIndicators.map((indicator, index) => (
              <div key={index} className="stagger-card flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-[#0D1B2A] flex items-center justify-center mb-3 border border-[rgba(244,246,250,0.08)]">
                  <indicator.icon className="w-4 h-4 text-[#FF4D2E]" />
                </div>
                <h4 className="font-heading font-bold text-[#F4F6FA] text-sm mb-1">{indicator.title}</h4>
                <p className="text-[#A9B3C2] text-xs">{indicator.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Tiers */}
      <section className="relative w-full py-16 md:py-24 bg-[#0B0F17]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,77,46,0.04)_0%,transparent_60%)]" />
        <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-[6vw]">
          <div className="text-center mb-12">
            <span className="animate-section font-mono text-xs tracking-[0.18em] text-[#A9B3C2] uppercase block mb-4">
              Choose Your Impact
            </span>
            <h2 className="animate-section font-heading font-bold text-[#F4F6FA] text-2xl sm:text-3xl md:text-4xl">
              Select a donation tier
            </h2>
          </div>
          
          <div className="card-group grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
            {tiers.map((tier, index) => (
              <div key={index} className="stagger-card">
                <TierCard {...tier} />
              </div>
            ))}
          </div>

          {/* Custom Amount */}
          <div className="animate-section text-center">
            <p className="text-[#A9B3C2] text-sm mb-4">
              Want to contribute a different amount?
            </p>
            <Button 
              onClick={() => setCustomDialogOpen(true)}
              variant="outline"
              className="border-[#FF4D2E] text-[#FF4D2E] hover:bg-[#FF4D2E] hover:text-white rounded-full px-8"
            >
              Custom Amount
            </Button>
          </div>
        </div>
      </section>

      {/* Where Your Money Goes */}
      <section className="relative w-full py-16 md:py-24 bg-[#0B0F17]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-[6vw]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="animate-section">
              <span className="font-mono text-xs tracking-[0.18em] text-[#A9B3C2] uppercase block mb-4">
                Transparency
              </span>
              <h2 className="font-heading font-bold text-[#F4F6FA] text-2xl sm:text-3xl md:text-4xl mb-6">
                Where your money goes
              </h2>
              <p className="text-[#A9B3C2] text-sm md:text-base leading-relaxed mb-8">
                We believe in complete transparency. Every dollar you contribute is tracked 
                and reported. Here's how donations are allocated:
              </p>
              
              <div className="space-y-4">
                {[
                  { label: 'Direct Aid (shelter, food, medical)', percent: '85%' },
                  { label: 'Logistics & Transport', percent: '10%' },
                  { label: 'Administrative Costs', percent: '5%' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-[#0D1B2A] rounded-lg border border-[rgba(244,246,250,0.08)]">
                    <span className="text-[#F4F6FA] text-sm">{item.label}</span>
                    <span className="font-heading font-bold text-[#FF4D2E] text-lg">{item.percent}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="animate-section">
              <img 
                src="/images/hero_displacement.jpg" 
                alt="Aid distribution"
                className="w-full h-64 md:h-96 object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Partnerships */}
      <section className="relative w-full py-16 md:py-24 bg-[#0B0F17]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,77,46,0.06)_0%,transparent_50%)]" />
        <div className="relative z-10 max-w-[900px] mx-auto px-4 sm:px-6 lg:px-[6vw]">
          <div className="animate-section bg-[#0D1B2A] rounded-xl p-8 md:p-12 border border-[rgba(244,246,250,0.08)]">
            <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
              <div className="w-16 h-16 rounded-full bg-[#0B0F17] flex items-center justify-center flex-shrink-0 border border-[rgba(244,246,250,0.08)]">
                <Building2 className="w-7 h-7 text-[#FF4D2E]" />
              </div>
              <div className="flex-grow">
                <h2 className="font-heading font-bold text-[#F4F6FA] text-xl md:text-2xl mb-2">
                  Corporate Partnerships
                </h2>
                <p className="text-[#A9B3C2] text-sm md:text-base">
                  Interested in corporate giving or partnership opportunities? 
                  We work with companies to create meaningful impact.
                </p>
              </div>
              <Button 
                onClick={() => setCorporateDialogOpen(true)}
                variant="outline"
                className="flex-shrink-0 border-[#FF4D2E] text-[#FF4D2E] hover:bg-[#FF4D2E] hover:text-white rounded-full px-6"
              >
                Learn More
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Other Ways to Help */}
      <section className="relative w-full py-16 md:py-24 bg-[#0B0F17]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-[6vw]">
          <div className="text-center mb-12">
            <span className="animate-section font-mono text-xs tracking-[0.18em] text-[#A9B3C2] uppercase block mb-4">
              Other Ways to Help
            </span>
            <h2 className="animate-section font-heading font-bold text-[#F4F6FA] text-2xl sm:text-3xl md:text-4xl">
              Can't donate? You can still make a difference.
            </h2>
          </div>
          
          <div className="card-group grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[
              {
                icon: Users,
                title: 'Spread the Word',
                description: 'Share our mission with your network. Awareness leads to action.'
              },
              {
                icon: Zap,
                title: 'Volunteer',
                description: 'Have skills to offer? Contact us about volunteer opportunities.'
              },
              {
                icon: Mail,
                title: 'Subscribe to Updates',
                description: 'Stay informed about our work and share our progress with others.'
              },
            ].map((way, index) => (
              <div 
                key={index}
                className="stagger-card bg-[#0D1B2A] rounded-xl p-6 border border-[rgba(244,246,250,0.08)]"
              >
                <div className="w-12 h-12 rounded-full bg-[#0B0F17] flex items-center justify-center mb-4 border border-[rgba(244,246,250,0.08)]">
                  <way.icon className="w-5 h-5 text-[#FF4D2E]" />
                </div>
                <h3 className="font-heading font-bold text-[#F4F6FA] text-lg mb-2">{way.title}</h3>
                <p className="text-[#A9B3C2] text-sm">{way.description}</p>
              </div>
            ))}
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
              Common questions
            </h2>
          </div>
          
          <div className="animate-section space-y-4">
            {[
              {
                q: 'Is my donation tax-deductible?',
                a: 'Yes, Alliance Relief Fund is a registered nonprofit organization. EIN is available upon request for tax purposes.'
              },
              {
                q: 'How quickly will my donation be used?',
                a: 'We aim to deploy funds within 24-72 hours. Our local partners are pre-positioned to respond rapidly.'
              },
              {
                q: 'Can I designate my donation for a specific purpose?',
                a: 'Absolutely. You can specify whether your contribution should go toward shelter, medical aid, food, or general relief.'
              },
              {
                q: 'How do I know my donation is being used effectively?',
                a: 'We publish weekly field reports detailing every dollar spent. Transparency is core to our mission.'
              },
            ].map((faq, index) => (
              <div 
                key={index}
                className="bg-[#0D1B2A] rounded-xl p-5 md:p-6 border border-[rgba(244,246,250,0.08)]"
              >
                <h3 className="font-heading font-bold text-[#F4F6FA] text-base mb-2">{faq.q}</h3>
                <p className="text-[#A9B3C2] text-sm">{faq.a}</p>
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
              Ready to make an impact?
            </h2>
            <p className="text-[#A9B3C2] text-base md:text-lg leading-relaxed max-w-[600px] mx-auto mb-8">
              Every contribution, no matter the size, helps us provide critical aid to families in crisis.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="mailto:donations@alliancerelief.fund"
                className="bg-[#FF4D2E] hover:bg-[#E04327] text-white rounded-full px-10 py-3 text-base font-medium btn-hover transition-colors"
              >
                <Mail className="w-4 h-4 mr-2 inline" />
                Email to Donate
              </a>
              <a 
                href="/contact"
                className="text-[#A9B3C2] hover:text-[#F4F6FA] transition-colors text-sm underline underline-offset-4"
              >
                Have questions?
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Amount Dialog */}
      <Dialog open={customDialogOpen} onOpenChange={setCustomDialogOpen}>
        <DialogContent className="bg-[#0D1B2A] border-[rgba(244,246,250,0.08)] text-[#F4F6FA] max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">Custom Contribution</DialogTitle>
            <DialogDescription className="text-[#A9B3C2]">
              To contribute a custom amount, please email our donations team with your preferred contribution.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="bg-[#0B0F17] rounded-lg p-4 border border-[rgba(244,246,250,0.08)]">
              <p className="text-sm text-[#A9B3C2] mb-2">Email us at:</p>
              <a 
                href="mailto:donations@alliancerelief.fund?subject=Custom Donation Amount"
                className="text-[#FF4D2E] font-mono text-sm hover:underline flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                donations@alliancerelief.fund
              </a>
            </div>
            <p className="text-xs text-[#A9B3C2]">
              Include your desired donation amount in the email. Our team will respond within 24 hours.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Corporate Dialog */}
      <Dialog open={corporateDialogOpen} onOpenChange={setCorporateDialogOpen}>
        <DialogContent className="bg-[#0D1B2A] border-[rgba(244,246,250,0.08)] text-[#F4F6FA] max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">Corporate Partnership</DialogTitle>
            <DialogDescription className="text-[#A9B3C2]">
              For corporate giving and partnership inquiries, please contact our partnerships team.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="bg-[#0B0F17] rounded-lg p-4 border border-[rgba(244,246,250,0.08)]">
              <p className="text-sm text-[#A9B3C2] mb-2">Email us at:</p>
              <a 
                href="mailto:partners@alliancerelief.fund"
                className="text-[#FF4D2E] font-mono text-sm hover:underline flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                partners@alliancerelief.fund
              </a>
            </div>
            <p className="text-xs text-[#A9B3C2]">
              We offer various partnership opportunities including matching programs, sponsored aid distributions, and more.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
