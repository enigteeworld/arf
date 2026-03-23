import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Heart, 
  Home as HomeIcon, 
  Droplets, 
  ChevronRight,
  Clock,
  HandHeart,
  Eye,
  ArrowRight
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Hero Section Component
function HeroSection({ 
  eyebrow, 
  headline, 
  subheadline, 
  cta, 
  cardHeadline, 
  cardBody, 
  progressLabel, 
  bgImage,
  isFirst = false
}: { 
  eyebrow: string;
  headline: string;
  subheadline: string;
  cta: string;
  cardHeadline: string;
  cardBody: string;
  progressLabel: string;
  bgImage: string;
  isFirst?: boolean;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadlineRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Initial load animation for first hero
      if (isFirst) {
        gsap.fromTo(bgRef.current,
          { scale: 1.08, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1, ease: 'power2.out' }
        );
        const eyebrowEl = headlineRef.current?.querySelector('.eyebrow');
        if (eyebrowEl) {
          gsap.fromTo(eyebrowEl,
            { y: -10, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, delay: 0.2 }
          );
        }
        const headlineWords = headlineRef.current?.querySelectorAll('.headline-word');
        if (headlineWords && headlineWords.length > 0) {
          gsap.fromTo(headlineWords,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, stagger: 0.06, delay: 0.3, ease: 'power2.out' }
          );
        }
        gsap.fromTo(subheadlineRef.current,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, delay: 0.55 }
        );
        gsap.fromTo(cardRef.current,
          { x: '10vw', opacity: 0 },
          { x: 0, opacity: 1, duration: 0.9, ease: 'power2.out', delay: 0.35 }
        );
        const progressFill = progressRef.current?.querySelector('.progress-fill');
        if (progressFill) {
          gsap.fromTo(progressFill,
            { scaleX: 0 },
            { scaleX: 0.64, duration: 1, delay: 0.6, ease: 'power2.out' }
          );
        }
      }

      // Scroll-driven animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 0.5,
        }
      });

      if (!isFirst) {
        scrollTl.fromTo(bgRef.current,
          { scale: 1.08, y: '4vh', opacity: 0.6 },
          { scale: 1, y: 0, opacity: 1, ease: 'none' }
        );
        scrollTl.fromTo(headlineRef.current,
          { x: '-10vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        );
        scrollTl.fromTo(subheadlineRef.current,
          { y: '8vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.1
        );
        scrollTl.fromTo(cardRef.current,
          { x: '10vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.05
        );
      }
    }, section);

    return () => ctx.revert();
  }, [isFirst]);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-[90vh] md:min-h-screen overflow-hidden flex items-center"
    >
      {/* Background Image */}
      <div 
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{ willChange: 'transform' }}
      >
        <img 
          src={bgImage} 
          alt="" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-[6vw] py-24 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center max-w-[1400px] mx-auto">
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            <div ref={headlineRef}>
              <span className="eyebrow font-mono text-xs tracking-[0.18em] text-[#A9B3C2] uppercase block mb-4">
                {eyebrow}
              </span>
              <h1 className="font-heading font-bold uppercase text-[#F4F6FA] leading-[0.95] tracking-[0.02em] mb-6"
                  style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}>
                {headline.split(' ').map((word, i) => (
                  <span key={i} className="headline-word inline-block mr-[0.3em]">{word}</span>
                ))}
              </h1>
            </div>
            
            <div ref={subheadlineRef} className="max-w-[500px]">
              <p className="text-[#A9B3C2] text-base md:text-lg leading-relaxed mb-6">
                {subheadline}
              </p>
              <Link to="/donate">
                <Button className="bg-[#FF4D2E] hover:bg-[#E04327] text-white rounded-full px-8 py-3 text-sm font-medium btn-hover">
                  {cta}
                </Button>
              </Link>
            </div>

            {/* Progress Bar - Desktop */}
            <div 
              ref={progressRef}
              className="hidden lg:block mt-12 max-w-[400px]"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-mono text-xs tracking-[0.18em] text-[#A9B3C2] uppercase">
                  {progressLabel}
                </span>
                <span className="font-mono text-xs text-[#F4F6FA]">
                  64% of initial target
                </span>
              </div>
              <div className="h-1.5 bg-[rgba(244,246,250,0.12)] rounded-full overflow-hidden">
                <div className="progress-fill h-full bg-[#FF4D2E] rounded-full" style={{ transformOrigin: 'left' }} />
              </div>
            </div>
          </div>

          {/* Right Card */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div 
              ref={cardRef}
              className="w-full max-w-[420px] bg-[#0D1B2A]/80 backdrop-blur-sm rounded-xl p-6 border border-[rgba(244,246,250,0.08)]"
            >
              <h3 className="font-heading font-bold text-[#F4F6FA] text-lg mb-3">
                {cardHeadline}
              </h3>
              <p className="text-[#A9B3C2] text-sm leading-relaxed">
                {cardBody}
              </p>
            </div>
          </div>
        </div>

        {/* Progress Bar - Mobile */}
        <div className="lg:hidden mt-8 max-w-[400px] mx-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="font-mono text-xs tracking-[0.18em] text-[#A9B3C2] uppercase">
              {progressLabel}
            </span>
            <span className="font-mono text-xs text-[#F4F6FA]">
              64% of target
            </span>
          </div>
          <div className="h-1.5 bg-[rgba(244,246,250,0.12)] rounded-full overflow-hidden">
            <div className="h-full bg-[#FF4D2E] rounded-full" style={{ width: '64%' }} />
          </div>
        </div>
      </div>
    </section>
  );
}

// Mission Section
function MissionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const h2 = sectionRef.current?.querySelector('h2');
      const p = sectionRef.current?.querySelector('p');
      const pillars = sectionRef.current?.querySelectorAll('.pillar');
      
      if (h2) {
        gsap.fromTo(h2,
          { y: 40, opacity: 0 },
          { 
            y: 0, opacity: 1, 
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              end: 'top 55%',
              scrub: true
            }
          }
        );
      }
      if (p) {
        gsap.fromTo(p,
          { y: 30, opacity: 0 },
          { 
            y: 0, opacity: 1, 
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              end: 'top 50%',
              scrub: true
            }
          }
        );
      }
      if (pillars && pillars.length > 0) {
        gsap.fromTo(pillars,
          { y: 50, opacity: 0 },
          { 
            y: 0, opacity: 1, stagger: 0.12,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
              end: 'top 40%',
              scrub: true
            }
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full py-20 md:py-32 bg-[#0B0F17]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center_top,rgba(13,27,42,0.55)_0%,transparent_60%)]" />
      <div className="relative z-10 max-w-[920px] mx-auto px-4 sm:px-6 lg:px-[6vw] text-center">
        <h2 className="font-heading font-bold text-[#F4F6FA] text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-6 leading-tight">
          We exist to get help to families—fast.
        </h2>
        <p className="text-[#A9B3C2] text-base md:text-lg leading-relaxed max-w-[700px] mx-auto mb-16">
          Alliance Relief Fund coordinates emergency aid, shelter, and medical support for communities affected by conflict. We work with vetted local partners and publish weekly updates.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-[1100px] mx-auto">
          <div className="pillar flex flex-col items-center text-center p-6 bg-[#0D1B2A]/50 rounded-xl border border-[rgba(244,246,250,0.08)]">
            <div className="w-12 h-12 rounded-full bg-[#0D1B2A] flex items-center justify-center mb-4 border border-[rgba(244,246,250,0.08)]">
              <Clock className="w-5 h-5 text-[#FF4D2E]" />
            </div>
            <h3 className="font-heading font-bold text-[#F4F6FA] text-lg mb-2">Rapid Response</h3>
            <p className="text-[#A9B3C2] text-sm leading-relaxed">24–72 hour aid deployment to affected areas.</p>
          </div>
          <div className="pillar flex flex-col items-center text-center p-6 bg-[#0D1B2A]/50 rounded-xl border border-[rgba(244,246,250,0.08)]">
            <div className="w-12 h-12 rounded-full bg-[#0D1B2A] flex items-center justify-center mb-4 border border-[rgba(244,246,250,0.08)]">
              <HandHeart className="w-5 h-5 text-[#FF4D2E]" />
            </div>
            <h3 className="font-heading font-bold text-[#F4F6FA] text-lg mb-2">Local Partnerships</h3>
            <p className="text-[#A9B3C2] text-sm leading-relaxed">We fund trusted organizations on the ground.</p>
          </div>
          <div className="pillar flex flex-col items-center text-center p-6 bg-[#0D1B2A]/50 rounded-xl border border-[rgba(244,246,250,0.08)] sm:col-span-2 md:col-span-1">
            <div className="w-12 h-12 rounded-full bg-[#0D1B2A] flex items-center justify-center mb-4 border border-[rgba(244,246,250,0.08)]">
              <Eye className="w-5 h-5 text-[#FF4D2E]" />
            </div>
            <h3 className="font-heading font-bold text-[#F4F6FA] text-lg mb-2">Full Transparency</h3>
            <p className="text-[#A9B3C2] text-sm leading-relaxed">Weekly reports. Every dollar tracked.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Impact Preview Section
function ImpactPreviewSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const h2 = sectionRef.current?.querySelector('h2');
      const statCards = sectionRef.current?.querySelectorAll('.stat-card');
      
      if (h2) {
        gsap.fromTo(h2,
          { y: 24, opacity: 0 },
          { 
            y: 0, opacity: 1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              end: 'top 60%',
              scrub: true
            }
          }
        );
      }
      if (statCards && statCards.length > 0) {
        gsap.fromTo(statCards,
          { y: 60, opacity: 0 },
          { 
            y: 0, opacity: 1, stagger: 0.15,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              end: 'top 45%',
              scrub: true
            }
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full py-20 md:py-32 bg-[#0B0F17]"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-[6vw]">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <h2 className="font-heading font-bold text-[#F4F6FA] text-2xl sm:text-3xl md:text-4xl mb-4 md:mb-0">
            Impact so far
          </h2>
          <Link 
            to="/impact"
            className="text-[#FF4D2E] text-sm hover:underline flex items-center gap-2"
          >
            View full impact report
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-12">
          <div className="stat-card bg-[#0D1B2A] rounded-xl p-6 md:p-8 border border-[rgba(244,246,250,0.08)] card-hover">
            <div className="font-heading font-bold text-[#FF4D2E] text-3xl md:text-4xl lg:text-5xl mb-2">12,400+</div>
            <p className="text-[#A9B3C2] text-sm">People assisted with shelter or food</p>
          </div>
          <div className="stat-card bg-[#0D1B2A] rounded-xl p-6 md:p-8 border border-[rgba(244,246,250,0.08)] card-hover">
            <div className="font-heading font-bold text-[#FF4D2E] text-3xl md:text-4xl lg:text-5xl mb-2">$2.1M</div>
            <p className="text-[#A9B3C2] text-sm">Allocated to local partners</p>
          </div>
          <div className="stat-card bg-[#0D1B2A] rounded-xl p-6 md:p-8 border border-[rgba(244,246,250,0.08)] card-hover sm:col-span-2 md:col-span-1">
            <div className="font-heading font-bold text-[#FF4D2E] text-3xl md:text-4xl lg:text-5xl mb-2">38</div>
            <p className="text-[#A9B3C2] text-sm">Aid distributions completed</p>
          </div>
        </div>
        
        {/* Story Card */}
        <div className="bg-[#0D1B2A] rounded-xl overflow-hidden border border-[rgba(244,246,250,0.08)]">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div>
              <img 
                src="/images/impact_story_housing.jpg" 
                alt="Temporary housing relief efforts"
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="p-6 md:p-10 flex flex-col justify-center">
              <h3 className="font-heading font-bold text-[#F4F6FA] text-xl md:text-2xl mb-4">
                From displacement to temporary housing
              </h3>
              <p className="text-[#A9B3C2] text-sm leading-relaxed mb-6">
                We helped coordinate transport, meals, and medical screening for families arriving in safe zones—then connected them to longer-term housing support.
              </p>
              <Link to="/impact">
                <Button 
                  variant="outline"
                  className="w-fit border-[#FF4D2E] text-[#FF4D2E] hover:bg-[#FF4D2E] hover:text-white rounded-full px-6"
                >
                  Read the full story
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Donation Preview Section
function DonatePreviewSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sectionHeader = sectionRef.current?.querySelector('.section-header');
      const tierCards = sectionRef.current?.querySelectorAll('.tier-card');
      
      if (sectionHeader) {
        gsap.fromTo(sectionHeader,
          { y: 30, opacity: 0 },
          { 
            y: 0, opacity: 1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              end: 'top 60%',
              scrub: true
            }
          }
        );
      }
      if (tierCards && tierCards.length > 0) {
        gsap.fromTo(tierCards,
          { y: 70, opacity: 0, scale: 0.98 },
          { 
            y: 0, opacity: 1, scale: 1, stagger: 0.12,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              end: 'top 40%',
              scrub: true
            }
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const tiers = [
    { amount: '$50', description: 'Emergency meals + water for a family', icon: Droplets },
    { amount: '$150', description: 'Temporary shelter kit + hygiene supplies', icon: HomeIcon },
    { amount: '$500', description: 'Medical support + transport for urgent cases', icon: Heart },
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative w-full py-20 md:py-32 bg-[#0B0F17]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,77,46,0.06)_0%,transparent_50%)]" />
      <div className="relative z-10 max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-[6vw]">
        <div className="section-header text-center mb-12">
          <h2 className="font-heading font-bold text-[#F4F6FA] text-2xl sm:text-3xl md:text-4xl mb-4">
            How to help
          </h2>
          <p className="text-[#A9B3C2] text-base md:text-lg">
            Choose a tier. 100% of contributions go to aid programs.
          </p>
        </div>
        
        {/* Tier Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-12">
          {tiers.map((tier, index) => (
            <Link 
              key={index}
              to="/donate"
              className="tier-card bg-[#0D1B2A] rounded-xl overflow-hidden border border-[rgba(244,246,250,0.08)] cursor-pointer card-hover group block"
            >
              <div className="h-1 bg-[#FF4D2E]" />
              <div className="p-6 md:p-8">
                <div className="w-12 h-12 rounded-full bg-[#0B0F17] flex items-center justify-center mb-6 border border-[rgba(244,246,250,0.08)] group-hover:border-[#FF4D2E] transition-colors">
                  <tier.icon className="w-5 h-5 text-[#FF4D2E]" />
                </div>
                <div className="font-heading font-bold text-[#F4F6FA] text-2xl md:text-3xl lg:text-4xl mb-3">
                  {tier.amount}
                </div>
                <p className="text-[#A9B3C2] text-sm leading-relaxed">
                  {tier.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
        
        {/* CTA */}
        <div className="text-center">
          <Link to="/donate">
            <Button className="bg-[#FF4D2E] hover:bg-[#E04327] text-white rounded-full px-10 py-3 text-base font-medium btn-hover">
              View All Donation Options
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const content = sectionRef.current?.querySelector('.cta-content');
      
      if (content) {
        gsap.fromTo(content,
          { y: 40, opacity: 0 },
          { 
            y: 0, opacity: 1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              end: 'top 55%',
              scrub: true
            }
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full py-20 md:py-32 bg-[#0B0F17]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,77,46,0.06)_0%,transparent_50%)]" />
      <div className="relative z-10 max-w-[800px] mx-auto px-4 sm:px-6 lg:px-[6vw] text-center">
        <div className="cta-content">
          <h2 className="font-heading font-bold text-[#F4F6FA] text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
            Stand with those displaced.
          </h2>
          <p className="text-[#A9B3C2] text-base md:text-lg leading-relaxed max-w-[600px] mx-auto mb-10">
            Your contribution funds shelter, medical aid, and transport for families affected by conflict.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/donate">
              <Button className="bg-[#FF4D2E] hover:bg-[#E04327] text-white rounded-full px-10 py-3 text-base font-medium btn-hover">
                Donate Now
              </Button>
            </Link>
            <Link 
              to="/contact"
              className="text-[#A9B3C2] hover:text-[#F4F6FA] transition-colors text-sm underline underline-offset-4"
            >
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// Main Home Page
export default function Home() {
  return (
    <div>
      {/* Hero Sections */}
      <HeroSection
        eyebrow="HUMANITARIAN RESPONSE"
        headline="PEOPLE ARE BEING DISPLACED"
        subheadline="Families are leaving everything behind. Emergency shelter, food, and medical aid are needed now."
        cta="Donate Now"
        cardHeadline="Cities across the region are under increased threat."
        cardBody="We're coordinating with local partners to deliver aid where it's most urgent."
        progressLabel="RESPONSE FUNDING"
        bgImage="/images/hero_displacement.jpg"
        isFirst={true}
      />
      
      <HeroSection
        eyebrow="EMERGENCY AID"
        headline="HOMES ARE BEING DESTROYED"
        subheadline="Entire streets have been damaged. Families need temporary housing and basic supplies."
        cta="Contribute"
        cardHeadline="Infrastructure damage is limiting access to water and power."
        cardBody="Our teams are distributing water, hygiene kits, and backup power supplies."
        progressLabel="SHELTER FUNDING"
        bgImage="/images/hero_homes_lost.jpg"
      />
      
      <HeroSection
        eyebrow="REGIONAL IMPACT"
        headline="CITIES ARE BEING AFFECTED"
        subheadline="Hospitals, schools, and transit are under strain. Your support keeps aid moving."
        cta="Send Support"
        cardHeadline="Municipal systems need backup resources."
        cardBody="We're funding fuel for generators, medical inventory, and emergency transport."
        progressLabel="CITY RELIEF FUNDING"
        bgImage="/images/hero_cities_affected.jpg"
      />

      {/* Content Sections */}
      <MissionSection />
      <ImpactPreviewSection />
      <DonatePreviewSection />
      <CTASection />
    </div>
  );
}
