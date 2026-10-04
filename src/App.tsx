import React, { useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, MotionConfig } from 'framer-motion';
import { MapPin, ShoppingCart, BookOpen, Heart, Users, ExternalLink, Menu, X, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ASSETS = {
  logo: "/images/logo.webp",
  bookCover: "/images/book-cover.webp",
  sample1: "/images/sample-sacred-architecture.webp",
  sample2: "/images/sample-cultural-rituals.webp",
  sample3: "/images/sample-wild-wonders.webp",
  lifestyleCloseup: "/images/coloring-closeup.webp",
  lifestyleFamily: "/images/family-coloring.webp",
  texture: "/images/texture.webp"
};

const Section = ({ children, className = "", id = "" }: { children: React.ReactNode, className?: string, id?: string }) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className={`py-20 px-6 md:px-12 lg:px-24 overflow-hidden ${className}`}
  >
    {children}
  </motion.section>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src={ASSETS.logo} alt="Ethio Coloring Books logo" className="w-10 h-10 rounded-full" />
          <span className="font-serif font-bold text-lg hidden sm:block text-[#2D2D2D]">Ethio Coloring Books</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 font-medium text-sm text-[#2D2D2D]">
          <a href="#about" className="hover:text-[#A0522D] transition-colors">About</a>
          <a href="#gallery" className="hover:text-[#A0522D] transition-colors">Samples</a>
          <a href="#buy" className="hover:text-[#A0522D] transition-colors">Where to Buy</a>
          <Button size="sm" className="bg-[#A0522D] hover:bg-[#8B4513] text-white" onClick={() => document.getElementById('buy')?.scrollIntoView({ behavior: 'smooth' })}>
            Shop Now
          </Button>
        </div>

        <button className="md:hidden" aria-label="Open menu" aria-expanded={mobileMenuOpen} onClick={() => setMobileMenuOpen(true)}>
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-[60] flex flex-col p-8"
          >
            <div className="flex justify-end">
              <button aria-label="Close menu" onClick={() => setMobileMenuOpen(false)}>
                <X className="w-8 h-8" />
              </button>
            </div>
            <div className="flex flex-col gap-8 mt-12 text-2xl font-serif">
              <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
              <a href="#gallery" onClick={() => setMobileMenuOpen(false)}>Samples</a>
              <a href="#buy" onClick={() => setMobileMenuOpen(false)}>Where to Buy</a>
              <Button size="lg" className="mt-4 bg-[#A0522D]" onClick={() => { setMobileMenuOpen(false); document.getElementById('buy')?.scrollIntoView({ behavior: 'smooth' }); }}>
                Shop Now
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);

  return (
    <MotionConfig reducedMotion="user">
    <div className="min-h-screen bg-[#FAF9F6] text-[#2D2D2D] font-sans selection:bg-[#A0522D]/20">
      <style>{`
        .font-sans { font-family: 'Inter', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
        
        .texture-overlay {
          background-image: url('${ASSETS.texture}');
          background-repeat: repeat;
          background-size: 300px;
          opacity: 0.05;
        }
      `}</style>
      
      <Navbar />

      {/* Hero Section - Brand Intro */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Added background cover image as requested for the hero section */}
        <div className="absolute inset-0 z-0">
          <img 
            src={ASSETS.bookCover} 
            alt="" 
            className="w-full h-full object-cover opacity-10 pointer-events-none"
          />
        </div>
        <div className="absolute inset-0 texture-overlay pointer-events-none" />
        <motion.div 
          style={{ opacity, scale }}
          className="relative z-10 max-w-4xl"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-8 flex justify-center"
          >
            <div className="relative">
              <img src={ASSETS.logo} alt="Ethio Coloring Books logo" className="w-24 md:w-32 h-24 md:h-32 rounded-full shadow-xl border-4 border-white" />
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4 border-2 border-dashed border-[#A0522D]/30 rounded-full"
              />
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl md:text-7xl font-bold mb-6 tracking-tight leading-tight font-serif"
          >
            Celebrating Ethiopia Through <span className="text-[#A0522D] italic">Creativity</span>
          </motion.h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg md:text-2xl text-slate-600 mb-10 max-w-2xl mx-auto font-light"
          >
            A bridge between culture and imagination, rendered in exquisite line art.
          </motion.p>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <Button size="lg" className="rounded-full px-8 py-6 text-lg h-auto shadow-lg hover:shadow-xl transition-all bg-[#A0522D] hover:bg-[#8B4513]" onClick={() => document.getElementById('product')?.scrollIntoView({ behavior: 'smooth' })}>
              Begin Your Journey <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-400"
        >
          <div className="w-px h-12 bg-gradient-to-b from-[#A0522D]/50 to-transparent mx-auto" />
          <span className="text-xs uppercase tracking-widest mt-2 block">Scroll to Discover</span>
        </motion.div>
      </section>

      {/* Product Reveal Section */}
      <Section id="product" className="bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-10 bg-[#A0522D]/5 blur-3xl rounded-full" />
            <img 
              src={ASSETS.bookCover} 
              alt="Ethiopia in Line Art Book Cover" 
              className="relative rounded-2xl shadow-2xl z-10 w-full max-w-md mx-auto transform hover:rotate-1 transition-transform duration-500"
            />
          </motion.div>
          
          <div className="space-y-8">
            <Badge variant="outline" className="text-[#A0522D] border-[#A0522D] px-4 py-1">Our Signature Product</Badge>
            <h2 id="about" className="text-3xl md:text-5xl font-bold leading-tight font-serif">
              Ethiopia in Line Art:<br/>
              <span className="text-[#A0522D] italic font-serif font-normal">A Fun Coloring Journey</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Discover the beauty of Ethiopia’s heritage, landscapes, and culture through meticulously crafted line art. From the rock-hewn churches of Lalibela to the vibrant traditional coffee ceremony, every page is a canvas for your imagination.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 bg-[#A0522D]/10 p-2 rounded-lg text-[#A0522D]">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold">85 Pages</h4>
                  <p className="text-sm text-slate-500">Original illustrations</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 bg-[#A0522D]/10 p-2 rounded-lg text-[#A0522D]">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold">Family Friendly</h4>
                  <p className="text-sm text-slate-500">For ages 5+</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Gallery Section - Sample Pages */}
      <Section id="gallery" className="bg-[#f3f1eb]">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 font-serif">Artistry in Every Line</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            A glimpse into the intricate designs celebrating the rich tapestry of Ethiopian life and history.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { img: ASSETS.sample1, title: "Sacred Architecture", desc: "The Rock-Hewn Churches of Lalibela" },
            { img: ASSETS.sample2, title: "Cultural Rituals", desc: "The Traditional Coffee Ceremony" },
            { img: ASSETS.sample3, title: "Wild Wonders", desc: "The Magical Sof Omar Cave" }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className="group"
            >
              <Card className="overflow-hidden border-none shadow-lg group-hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
                <div className="relative aspect-square overflow-hidden bg-white">
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    loading="lazy"
                    className="object-contain w-full h-full transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-6 bg-white text-center flex-grow">
                  <h3 className="text-xl font-bold mb-2 font-serif">{item.title}</h3>
                  <p className="text-slate-500 italic text-sm">{item.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Engagement Section - Lifestyle */}
      <Section className="relative bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight font-serif">
              Screen-Free Moments of <br/>
              <span className="text-[#DAA520]">Pure Connection</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              In a world of digital distractions, coloring offers a rhythmic, meditative escape. It's a way for families to gather around a table, sharing stories while bringing culture to life with every stroke of a pencil.
            </p>
            
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-[#FAF9F6] border-l-4 border-[#DAA520] shadow-sm">
                <Users className="w-8 h-8 text-[#DAA520] shrink-0" />
                <div>
                  <p className="font-medium">Multi-generational Joy</p>
                  <p className="text-sm text-slate-500">Perfect for collaborative family projects.</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-[#FAF9F6] border-l-4 border-[#2E4A31] shadow-sm">
                <Heart className="w-8 h-8 text-[#2E4A31] shrink-0" />
                <div>
                  <p className="font-medium">Mindful Relaxation</p>
                  <p className="text-sm text-slate-500">A calm, screen-free way to unwind and focus.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="order-1 md:order-2 grid grid-cols-2 gap-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="col-span-2 rounded-2xl overflow-hidden shadow-xl"
            >
              <img src={ASSETS.lifestyleFamily} alt="A family coloring Ethiopia in Line Art together" loading="lazy" className="w-full h-64 md:h-80 object-cover object-[center_30%]" />
            </motion.div>
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="rounded-2xl overflow-hidden shadow-xl h-48 md:h-64"
            >
              <img src={ASSETS.lifestyleCloseup} alt="Ethiopia in Line Art open on a table with colored pencils" loading="lazy" className="w-full h-full object-cover" />
            </motion.div>
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="rounded-2xl bg-[#DAA520] p-6 flex flex-col justify-center text-white h-48 md:h-64"
            >
              <span className="text-3xl md:text-5xl font-serif font-bold mb-2 italic text-white/90">Original</span>
              <p className="text-sm md:text-base font-medium leading-tight">Line art celebrating Ethiopian life and heritage</p>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Website Mockup Section */}
      <section className="relative py-24 bg-[#A0522D] text-white overflow-hidden">
        <div className="absolute inset-0 texture-overlay opacity-10" />
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12 border-4 border-white/20 rounded-3xl overflow-hidden shadow-2xl bg-white/5 backdrop-blur-sm"
          >
             
             <div className="p-8 md:p-16 space-y-8">
               <motion.div
                 initial={{ y: 50, opacity: 0 }}
                 whileInView={{ y: 0, opacity: 1 }}
                 viewport={{ once: true }}
                 transition={{ duration: 1 }}
               >
                 <img src={ASSETS.logo} className="w-16 h-16 mx-auto mb-6 rounded-full" alt="" />
                 <h3 className="text-2xl md:text-4xl font-serif mb-6 italic">Our Story</h3>
                 <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto font-light">
                   Born from a love for Ethiopian heritage and a passion for artistic expression, Ethio Coloring Books creates high-quality educational resources that inspire creativity across generations. We believe that by coloring our past, we brighten our future.
                 </p>
               </motion.div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section - Where to Buy */}
      <Section id="buy" className="bg-[#FAF9F6]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 font-serif">Bring the Journey Home</h2>
            <p className="text-lg text-slate-600">Choose your preferred way to purchase your first copy.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="h-full border-none shadow-xl hover:shadow-2xl transition-all duration-300 p-8 flex flex-col items-center text-center bg-white">
                <div className="w-16 h-16 rounded-2xl bg-[#2E4A31]/10 text-[#2E4A31] flex items-center justify-center mb-6">
                  <MapPin className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4 font-serif">Available in Addis Ababa</h3>
                <div className="mb-6 space-y-2">
                  <p className="text-xl font-serif font-bold text-[#2E4A31]">Ankeboot Publishing</p>
                  <p className="text-slate-500">4 Kilo, In front of the National Museum</p>
                </div>
                <div className="mt-auto">
                  <Button 
                    variant="outline" 
                    className="group-hover:bg-[#2E4A31] group-hover:text-white transition-colors border-[#2E4A31] text-[#2E4A31]"
                    asChild
                  >
                    <a 
                      href="https://www.google.com/maps/place/Ankeboot+Book+Store/@9.0342412,38.7625273,17z/data=!3m1!4b1!4m6!3m5!1s0x164b8f7933906a51:0x1fef98757fbf9fc9!8m2!3d9.0342412!4d38.7625273!16s%2Fg%2F11h6gjfgt2" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      View on Map
                    </a>
                  </Button>
                </div>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="h-full border-none shadow-xl hover:shadow-2xl transition-all duration-300 p-8 flex flex-col items-center text-center bg-[#232F3E] text-white">
                <div className="w-16 h-16 rounded-2xl bg-white/10 text-white flex items-center justify-center mb-6">
                  <ShoppingCart className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4 font-serif">Worldwide Shipping</h3>
                <div className="mb-6 space-y-2">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-3xl font-bold">amazon</span>
                  </div>
                  <p className="text-white/60">Available on Amazon Marketplace</p>
                </div>
                <div className="mt-auto">
                  <Button 
                    className="bg-[#FF9900] hover:bg-[#FF9900]/90 text-[#232F3E] font-bold border-none"
                    asChild
                  >
                    <a 
                      href="https://www.amazon.com/dp/B0FPMHS46N" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Buy on Amazon <ExternalLink className="ml-2 w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Footer - Closing */}
      <footer className="py-20 bg-[#1a1a1a] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 texture-overlay opacity-5 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center"
          >
            <img src={ASSETS.logo} alt="" className="w-20 h-20 rounded-full mb-8 filter grayscale brightness-200" />
            <h3 className="text-2xl md:text-3xl font-serif italic mb-6">Ethio Coloring Books</h3>
            <p className="text-white/50 mb-12 max-w-lg mx-auto">
              A creative bridge between culture and imagination. Proudly celebrating the vibrant spirit of Ethiopia.
            </p>
            
            <div className="text-[10px] uppercase tracking-widest text-white/30 border-t border-white/10 pt-10 w-full">
              &copy; {new Date().getFullYear()} Ethio Coloring Books. All rights reserved.
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
    </MotionConfig>
  );
}
