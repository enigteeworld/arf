import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Users, 
  Home, 
  Heart, 
  Droplets, 
  Zap, 
  FileText,
  CheckCircle,
  ArrowRight,
  MapPin,
  TrendingUp,
  Globe,
  Mail
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

// Stat Card Component
function StatCard({ value, label, icon: Icon }: { value: string; label: string; icon: React.ElementType }) {
  return (
    <div className="bg-[#0D1B2A] rounded-xl p-6 md:p-8 border border-[rgba(244,246,250,0.08)] card-hover">
      <div className="w-12 h-12 rounded-full bg-[#0B0F17] flex items-center justify-center mb-4 border border-[rgba(244,246,250,0.08)]">
        <Icon className="w-5 h-5 text-[#FF4D2E]" />
      </div>
      <div className="font-heading font-bold text-[#FF4D2E] text-3xl md:text-4xl lg:text-5xl mb-2">{value}</div>
      <p className="text-[#A9B3C2] text-sm">{label}</p>
    </div>
  );
}

// Story Card Component
function StoryCard({ title, location, content, image, stats }: { 
  title: string; 
  location: string; 
  content: string; 
  image: string;
  stats: { label: string; value: string }[];
}) {
  return (
    <div className="bg-[#0D1B2A] rounded-xl overflow-hidden border border-[rgba(244,246,250,0.08)]">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="h-64 md:h-auto">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
        <div className="p-6 md:p-8 flex flex-col justify-center">
          <div className="flex items-center gap-2 text-[#A9B3C2] text-sm mb-3">
            <MapPin className="w-4 h-4" />
            {location}
          </div>
          <h3 className="font-heading font-bold text-[#F4F6FA] text-xl md:text-2xl mb-4">{title}</h3>
          <p className="text-[#A9B3C2] text-sm leading-relaxed mb-6">{content}</p>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="font-heading font-bold text-[#FF4D2E] text-lg">{stat.value}</div>
                <div className="text-[#A9B3C2] text-xs">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Impact() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

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

  const stats = [
    { value: '12,400+', label: 'People assisted with shelter or food', icon: Users },
    { value: '$2.1M', label: 'Allocated to local partners', icon: TrendingUp },
    { value: '38', label: 'Aid distributions completed', icon: CheckCircle },
    { value: '25+', label: 'Partner organizations', icon: Globe },
  ];

  const stories = [
    {
      title: 'Emergency Shelter for Displaced Families',
      location: 'Northern Region',
      content: 'When conflict displaced hundreds of families, we rapidly deployed emergency shelter kits and coordinated with local partners to establish temporary housing facilities. Within 72 hours, over 200 families had safe places to stay.',
      image: '/images/impact_story_housing.jpg',
      stats: [
        { label: 'Families housed', value: '200+' },
        { label: 'Response time', value: '72hrs' },
      ]
    },
    {
      title: 'Medical Aid Distribution',
      location: 'Eastern District',
      content: 'Hospitals in the region were running low on critical supplies. We coordinated an emergency medical aid shipment including antibiotics, surgical supplies, and trauma kits, directly supporting three healthcare facilities.',
      image: '/images/hero_cities_affected.jpg',
      stats: [
        { label: 'Medical kits', value: '500+' },
        { label: 'Hospitals supported', value: '3' },
      ]
    },
  ];

  const programs = [
    {
      icon: Home,
      title: 'Shelter Program',
      description: 'Providing temporary housing, tents, and shelter materials to displaced families.',
      metric: '3,200+ sheltered'
    },
    {
      icon: Heart,
      title: 'Medical Support',
      description: 'Delivering medical supplies, equipment, and supporting healthcare facilities.',
      metric: '2,800+ treated'
    },
    {
      icon: Droplets,
      title: 'Water & Sanitation',
      description: 'Ensuring access to clean water and hygiene supplies for affected communities.',
      metric: '5,000+ served'
    },
    {
      icon: Zap,
      title: 'Power & Infrastructure',
      description: 'Providing generators, fuel, and supporting critical infrastructure repairs.',
      metric: '12 facilities'
    },
  ];

  const updates = [
    {
      date: 'March 2026',
      title: 'Q1 2026 Impact Report',
      summary: 'Distributed $680K in aid, assisted 4,200 people, expanded partner network to 25 organizations.'
    },
    {
      date: 'February 2026',
      title: 'Emergency Response Update',
      summary: 'Rapid deployment to eastern region, 500 medical kits delivered, 3 hospitals supported.'
    },
    {
      date: 'January 2026',
      title: 'New Year, New Partnerships',
      summary: 'Welcomed 5 new local partners, expanded shelter program capacity by 40%.'
    },
  ];

  return (
    <div ref={pageRef} className="pt-20 md:pt-24">
      {/* Hero Section */}
      <section className="relative w-full py-20 md:py-32 bg-[#0B0F17]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center_top,rgba(13,27,42,0.55)_0%,transparent_60%)]" />
        <div className="relative z-10 max-w-[900px] mx-auto px-4 sm:px-6 lg:px-[6vw] text-center">
          <span className="animate-section font-mono text-xs tracking-[0.18em] text-[#A9B3C2] uppercase block mb-4">
            Our Impact
          </span>
          <h1 className="animate-section font-heading font-bold text-[#F4F6FA] text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
            Making a measurable difference.
          </h1>
          <p className="animate-section text-[#A9B3C2] text-base md:text-lg leading-relaxed max-w-[700px] mx-auto">
            Every dollar contributed goes directly to aid programs. Here's how your support 
            is helping families affected by conflict.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative w-full py-16 md:py-24 bg-[#0B0F17]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-[6vw]">
          <div className="card-group grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="stagger-card">
                <StatCard {...stat} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="relative w-full py-16 md:py-24 bg-[#0B0F17]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,77,46,0.04)_0%,transparent_60%)]" />
        <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-[6vw]">
          <div className="text-center mb-12">
            <span className="animate-section font-mono text-xs tracking-[0.18em] text-[#A9B3C2] uppercase block mb-4">
              Our Programs
            </span>
            <h2 className="animate-section font-heading font-bold text-[#F4F6FA] text-2xl sm:text-3xl md:text-4xl">
              How we're helping
            </h2>
          </div>
          
          <div className="card-group grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {programs.map((program, index) => (
              <div 
                key={index} 
                className="stagger-card bg-[#0D1B2A] rounded-xl p-6 border border-[rgba(244,246,250,0.08)] card-hover"
              >
                <div className="w-12 h-12 rounded-full bg-[#0B0F17] flex items-center justify-center mb-4 border border-[rgba(244,246,250,0.08)]">
                  <program.icon className="w-5 h-5 text-[#FF4D2E]" />
                </div>
                <h3 className="font-heading font-bold text-[#F4F6FA] text-lg mb-2">{program.title}</h3>
                <p className="text-[#A9B3C2] text-sm mb-4">{program.description}</p>
                <div className="pt-4 border-t border-[rgba(244,246,250,0.08)]">
                  <span className="text-[#FF4D2E] font-heading font-bold text-sm">{program.metric}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stories Section */}
      <section className="relative w-full py-16 md:py-24 bg-[#0B0F17]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-[6vw]">
          <div className="text-center mb-12">
            <span className="animate-section font-mono text-xs tracking-[0.18em] text-[#A9B3C2] uppercase block mb-4">
              Field Stories
            </span>
            <h2 className="animate-section font-heading font-bold text-[#F4F6FA] text-2xl sm:text-3xl md:text-4xl">
              Real impact, real stories
            </h2>
          </div>
          
          <div className="animate-section space-y-8">
            {stories.map((story, index) => (
              <StoryCard key={index} {...story} />
            ))}
          </div>
        </div>
      </section>

      {/* Updates Section */}
      <section className="relative w-full py-16 md:py-24 bg-[#0B0F17]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,77,46,0.06)_0%,transparent_50%)]" />
        <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-[6vw]">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <span className="animate-section font-mono text-xs tracking-[0.18em] text-[#A9B3C2] uppercase block mb-4">
                Latest Updates
              </span>
              <h2 className="animate-section font-heading font-bold text-[#F4F6FA] text-2xl sm:text-3xl md:text-4xl">
                Recent reports
              </h2>
            </div>
            <button 
              onClick={() => setDialogOpen(true)}
              className="animate-section mt-4 md:mt-0 text-[#FF4D2E] text-sm hover:underline flex items-center gap-2"
            >
              View all reports
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="animate-section space-y-4">
            {updates.map((update, index) => (
              <div 
                key={index}
                className="bg-[#0D1B2A] rounded-xl p-5 md:p-6 border border-[rgba(244,246,250,0.08)] flex flex-col md:flex-row md:items-center gap-4"
              >
                <div className="flex-shrink-0">
                  <span className="font-mono text-xs tracking-[0.18em] text-[#A9B3C2] uppercase">
                    {update.date}
                  </span>
                </div>
                <div className="flex-grow">
                  <h3 className="font-heading font-bold text-[#F4F6FA] text-base mb-1">{update.title}</h3>
                  <p className="text-[#A9B3C2] text-sm">{update.summary}</p>
                </div>
                <div className="flex-shrink-0">
                  <button 
                    onClick={() => setDialogOpen(true)}
                    className="text-[#FF4D2E] text-sm hover:underline flex items-center gap-1"
                  >
                    <FileText className="w-4 h-4" />
                    Read
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transparency Section */}
      <section className="relative w-full py-16 md:py-24 bg-[#0B0F17]">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-[6vw]">
          <div className="animate-section bg-[#0D1B2A] rounded-xl p-8 md:p-12 border border-[rgba(244,246,250,0.08)] text-center">
            <div className="w-16 h-16 rounded-full bg-[#0B0F17] flex items-center justify-center mx-auto mb-6 border border-[rgba(244,246,250,0.08)]">
              <FileText className="w-7 h-7 text-[#FF4D2E]" />
            </div>
            <h2 className="font-heading font-bold text-[#F4F6FA] text-2xl sm:text-3xl mb-4">
              Full transparency, always.
            </h2>
            <p className="text-[#A9B3C2] text-sm md:text-base leading-relaxed max-w-[600px] mx-auto mb-8">
              We believe donors deserve to know exactly how their contributions are used. 
              That's why we publish detailed weekly reports on all aid distributions, 
              expenses, and outcomes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => setDialogOpen(true)}
                className="bg-[#FF4D2E] hover:bg-[#E04327] text-white rounded-full px-8 py-3 text-sm font-medium btn-hover transition-colors"
              >
                <FileText className="w-4 h-4 mr-2 inline" />
                View Financial Reports
              </button>
              <a 
                href="mailto:reports@alliancerelief.fund"
                className="text-[#A9B3C2] hover:text-[#F4F6FA] transition-colors text-sm underline underline-offset-4"
              >
                Subscribe to updates
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative w-full py-20 md:py-32 bg-[#0B0F17]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,77,46,0.06)_0%,transparent_50%)]" />
        <div className="relative z-10 max-w-[800px] mx-auto px-4 sm:px-6 lg:px-[6vw] text-center">
          <div className="animate-section">
            <h2 className="font-heading font-bold text-[#F4F6FA] text-3xl sm:text-4xl md:text-5xl mb-6">
              Help us do more.
            </h2>
            <p className="text-[#A9B3C2] text-base md:text-lg leading-relaxed max-w-[600px] mx-auto mb-8">
              Every contribution directly funds aid for families in crisis. 
              Join us in making a measurable difference.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="/donate"
                className="bg-[#FF4D2E] hover:bg-[#E04327] text-white rounded-full px-10 py-3 text-base font-medium btn-hover transition-colors"
              >
                Donate Now
              </a>
              <a 
                href="/contact"
                className="text-[#A9B3C2] hover:text-[#F4F6FA] transition-colors text-sm underline underline-offset-4"
              >
                Contact us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-[#0D1B2A] border-[rgba(244,246,250,0.08)] text-[#F4F6FA] max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">Field Reports</DialogTitle>
            <DialogDescription className="text-[#A9B3C2]">
              Our reports are available via email request. Subscribe to receive weekly updates.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="bg-[#0B0F17] rounded-lg p-4 border border-[rgba(244,246,250,0.08)]">
              <p className="text-sm text-[#A9B3C2] mb-2">Request reports at:</p>
              <a 
                href="mailto:reports@alliancerelief.fund"
                className="text-[#FF4D2E] font-mono text-sm hover:underline flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                reports@alliancerelief.fund
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
