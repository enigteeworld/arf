import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Clock, 
  HandHeart, 
  Eye, 
  Shield, 
  Users, 
  Zap, 
  Globe, 
  Target,
  Heart,
  CheckCircle
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Team Member Component
function TeamMember({ name, role, bio }: { name: string; role: string; bio: string }) {
  return (
    <div className="bg-[#0D1B2A] rounded-xl p-6 border border-[rgba(244,246,250,0.08)] card-hover">
      <div className="w-16 h-16 rounded-full bg-[#0B0F17] flex items-center justify-center mb-4 border border-[rgba(244,246,250,0.08)]">
        <Users className="w-7 h-7 text-[#FF4D2E]" />
      </div>
      <h4 className="font-heading font-bold text-[#F4F6FA] text-lg mb-1">{name}</h4>
      <p className="text-[#FF4D2E] text-sm mb-3">{role}</p>
      <p className="text-[#A9B3C2] text-sm leading-relaxed">{bio}</p>
    </div>
  );
}

// Value Card Component
function ValueCard({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center text-center p-6">
      <div className="w-14 h-14 rounded-full bg-[#0D1B2A] flex items-center justify-center mb-4 border border-[rgba(244,246,250,0.08)]">
        <Icon className="w-6 h-6 text-[#FF4D2E]" />
      </div>
      <h3 className="font-heading font-bold text-[#F4F6FA] text-lg mb-2">{title}</h3>
      <p className="text-[#A9B3C2] text-sm leading-relaxed">{description}</p>
    </div>
  );
}

export default function About() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate sections on scroll
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

      // Animate cards with stagger
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

  const values = [
    { icon: Clock, title: 'Rapid Response', description: '24–72 hour aid deployment to affected areas. Speed saves lives.' },
    { icon: HandHeart, title: 'Local Partnerships', description: 'We fund trusted organizations already on the ground.' },
    { icon: Eye, title: 'Full Transparency', description: 'Weekly reports. Every dollar tracked and accounted for.' },
    { icon: Shield, title: 'Accountability', description: 'Rigorous verification of all aid deliveries and distributions.' },
    { icon: Globe, title: 'Global Reach', description: 'Coordinating with international partners for maximum impact.' },
    { icon: Target, title: 'Targeted Aid', description: 'Resources directed where they are needed most urgently.' },
  ];

  const team = [
    { 
      name: 'Sarah Mitchell', 
      role: 'Executive Director', 
      bio: 'Former UN humanitarian coordinator with 15+ years of experience in crisis response.' 
    },
    { 
      name: 'David Chen', 
      role: 'Operations Director', 
      bio: 'Led emergency response teams across 20+ countries. Expert in logistics and supply chain.' 
    },
    { 
      name: 'Amara Okafor', 
      role: 'Partnerships Director', 
      bio: 'Builds and maintains relationships with local NGOs and community organizations.' 
    },
    { 
      name: 'James Rodriguez', 
      role: 'Finance Director', 
      bio: 'Ensures every dollar is accounted for. Former auditor for international aid organizations.' 
    },
  ];

  const achievements = [
    'Distributed over $2.1 million in aid funding',
    'Assisted 12,400+ people with shelter and food',
    'Completed 38 successful aid distributions',
    'Partnered with 25+ local organizations',
    'Maintained 100% financial transparency',
    'Responded to crises in 8 countries',
  ];

  return (
    <div ref={pageRef} className="pt-20 md:pt-24">
      {/* Hero Section */}
      <section className="relative w-full py-20 md:py-32 bg-[#0B0F17]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center_top,rgba(13,27,42,0.55)_0%,transparent_60%)]" />
        <div className="relative z-10 max-w-[900px] mx-auto px-4 sm:px-6 lg:px-[6vw] text-center">
          <span className="animate-section font-mono text-xs tracking-[0.18em] text-[#A9B3C2] uppercase block mb-4">
            About Us
          </span>
          <h1 className="animate-section font-heading font-bold text-[#F4F6FA] text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
            We exist to get help to families—fast.
          </h1>
          <p className="animate-section text-[#A9B3C2] text-base md:text-lg leading-relaxed max-w-[700px] mx-auto">
            Alliance Relief Fund was founded on a simple belief: when crisis strikes, 
            every hour matters. We coordinate emergency aid, shelter, and medical support 
            for communities affected by conflict.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="relative w-full py-16 md:py-24 bg-[#0B0F17]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-[6vw]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="animate-section">
              <span className="font-mono text-xs tracking-[0.18em] text-[#A9B3C2] uppercase block mb-4">
                Our Story
              </span>
              <h2 className="font-heading font-bold text-[#F4F6FA] text-2xl sm:text-3xl md:text-4xl mb-6">
                Born from urgency. Built for impact.
              </h2>
              <div className="space-y-4 text-[#A9B3C2] text-sm md:text-base leading-relaxed">
                <p>
                  Alliance Relief Fund was established in 2024 in response to the growing 
                  humanitarian crisis affecting US allies in the Middle East. What began as 
                  an emergency response initiative has grown into a comprehensive aid coordination 
                  organization.
                </p>
                <p>
                  We work directly with vetted local partners who know their communities best. 
                  This approach ensures aid reaches those who need it most, quickly and efficiently.
                </p>
                <p>
                  Our team brings decades of combined experience from the UN, Red Cross, and 
                  other leading humanitarian organizations. We understand that in crisis, 
                  every dollar and every hour counts.
                </p>
              </div>
            </div>
            <div className="animate-section card-group grid grid-cols-2 gap-4">
              <div className="stagger-card bg-[#0D1B2A] rounded-xl p-6 border border-[rgba(244,246,250,0.08)] text-center">
                <div className="font-heading font-bold text-[#FF4D2E] text-3xl md:text-4xl mb-2">2+</div>
                <p className="text-[#A9B3C2] text-sm">Years Active</p>
              </div>
              <div className="stagger-card bg-[#0D1B2A] rounded-xl p-6 border border-[rgba(244,246,250,0.08)] text-center">
                <div className="font-heading font-bold text-[#FF4D2E] text-3xl md:text-4xl mb-2">25+</div>
                <p className="text-[#A9B3C2] text-sm">Partner Organizations</p>
              </div>
              <div className="stagger-card bg-[#0D1B2A] rounded-xl p-6 border border-[rgba(244,246,250,0.08)] text-center">
                <div className="font-heading font-bold text-[#FF4D2E] text-3xl md:text-4xl mb-2">8</div>
                <p className="text-[#A9B3C2] text-sm">Countries Served</p>
              </div>
              <div className="stagger-card bg-[#0D1B2A] rounded-xl p-6 border border-[rgba(244,246,250,0.08)] text-center">
                <div className="font-heading font-bold text-[#FF4D2E] text-3xl md:text-4xl mb-2">100%</div>
                <p className="text-[#A9B3C2] text-sm">Transparency</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="relative w-full py-16 md:py-24 bg-[#0B0F17]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,77,46,0.04)_0%,transparent_60%)]" />
        <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-[6vw]">
          <div className="text-center mb-12 md:mb-16">
            <span className="animate-section font-mono text-xs tracking-[0.18em] text-[#A9B3C2] uppercase block mb-4">
              Our Values
            </span>
            <h2 className="animate-section font-heading font-bold text-[#F4F6FA] text-2xl sm:text-3xl md:text-4xl">
              Principles that guide our work
            </h2>
          </div>
          
          <div className="animate-section card-group grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {values.map((value, index) => (
              <div key={index} className="stagger-card bg-[#0D1B2A]/50 rounded-xl p-6 border border-[rgba(244,246,250,0.08)]">
                <ValueCard {...value} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="relative w-full py-16 md:py-24 bg-[#0B0F17]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-[6vw]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div className="animate-section">
              <span className="font-mono text-xs tracking-[0.18em] text-[#A9B3C2] uppercase block mb-4">
                How We Work
              </span>
              <h2 className="font-heading font-bold text-[#F4F6FA] text-2xl sm:text-3xl md:text-4xl mb-6">
                Our process is designed for speed and accountability.
              </h2>
              <p className="text-[#A9B3C2] text-sm md:text-base leading-relaxed mb-8">
                Every contribution goes through a rigorous process to ensure it reaches 
                those who need it most, when they need it most.
              </p>
              
              <div className="space-y-6">
                {[
                  { icon: Shield, title: 'Needs Assessment', desc: 'We work with local partners to identify the most urgent needs.' },
                  { icon: Zap, title: 'Rapid Allocation', desc: 'Funds are allocated within 48-72 hours of receiving contributions.' },
                  { icon: Users, title: 'Delivery & Verification', desc: 'Aid is delivered and verified by our on-ground partners.' },
                  { icon: Eye, title: 'Public Reporting', desc: 'Weekly reports keep donors informed of every dollar spent.' },
                ].map((step, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#0D1B2A] flex items-center justify-center flex-shrink-0 border border-[rgba(244,246,250,0.08)]">
                      <step.icon className="w-4 h-4 text-[#FF4D2E]" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-[#F4F6FA] text-base mb-1">{step.title}</h4>
                      <p className="text-[#A9B3C2] text-sm">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="animate-section">
              <img 
                src="/images/impact_story_housing.jpg" 
                alt="Aid distribution"
                className="w-full h-64 md:h-full object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="relative w-full py-16 md:py-24 bg-[#0B0F17]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,77,46,0.06)_0%,transparent_50%)]" />
        <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-[6vw]">
          <div className="text-center mb-12">
            <span className="animate-section font-mono text-xs tracking-[0.18em] text-[#A9B3C2] uppercase block mb-4">
              Our Impact
            </span>
            <h2 className="animate-section font-heading font-bold text-[#F4F6FA] text-2xl sm:text-3xl md:text-4xl">
              What we've accomplished together
            </h2>
          </div>
          
          <div className="animate-section card-group grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {achievements.map((achievement, index) => (
              <div 
                key={index} 
                className="stagger-card flex items-center gap-3 p-4 md:p-6 bg-[#0D1B2A] rounded-xl border border-[rgba(244,246,250,0.08)]"
              >
                <CheckCircle className="w-5 h-5 text-[#FF4D2E] flex-shrink-0" />
                <span className="text-[#F4F6FA] text-sm">{achievement}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative w-full py-16 md:py-24 bg-[#0B0F17]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-[6vw]">
          <div className="text-center mb-12 md:mb-16">
            <span className="animate-section font-mono text-xs tracking-[0.18em] text-[#A9B3C2] uppercase block mb-4">
              Our Team
            </span>
            <h2 className="animate-section font-heading font-bold text-[#F4F6FA] text-2xl sm:text-3xl md:text-4xl">
              Meet the people behind the mission
            </h2>
          </div>
          
          <div className="animate-section card-group grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {team.map((member, index) => (
              <div key={index} className="stagger-card">
                <TeamMember {...member} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="relative w-full py-16 md:py-24 bg-[#0B0F17]">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-[6vw]">
          <div className="text-center mb-12">
            <span className="animate-section font-mono text-xs tracking-[0.18em] text-[#A9B3C2] uppercase block mb-4">
              Our Partners
            </span>
            <h2 className="animate-section font-heading font-bold text-[#F4F6FA] text-2xl sm:text-3xl md:text-4xl">
              Supported by partners. Powered by communities.
            </h2>
          </div>
          
          <div className="animate-section flex flex-wrap justify-center items-center gap-6 md:gap-10">
            {[
              'Global Aid Network',
              'Relief International',
              'Humanity First',
              'Crisis Response',
              'Aid Alliance',
              'Hope Foundation',
            ].map((partner, index) => (
              <div 
                key={index}
                className="text-[#A9B3C2] text-sm font-medium opacity-60 hover:opacity-100 transition-opacity"
              >
                {partner}
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
            <Heart className="w-12 h-12 text-[#FF4D2E] mx-auto mb-6" />
            <h2 className="font-heading font-bold text-[#F4F6FA] text-3xl sm:text-4xl md:text-5xl mb-6">
              Join our mission.
            </h2>
            <p className="text-[#A9B3C2] text-base md:text-lg leading-relaxed max-w-[600px] mx-auto mb-8">
              Whether you contribute, partner with us, or spread the word, 
              you are helping families in their time of greatest need.
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
                Get in touch
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
