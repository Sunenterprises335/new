import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; 

// CLOUDINARY REFACTOR: Import Cloudinary SDKs
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, AdvancedVideo } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { auto } from "@cloudinary/url-gen/qualifiers/quality";
import { auto as fAuto } from "@cloudinary/url-gen/qualifiers/format";
import { video } from 'framer-motion/client';

// CLOUDINARY REFACTOR: Initialize Cloudinary with your Cloud Name
const cld = new Cloudinary({
  cloud: {
    cloudName: 'dcmpwru4y' // Your Cloud Name
  }
});

// ==================== CONFIGURATION FILE (UNCHANGED) ====================
const config = {
  logoId: "kaim56lfzku0sjhalsxi", 
  videoId: "samples/coffee", 
  socialLinks: {
    facebook: "https://www.facebook.com/YourPage",         
    instagram: "https://www.instagram.com/___sun__enterprises___/",     
    linkedin: "https://www.linkedin.com/in/sun-enterprises-5ab8a13a1/",  
    whatsapp: "https://wa.me/919320404204?text=Hello%20Sun%20Enterprises" 
  },
  ourWork: [
      "dt8xqbrvydvvw6nhxiwq", "g9jpp2smj1wkcjre2o0i","saq5easfju1ekl0gjwo3","tagkuupahtsrgddgagy8","v5xzmksvm5bp5jdmeyqh","vowlnvnxxgl41fdwasqj", "hxmk1txaj2d1ysxsag2e", "clybxcer0fqvxa3vkb61","vxb4gbsjbu4asmdvpkiz"
  
    ],
  services: [
    { icon: "📦", title: "Food Packaging Boxes", description: "Custom boxes for pizza, noodles, cakes, pastries, and all food items.", features: ["FDA Approved Materials", "Microwave Safe", "Custom Sizes", "Eco-friendly"], imageId: "jziqw4rtbdvdefv7n5ei" },
    { icon: "🥤", title: "Paper Products", description: "Complete range of disposable paper products for food service industry.", features: ["Paper Plates & Glasses", "Carry Bags", "Tissue Papers", "Burger Bags"], imageId: "ptn6qjucwnjskfkgpynr" },
    { icon: "🖨️", title: "Printing Services", description: "High-quality commercial and custom printing solutions.", features: ["Digital Printing", "Offset Printing", "Label Printing", "Brochures"], imageId: "uaof6sbwgly9f2pzluwa" },
    { icon: "🎨", title: "Custom Solutions", description: "Tailored packaging and printing solutions for unique requirements.", features: ["Custom Designs", "Brand Packaging", "Special Finishes", "Prototyping"], imageId: "u0khivuce3kpsefsmpmc" }
  ],
  
  aboutImages: {
    mainImageId: "ltlksrbta2n6hhifrvxz",
    missionImageId: "d1lrhz2yy4f6yapdljeq"
  },
  infrastructure: [
    { name: "Heidelberg Offset Printing Machine", category: "Printing", imageId: "rqcrrdjs5tzcse6jqi6g", capacity: "Four color offset Printing", description: "High-speed offset printing for large volume orders" },
    { name: "Digital Printing Machine", category: "Printing", imageId: "ftviprtohwcf02aoharg", capacity: "Digital Printing", description: "For short runs and custom printing requirements" },
    { name: "Box Making Machine", category: "Packaging", imageId: "vhyx5ou4wi6p9s3gjqsi", capacity: "Custom box Production", description: "Automatic box making for all sizes and designs" },
    { name: "Paper Cutting Machine", category: "Cutting", imageId: "gxp7nnda4fhqfn9w2s0j", capacity: "Precision Cutting", description: "Computerized cutting for perfect dimensions" },
    { name: "Lamination Machine", category: "Finishing", imageId: "heooecutjv8uhr3oukvf", capacity: "Glossy/Matte Finishing", description: "High-quality lamination for durability" },
    { name: "punching Machine", category: "Finishing", imageId: "m9pwlarfsjxkbdrtkgkj", capacity: "Punching", description: "Premium finishing for luxury packaging" },
    { name: "Color Matching System", category: "Quality Control", imageId: "onrrtrk3a3rzxqfchw5n", capacity: "Precise color Matching", description: "Ensures brand color consistency" },
    
  ],
    products: [
    // --- PLAIN BOXES (Category: "Boxes") ---
    { name: "NOODLE Box", category: "Boxes", description: "Industrial-strength corrugated boxes for heavy machinery and exports.", imageId: "hujwfmwaiutxjxhiqpej",size: "6*3, 7*3.5",gsm: "280,300,350",qty: "10000,20000,50000,other",paperMode : "Craft, White, Printed" },
    { name: "PIZZA Box", category: "Boxes", description: "Clean, professional white-surfaced boxes ideal for high-end shipping.", imageId: "oev4pu5i2piovi06lym6",size: "8.5*8.5,9*9,12*12",gsm: "280,300,350",qty: "10000,20000,50000,other",paperMode : "Craft, White, Printed" },
    { name: "SANDWICH Box", category: "Boxes", description: "Tape-free assembly boxes, perfect for small electronics and subscriptions.", imageId: "pj0pvrujsjnojhywcupf",size: "7*4, 7.5*5, 8*5",gsm: "280,300,350",qty: "10000,20000,50000,other",paperMode : "Craft, White, Printed" },
    { name: "FRENCH FRIES Box", category: "Boxes", description: "Standard high-volume storage boxes for warehouse and general logistics.", imageId: "lkex0tu25yd2aow8ncid",size: "6*5,5*4,3*5",gsm: "100,120,130",qty: "10000,20000,50000",paperMode : "Butter Paper, Normal Paper" },
    { name: "CAKES Box", category: "Boxes", description: "Corrugated sheets and partitions for product stabilization and safety.", imageId: "psmjigbqgpd34hchiyx9",size: "12*12,14*14,18*18",gsm: "280,300,350",qty: "10000,20000,50000,other",paperMode : "Craft, White, Printed" },
    { name: "PASTRY Box", category: "Boxes", description: "Corrugated sheets and partitions for product stabilization and safety.", imageId: "egsillqjofxbxlpyv7hn",size: "4.5*4.5,5.5*5.5,",gsm: "280,300,350",qty: "10000,20000,50000,other",paperMode : "Craft, White, Printed" },
    { name: "MEAL Box", category: "Boxes", description: "Corrugated sheets and partitions for product stabilization and safety.", imageId: "rmenlliesqu8jz2eiyhh",size: "8*12,8*12.5,9*12",gsm: "280,300,350",qty: "10000,20000,50000,other",paperMode : "Craft, White, Printed" },
    { name: "SWEET Box", category: "Boxes", description: "Corrugated sheets and partitions for product stabilization and safety.", imageId: "ocmldowpdhgbifscqhet",size: "8*8, 9*12, ",gsm: "280,300,350",qty: "10000,20000,50000,other",paperMode : "Craft, White, Printed" },
    

    // --- CUSTOMIZED BOXES (Category: "CUSTOMIZED BOXES") ---
    { name: " CUSTOMIZED DATE BOXES", category: "CUSTOMIZED BOXES", description: "Custom printed boxes with transparent PVC windows for product display.", imageId: "d3xrka9nxpizlxicuddt",size: "6*3, 7*3.5",gsm: "280,300,350",qty: "10000,20000,50000,other",paperMode : "Craft, White, Printed"},
    { name: " CUSTOMIZED PIZZA BOXES", category: "CUSTOMIZED BOXES", description: "Premium hard-case boxes with magnetic closures for corporate gifting.", imageId: "arhexfxmkpmsfph6nocj",size: "6*3, 7*3.5",gsm: "280,300,350",qty: "10000,20000,50000,other",paperMode : "Craft, White, Printed" },
    { name: " CUSTOMIZED BURGER BOXES", category: "CUSTOMIZED BOXES", description: "High-definition graphic printing for superior retail shelf presence.", imageId: "ar7j1gutt99gxbvafjj5",size: "6*3, 7*3.5",gsm: "280,300,350",qty: "10000,20000,50000,other",paperMode : "Craft, White, Printed" },
    { name: " CUSTOMIZED FRENCH FRIES BOXES", category: "CUSTOMIZED BOXES", description: "Heavy-duty branded packaging with integrated handles for easy transport.", imageId: "ig1njnpozsr3dtrs1imj",size: "6*3, 7*3.5",gsm: "280,300,350",qty: "10000,20000,50000,other",paperMode : "Craft, White, Printed" },
    { name: " CUSTOMIZED CAKES BOXES", category: "CUSTOMIZED BOXES", description: "Slim, branded boxes designed for point-of-sale retail counters.", imageId: "lwyabhugvhlljollfxas" ,size: "6*3, 7*3.5",gsm: "280,300,350",qty: "10000,20000,50000,other",paperMode : "Craft, White, Printed"},
    { name: " CUSTOMIZED PASTRY BOXES", category: "CUSTOMIZED BOXES", description: "Slim, branded boxes designed for point-of-sale retail counters.", imageId: "knpa6lx4okbj8io8ghuy",size: "6*3, 7*3.5",gsm: "280,300,350",qty: "10000,20000,50000,other",paperMode : "Craft, White, Printed" },
    { name: " CUSTOMIZED SWEET BOXES", category: "CUSTOMIZED BOXES", description: "Slim, branded boxes designed for point-of-sale retail counters.", imageId: "fm97bcabdsct2ezikara" ,size: "6*3, 7*3.5",gsm: "280,300,350",qty: "10000,20000,50000,other",paperMode : "Craft, White, Printed"},

    // --- PHARMA & COSMETICS (Category: "Monocarton") ---
    { name: "Metallic Foil Stamped Monocartons", category: "Monocarton", description: "Luxury cartons featuring gold or silver foil stamping for cosmetic brands.", imageId: "m2tuddtoblc5dmtsp7dp" }
  ]
};


// ==================== ANIMATION CONFIG (UNCHANGED) ====================
const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.5, ease: "easeInOut" }
};

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// ==================== UTILITY COMPONENTS (CLEANED) ====================

const getCldImage = (publicId, width, height) => {
    if (!publicId) return null;
    return cld.image(publicId).resize(fill().width(width).height(height)).quality(auto()).format(fAuto());
};


const ImageWithShadow = ({ publicId, alt, className = "", shadowColor = "shadow-yellow-500/20" }) => {
    const cldImage = getCldImage(publicId, 600, 400);

    if (!cldImage) return null;

    const imageUrl = cldImage.toURL();

    return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`relative ${className}`}
        >
          {/* Main Image - Now AdvancedImage */}
          <AdvancedImage
            cldImg={cldImage}
            alt={alt}
            className="relative z-10 rounded-2xl shadow-lg w-full h-auto"
            loading="lazy"
          />
          
          {/* Animated Shadow */}
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
            className={`absolute inset-0 rounded-2xl blur-lg ${shadowColor}`}
            style={{ 
              background: `url(${imageUrl}) center/cover no-repeat`,
              transform: 'translateY(20px) scale(1.02)'
            }}
          />
        </motion.div>
    );
};

const SectionHeaderWithImage = ({ title, subtitle, center = true, imageId, imageAlt = "" }) => {
    const cldImage = getCldImage(imageId, 800, 300);
    
    return (
      <div className={`relative ${center ? 'text-center' : 'text-left'} mb-16`}>
        {/* Background Image with Shadow Effect */}
        {cldImage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 0.1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-full max-w-4xl h-64 opacity-10"
          >
            <AdvancedImage 
              cldImg={cldImage}
              alt={imageAlt}
              className="w-full h-full object-cover rounded-2xl blur-sm"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
          </motion.div>
        )}
        
        <div className="relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-4"
          >
            {title}
          </motion.h2>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </div>
    );
};

const AnimatedSection = ({ children, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.6 }}
    className={className}
  >
    {children}
  </motion.div>
);

const SectionHeader = ({ title, subtitle, center = true }) => (
  <div className={`${center ? 'text-center' : 'text-left'} mb-12`}>
    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
      {title}
    </h2>
    {subtitle && (
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        {subtitle}
      </p>
    )}
  </div>
);

// HIGHLIGHT IMPLEMENTED HERE: Add persistent shadow animation to the bar
const ActionButtonsBar = ({ onViewServices, onGetQuote, onCallNow, className = "" }) => (
  <motion.div
    // Apply a continuous pulse/glow effect to the whole button bar
    animate={{ 
        boxShadow: [
            "0 0 10px rgba(245, 158, 11, 0.2)", 
            "0 0 20px rgba(245, 158, 11, 0.4)", 
            "0 0 10px rgba(245, 158, 11, 0.2)"
        ],
        scale: [1, 1.01, 1]
    }}
    transition={{ 
        duration: 3, 
        repeat: Infinity, 
        ease: "easeInOut" 
    }}
    className={`flex flex-wrap gap-4 justify-center rounded-xl p-4 bg-white/10 ${className}`}
  >
    {/* Get Quote Button - NOW MATCHES SERVICES STYLE */}
    <motion.button
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 10px 25px rgba(245, 158, 11, 0.1)"
      }}
      whileTap={{ scale: 0.95 }}
      onClick={onGetQuote}
      className="group relative px-8 py-3 rounded-full overflow-hidden border border-orange-500"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-yellow-500/10"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      
      <div className="relative flex items-center space-x-2">
        <span className="text-orange-500 font-bold">
          Get Quote
        </span>
        <motion.div
          animate={{ x: [0, 5, 0] }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            repeatDelay: 2 
          }}
        >
          <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </motion.div>
      </div>
    </motion.button>

    {/* View Services Button (UNCHANGED) */}
    <motion.button
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 10px 25px rgba(255, 255, 255, 0.1)"
      }}
      whileTap={{ scale: 0.95 }}
      onClick={onViewServices}
      className="group relative px-8 py-3 rounded-full overflow-hidden border border-orange-500"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-yellow-500/10"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      
      <div className="relative flex items-center space-x-2">
        <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
        </svg>
        <span className="text-orange-500 font-bold">
          View Services
        </span>
      </div>
    </motion.button>

    {/* Call Now Button - NOW MATCHES SERVICES STYLE */}
    <motion.button
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 10px 25px rgba(245, 158, 11, 0.1)"
      }}
      whileTap={{ scale: 0.95 }}
      onClick={onCallNow}
      className="group relative px-8 py-3 rounded-full overflow-hidden border border-orange-500"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-yellow-500/10"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative flex items-center space-x-2">
        <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        <span className="text-orange-500 font-bold">Call Now</span>
      </div>
    </motion.button>
  </motion.div>
);
// ==================== HERO SECTION WITH ANIMATED BUTTONS ====================
 const HeroSection = ({ onViewServices, onGetQuote, onCallNow }) => {
  const heroImg = getCldImage(config.logoId, 800, 400);
  
  return (
    <section className="relative h-[100dvh] w-full bg-white flex flex-col items-center justify-between overflow-hidden">
      
      {/* 1. CENTER: The Logo (Auto-scales for Mobile) */}
      <div className="flex-grow flex flex-col items-center justify-center px-6 pt-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          // 'max-w-xs' on mobile makes sure the logo isn't too huge on small screens
          className="w-full max-w-xs md:max-w-2xl flex flex-col items-center"
        >
          {heroImg && (
            <AdvancedImage 
              cldImg={heroImg} 
              alt="Sun Enterprises"
              className="w-full h-auto object-contain" 
            />
          )}
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-4 text-center"
          >
            <p className="text-gray-400 font-bold tracking-[0.15em] text-[10px] md:text-lg uppercase">
              
            </p>
          </motion.div> 
        </motion.div>
      </div>

      {/* 2. BOTTOM: Animated Buttons (Compact for Mobile) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="w-full pb-10 md:pb-16"
      >
        {/* We use scale-90 on mobile to ensure all 3 buttons fit on one line */}
        <div className="transform scale-90 md:scale-100 origin-bottom">
            <ActionButtonsBar
              onViewServices={onViewServices}
              onGetQuote={onGetQuote}
              onCallNow={onCallNow}
            />
        </div>
        
        {/* Scroll Indicator */}
        <div className="mt-6 flex flex-col items-center opacity-20">
           <motion.div 
             animate={{ y: [0, 4, 0] }} 
             transition={{ repeat: Infinity, duration: 2 }} 
             className="w-0.5 h-3 bg-orange-500 rounded-full" 
           />
        </div>
      </motion.div>

    </section>
  );
};
// ==================== PAGES, CAROUSEL, ICONS, FOOTER (UNCHANGED) ====================

const HomePage = ({ setCurrentPage, handleCallNow }) => {
  return (
    <motion.div {...pageTransition}>
      {/* FIXED: Using the new HeroSection name */}
      <HeroSection 
        onViewServices={() => setCurrentPage('services')}
        onGetQuote={() => setCurrentPage('contact')}
        onCallNow={handleCallNow}
      />

      {/* Our Work Carousel */}
      <OurWorkCarousel />

      {/* Why Choose Us Section (UNCHANGED) */}
      {/* Why Choose Us Section (UNCHANGED) */}
<AnimatedSection className="py-20">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <SectionHeader
      title="Why Choose Sun Enterprises?"
      subtitle="We stand out with our commitment to excellence and customer satisfaction"
    />
    
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      {[
        { icon: <ShieldIcon />, title: 'Quality Assurance', description: 'Premium quality materials and rigorous quality checks ensure perfection in every product.' },
        { icon: <ClockIcon />, title: 'Fast Turnaround', description: 'Quick delivery with efficient production processes and reliable logistics.' },
        { icon: <UsersIcon />, title: 'Expert Team', description: 'Skilled professionals with decades of experience in printing and packaging.' },
        { icon: <TruckIcon />, title: 'On-time Delivery', description: 'Timely delivery guaranteed with our efficient supply chain management.' }
      ].map((feature, _index) => (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: _index * 0.1 }}
          className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
        >
          {/* UPDATED COLOURS: from-yellow-400 to-orange-500 CHANGED TO bluish grey gradient */}
          <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-slate-400 to-slate-600 flex items-center justify-center mb-6">
            <div className="text-white">
              {feature.icon}
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            {feature.title}
          </h3>
          <p className="text-gray-600">
            {feature.description}
          </p>
        </motion.div>
      ))}
    </div>
  </div>
</AnimatedSection>

      {/* Contact Info Section (UNCHANGED) */}
      {/* Contact Info Section */}
<AnimatedSection className="py-20 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <SectionHeader
      title="Get In Touch"
      subtitle="Ready to discuss your printing needs? Contact us today."
    />
    
    <div className="grid md:grid-cols-3 gap-8">
      {[
        { icon: <PhoneIcon />, title: 'Call Us', details: ['+91 93204 04204', '+91 93248 44364'], action: 'tel:+91 93204 04204' },
        { icon: <MailIcon />, title: 'Email Us', details: ['sun.enterprises204@gmail.com'], action: 'mailto:sun.enterprises204@gmail.com' },
        { icon: <MapPinIcon />, title: 'Visit Us', details: ['PAP-A13, T.T.C. Industrial Area, Khairane MIDC. Koparkhairane Navi Mumbai -400 710. INDIA.'], action: 'https://maps.google.com/?q=Sun+Enterprises+Navi+Mumbai' }
      ].map((contact, _index) => (
        <motion.a
          key={contact.title}
          href={contact.action}
          target={contact.title === 'Visit Us' ? '_blank' : '_self'}
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: _index * 0.1 }}
          viewport={{ once: true }}
          className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center text-center group"
        >
          {/* UPDATED COLOURS: from-slate-400 to-slate-600 to match your new theme */}
          <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-slate-400 to-slate-600 flex items-center justify-center mb-6">
            <div className="text-white group-hover:scale-110 transition-transform">
              {contact.icon}
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            {contact.title}
          </h3>
          <div className="space-y-1 text-gray-600">
            {contact.details.map((detail, i) => (
              <p key={i}>{detail}</p>
            ))}
          </div>
        </motion.a>
      ))}
    </div>
  </div>
</AnimatedSection>
    </motion.div>
  );
};

// Products Page (CLEANED)
// 1. DEFINE PRODUCT
const ProductCard = ({ product, onEnquire }) => {
  const [isLoading, setIsLoading] = useState(true);
  const imageUrl = product.imageId ? getCldImage(product.imageId, 800, 800) : null;

  return (
    <motion.div 
      variants={fadeInUp}
      className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 flex flex-col hover:shadow-xl transition-shadow duration-300 h-full"
    >
      <div className="h-64 bg-white flex items-center justify-center p-4 relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
            <div className="w-8 h-8 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
          </div>
        )}
        {imageUrl ? (
          <AdvancedImage 
            cldImg={imageUrl} 
            onLoad={() => setIsLoading(false)}
            className="max-w-full max-h-full object-contain transform hover:scale-105 transition-transform duration-500" 
          />
        ) : (
          <div className="text-gray-300 italic">No Image</div>
        )}
      </div>
      
      <div className="p-5 flex flex-col flex-grow text-left">
        <h3 className="font-bold text-lg text-gray-900 mb-2 leading-tight">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-6 line-clamp-2">{product.description}</p>
        
        {/* UPDATED BUTTON */}
        <button 
          onClick={() => onEnquire(product)}
          className="group relative w-full py-3 rounded-xl border-2 border-orange-500 text-orange-600 font-bold overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10 active:scale-95"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="relative">Request price.</span>
        </button>
      </div>
    </motion.div>
  );
};

// 2. DEFINE PRODUCT MODAL SECOND
const ProductModal = ({ product, isOpen, onClose, onConfirmEnquiry }) => {
  // Added 'gsm' to the initial state object
  const [selections, setSelections] = useState({ size: "", qty: "", paperMode: "", gsm: "" });

  if (!isOpen || !product) return null;

  const sizeOptions = product.size ? product.size.split(',').map(s => s.trim()) : [];
  const qtyOptions = product.qty ? product.qty.split(',').map(s => s.trim()) : [];
  const paperOptions = product.paperMode ? product.paperMode.split(',').map(s => s.trim()) : [];
  // Use 'product.gsm' (lowercase) to match your config naming convention
  const gsmOptions = product.gsm ? product.gsm.split(',').map(s => s.trim()) : [];

  // Updated to use selections.gsm instead of product.gsm
  const getFormattedMessage = () => {
    return `Enquiry for ${product.name}\n` +
           `Size: ${selections.size || 'N/A'}\n` +
           `Qty: ${selections.qty || 'N/A'}\n` +
           `Paper: ${selections.paperMode || 'N/A'}\n` +
           `GSM: ${selections.gsm || 'N/A'}`;
  };

  const handleWhatsApp = () => {
    // Check if selections are complete before sending to WhatsApp (optional but recommended)
    if(!selections.size || !selections.qty || !selections.paperMode || !selections.gsm) {
        alert("Please select all options before sending to WhatsApp");
        return;
    }
    const encodedMsg = encodeURIComponent(getFormattedMessage());
    window.open(`https://wa.me/919320404204?text=${encodedMsg}`, '_blank');
  };

  // Reset selections when closing the modal
  const handleClose = () => {
    setSelections({ size: "", qty: "", paperMode: "", gsm: "", phone: "" });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-white rounded-[2.5rem] max-w-5xl w-full overflow-hidden shadow-2xl relative flex flex-col md:flex-row max-h-[95vh] overflow-y-auto">
        
        {/* "Cut" (Close) Button */}
        <button onClick={handleClose} className="absolute top-6 right-8 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:text-orange-500 transition-all">×</button>

        <div className="md:w-5/12 bg-white p-12 flex items-center justify-center">
          <AdvancedImage cldImg={getCldImage(product.imageId, 1200, 1200)} className="max-w-full max-h-[400px] object-contain" />
        </div>

        <div className="md:w-7/12 p-10 text-left bg-white">
          <h2 className="text-4xl font-black text-gray-900 mb-6 uppercase tracking-tighter">{product.name}</h2>
          
          {[
            { label: 'SELECT SIZE', key: 'size', options: sizeOptions },
            { label: 'SELECT QUANTITY', key: 'qty', options: qtyOptions },
            { label: 'MODE OF PAPER', key: 'paperMode', options: paperOptions },
            { label: 'SELECT GSM', key: 'gsm', options: gsmOptions }
          ].map((group) => (
            <div key={group.key} className="mb-6">
              <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">{group.label}</h4>
              <div className="flex flex-wrap gap-2">
                {group.options.map(opt => (
                  <button key={opt} onClick={() => setSelections({...selections, [group.key]: opt})}
                    className={`px-4 py-2 rounded-lg border-2 text-xs font-bold transition-all ${selections[group.key] === opt ? 'border-orange-500 bg-orange-50 text-orange-600' : 'border-gray-100 text-gray-400 hover:border-gray-200'}`}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="flex flex-col gap-3 mt-8">
            <button 
              disabled={!selections.size || !selections.qty || !selections.paperMode || !selections.gsm}
              onClick={() => onConfirmEnquiry({ ...product, ...selections })}
              className={`w-full py-5 rounded-2xl font-black text-sm tracking-widest shadow-lg transition-all ${(!selections.size || !selections.qty || !selections.paperMode || !selections.gsm) ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-[#1a202c] text-white hover:bg-orange-500'}`}
            >
              REQUEST PRICE (Contact Us)
            </button>

            <button 
              onClick={handleWhatsApp}
              className="w-full py-5 rounded-2xl font-black text-sm tracking-widest border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all flex items-center justify-center gap-2"
            >
              <WhatsAppIcon className="w-5 h-5" />
              SEND TO WHATSAPP
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const ProductsPage = ({ setCurrentPage }) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Modal State
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sectionRefs = {
    plain: useRef(null),
    custom: useRef(null),
    pharma: useRef(null)
  };

  const categories = [
    { id: 'plain', title: 'Plain Boxes', filter: 'Boxes', ref: sectionRefs.plain },
    { id: 'custom', title: 'Customized Boxes', filter: 'CUSTOMIZED BOXES', ref: sectionRefs.custom },
    { id: 'pharma', title: 'Cosmetics & Pharmaceuticals Monocarton', filter: 'Monocarton', ref: sectionRefs.pharma }
  ];

  // STEP 1: Open the details modal
  const handleEnquireClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // STEP 2: Move to contact page with pre-filled details
const handleConfirmEnquiry = (data) => {
  const autofillMessage = `Hello Sun Enterprises Team,\n\nI am requesting a price quote for the following product:\n\n` +
    `PRODUCT: ${data.name}\n` +
    `SIZE: ${data.size}\n` +
    `QUANTITY: ${data.qty}\n` +
    `PAPER TYPE: ${data.paperMode}\n` +
    `GSM: ${data.gsm}\n\n` +
    `Please get back to me with the best possible pricing.`;

  setCurrentPage('contact', { 
    subject: `Price Quote Request: ${data.name}`,
    message: autofillMessage 
  });
  setIsModalOpen(false);
};

  return (
    <motion.div {...pageTransition} className="pt-24 pb-20 bg-gray-50 min-h-screen">
      
      {/* Sticky Filter & Search Bar */}
      <div className="sticky top-20 z-30 bg-white/90 backdrop-blur-md border-b border-gray-200 py-4 mb-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-6">
          
          {/* Search Input Field */}
          <div className="relative w-full max-w-md">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all bg-white text-gray-800 shadow-inner"
            />
          </div>

          {/* Category Quick-Links */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => cat.ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="px-5 py-2 rounded-full text-xs font-bold border border-orange-200 text-orange-600 bg-orange-50 hover:bg-orange-500 hover:text-white transition-all"
              >
                {cat.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {categories.map((cat) => {
          // Filter products based on Category AND Search Query
          const filteredProducts = config.products.filter(p => 
            p.category === cat.filter && 
            p.name.toLowerCase().includes(searchQuery.toLowerCase())
          );

          // Only show the category section if it has products matching the search
          if (filteredProducts.length === 0 && searchQuery !== "") return null;

          return (
            <div key={cat.id} ref={cat.ref} className="mb-20 scroll-mt-40 text-left">
              <div className="flex items-center mb-8">
                <h2 className="text-2xl font-black text-gray-900 mr-4">{cat.title}</h2>
                <div className="flex-grow h-px bg-gray-200" />
              </div>

              <motion.div 
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredProducts.map((product, index) => (
                  <ProductCard 
                    key={index} 
                    product={product} 
                    onEnquire={handleEnquireClick} 
                  />
                ))}
              </motion.div>
            </div>
          );
        })}

        {/* No Results Message */}
        {searchQuery !== "" && !categories.some(cat => 
          config.products.some(p => p.category === cat.filter && p.name.toLowerCase().includes(searchQuery.toLowerCase()))
        ) && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl font-medium">No products found matching "{searchQuery}"</p>
            <button 
              onClick={() => setSearchQuery("")}
              className="mt-4 text-orange-500 font-bold underline"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>

      {/* The Popup Modal */}
      <ProductModal 
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirmEnquiry={handleConfirmEnquiry}
      />
    </motion.div>
  );
};
// Services Page (UNCHANGED)
const ServicesPage = () => (
  <motion.div {...pageTransition} className="pt-20 pb-20 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeaderWithImage
        title="Our Core Services"
        subtitle="From custom food packaging to high-quality commercial printing, we cover all your brand needs."
        imageId={config.services.length > 0 ? config.services[0].imageId : null}
        imageAlt="Printing Services"
      />

      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        className="grid lg:grid-cols-2 gap-12"
      >
        {config.services.map((service, _index) => (
          <motion.div
            key={service.title}
            variants={fadeInUp}
            className="bg-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-start space-x-6 hover:shadow-2xl transition-shadow"
          >
            <div className="flex-shrink-0">
              <div className="text-5xl">{service.icon}</div>
            </div>
            <div className="flex-grow mt-4 md:mt-0">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                {service.features.map((feature, i) => (
                  <span key={i} className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <span>{feature}</span>
                  </span>
                ))}
              </div>
            </div>
            {/* ImageWithShadow updated to use imageId */}
            <div className="w-full md:w-40 h-32 mt-6 md:mt-0 flex-shrink-0">
              <ImageWithShadow 
                publicId={service.imageId}
                alt={service.title}
                className="w-full h-full"
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </motion.div>
);

// Infrastructure Page (UNCHANGED)
const InfrastructurePage = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', ...new Set(config.infrastructure.map(i => i.category))];

  const filteredInfrastructure = config.infrastructure.filter(i => 
    filter === 'All' || i.category === filter
  );

  return (
    <motion.div {...pageTransition} className="pt-20 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Our Cutting-Edge Infrastructure"
          subtitle="A peek into the state-of-the-art machinery and facilities that power our premium production."
        />

        {/* Updated Filter Tabs - Matching the new button style */}
        <div className="flex justify-center flex-wrap gap-3 mb-12">
          {categories.map(cat => (
            <motion.button
              key={cat}
              onClick={() => setFilter(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 border-2 overflow-hidden ${
                filter === cat
                  ? 'border-orange-500 text-orange-600 shadow-lg shadow-orange-500/20'
                  : 'border-gray-200 text-gray-500 hover:border-orange-300 hover:text-orange-500'
              }`}
            >
              {/* Subtle background glow for the active tab */}
              {filter === cat && (
                <motion.div 
                  layoutId="activeTabGlow"
                  className="absolute inset-0 bg-orange-500/5 z-0" 
                />
              )}
              <span className="relative z-10">{cat}</span>
            </motion.button>
          ))}
        </div>

        {/* Infrastructure Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.1 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredInfrastructure.map((machine) => (
              <motion.div
                key={machine.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col h-full"
              >
                {/* Updated Image Component Style */}
                <ImageWithShadow 
                  publicId={machine.imageId} 
                  alt={machine.name}
                  className="mb-8 h-48 w-full object-cover rounded-2xl shrink-0"
                  shadowColor="shadow-orange-500/10" // Softened shadow
                />

                <div className="flex flex-col flex-grow">
                  <h3 className="text-2xl font-black text-gray-900 mb-2 leading-tight break-words">
                    {machine.name}
                  </h3>
                  <p className="text-base text-orange-600 font-bold mb-4 uppercase tracking-wider">
                    {machine.category}
                  </p>
                  <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                    {machine.description}
                  </p>
                </div>

                <div className="mt-auto border-t-2 border-gray-50 pt-6 pb-2">
                  <div className="flex justify-between items-end gap-4">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">
                        Production
                      </span>
                    </div>
                    <span className="text-2xl font-black text-orange-600 text-right leading-none">
                      {machine.capacity}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {filteredInfrastructure.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-500 text-xl mt-10"
          >
            No infrastructure found for the selected category.
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

// About Page (UNCHANGED)
const AboutPage = () => (
  <motion.div {...pageTransition} className="pt-20 pb-20 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeaderWithImage
        title="About Sun Enterprises"
        subtitle="Driven by innovation and commitment to quality, we've been serving the industry since 1994."
        imageId={config.aboutImages.mainImageId}
      />
      
      {/* Introduction */}
      <AnimatedSection className="grid lg:grid-cols-2 gap-12 items-center mb-20">
        <div className="order-2 lg:order-1">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Our History and Vision</h3>
          <p className="text-lg text-gray-600 mb-4">
            Established in 1994, Sun Enterprises has grown from a local print shop into a leading national provider of end-to-end printing and packaging solutions. Our vision is to be the most trusted name in the industry, known for our precision, speed, and environmental responsibility.
          </p>
          <p className="text-lg text-gray-600">
            We continuously invest in the latest technology to ensure every product, from a custom food box to a commercial brochure, exceeds client expectations.
          </p>
        </div>
        {/* ImageWithShadow updated to use imageId */}
        <div className="order-1 lg:order-2">
          <ImageWithShadow 
            publicId={config.aboutImages.mainImageId} 
            alt="Our Factory"
            shadowColor="shadow-orange-500/20"
          />
        </div>
      </AnimatedSection>

      {/* Mission & Values */}
      <AnimatedSection className="grid lg:grid-cols-2 gap-12 items-center mb-20">
        {/* ImageWithShadow updated to use imageId */}
        <div>
          <ImageWithShadow 
            publicId={config.aboutImages.missionImageId} 
            alt="Our Mission"
            shadowColor="shadow-yellow-500/20"
          />
        </div>
        <div>
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h3>
          <ul className="space-y-4 text-lg text-gray-600">
            <li className="flex items-start">
              <span className="text-orange-500 text-2xl mr-3">✓</span>
              <div>
                <strong className="text-gray-900">Excellence:</strong> We strive for perfection in every print and package.
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 text-2xl mr-3">✓</span>
              <div>
                <strong className="text-gray-900">Innovation:</strong> Adopting new technologies for sustainable and superior output.
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 text-2xl mr-3">✓</span>
              <div>
                <strong className="text-gray-900">Integrity:</strong> Operating with transparency and honesty in all dealings.
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 text-2xl mr-3">✓</span>
              <div>
                <strong className="text-gray-900">Customer Focus:</strong> Prioritizing our clients' needs and brand vision.
              </div>
            </li>
          </ul>
        </div>
      </AnimatedSection>
    </div>
  </motion.div>
);

// Contact Page (UNCHANGED)
const ContactPage = ({ initialData }) => {
  // 1. Create State for the form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '', // Added phone to state to match your input
    subject: '',
    message: ''
  });

  // 2. Effect to catch the data when the page loads
  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({
        ...prev,
        subject: initialData.subject || '',
        message: initialData.message || ''
      }));
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <motion.div {...pageTransition} className="pt-20 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Contact Us"
          subtitle="We're ready to help you with your next printing or packaging project."
        />
        
        <div className="grid lg:grid-cols-3 gap-12">
          <AnimatedSection className="lg:col-span-2 p-8 bg-gray-50 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h3>
            
            {/* Formspree Form */}
            <form action="https://formspree.io/f/mwpggbbq" method="POST" className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required 
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-orange-500 focus:border-orange-500" 
                  placeholder="Your Name" 
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required 
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-orange-500 focus:border-orange-500" 
                  placeholder="your.email@example.com" 
                />
              </div>

              <div>
                <label htmlFor="Phone" className="block text-sm font-medium text-gray-700">Phone</label>
                <input 
                  type="text" 
                  id="Phone" 
                  name="phone" 
                  required 
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-orange-500 focus:border-orange-500" 
                  placeholder="+91 93248 44364" 
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  required 
                  value={formData.subject}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-orange-500 focus:border-orange-500" 
                  placeholder="Project Inquiry" 
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="6" 
                  required 
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-orange-500 focus:border-orange-500" 
                  placeholder="Describe your requirements..."
                ></textarea>
              </div>

              {/* UPDATED BUTTON: Styled to match your new transparent theme */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="group relative w-full py-3 px-4 rounded-xl border-2 border-orange-500 text-orange-600 font-bold overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative">Send Message</span>
              </motion.button>
            </form>
          </AnimatedSection>
          
          <AnimatedSection className="lg:col-span-1 space-y-8">
            {[
              { icon: <MapPinIcon />, title: 'Our Location', detail: 'PAP-A13, T.T.C. Industrial Area, Khairane MIDC. Koparkhairane Navi Mumbai -400 710. INDIA.' },
              { icon: <MailIcon />, title: 'Email Us', detail: 'sun.enterprises204@gmail.com' },
              { icon: <PhoneIcon />, title: 'Call Us', detail: '+91 93248 44364,+91 93204 04204' },
            ].map((item, _index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: _index * 0.1 }}
                className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{item.title}</p>
                  <p className="text-gray-600 text-sm leading-tight">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </AnimatedSection>
        </div>
      </div>
    </motion.div>
  );
};

// ==================== OUR WORK CAROUSEL (CRITICAL FIX APPLIED) ====================
const OurWorkCarousel = () => {
  const scrollRef = useRef(null);
  const animationRef = useRef(null);
  const scrollSpeed = 0.5; 

  // CRITICAL FIX: Define animateScroll with useCallback *before* useEffect
  const animateScroll = useCallback(() => {
    if (scrollRef.current) {
      const { scrollWidth, scrollLeft } = scrollRef.current;
      
      // Reset point is halfway through the doubled list
      if (scrollLeft >= scrollWidth / 2 - 1) { 
        scrollRef.current.scrollLeft = 0; 
      } else {
        scrollRef.current.scrollLeft += scrollSpeed;
      }
    }
    animationRef.current = requestAnimationFrame(animateScroll);
  }, []);

  useEffect(() => {
    // CRITICAL FIX: Now animateScroll is properly referenced
    animationRef.current = requestAnimationFrame(animateScroll);
    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [animateScroll]);

  const manualScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300; 
      const newScroll = direction === 'left' 
        ? scrollRef.current.scrollLeft - scrollAmount 
        : scrollRef.current.scrollLeft + scrollAmount;
      
      scrollRef.current.scrollTo({
        left: newScroll,
        behavior: 'smooth'
      });
    }
  };

  const handleInteraction = (action) => {
    if (action === 'pause') {
      cancelAnimationFrame(animationRef.current);
    } else {
      animationRef.current = requestAnimationFrame(animateScroll);
    }
  };

  // Duplicate the array for seamless infinite loop effect
  const carouselItems = [...config.ourWork, ...config.ourWork];

  return (
    <AnimatedSection className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Our Work Portfolio"
          subtitle="A glimpse into the diverse projects and premium quality we deliver."
        />

        <div className="relative"
             onMouseEnter={() => handleInteraction('pause')}
             onMouseLeave={() => handleInteraction('resume')}
             onTouchStart={() => handleInteraction('pause')}
             onTouchEnd={() => handleInteraction('resume')}
        >
          {/* Scroll Buttons (UNCHANGED) */}
          <motion.button
            onClick={() => manualScroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white p-3 rounded-full shadow-lg opacity-70 hover:opacity-100 transition-opacity hidden lg:block"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </motion.button>
          <motion.button
            onClick={() => manualScroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white p-3 rounded-full shadow-lg opacity-70 hover:opacity-100 transition-opacity hidden lg:block"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </motion.button>

          {/* Carousel Track - Updated to use AdvancedImage */}
          <div
            ref={scrollRef}
            className="flex space-x-6 overflow-x-scroll pb-4 scrollbar-hide will-change-scroll"
            style={{ WebkitOverflowScrolling: 'touch' }} 
          >
            {carouselItems.map((publicId, _index) => {
                const cldImage = getCldImage(publicId, 320, 256);

                return (
                  <motion.div
                    key={_index}
                    className="flex-shrink-0 w-80 h-64 rounded-2xl overflow-hidden shadow-xl"
                  >
                    <AdvancedImage
                      cldImg={cldImage}
                      alt={`Project ${_index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </motion.div>
                );
            })}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

// ==================== ICONS (UNCHANGED) ====================
// ... (All icon definitions remain here) ...
const ShieldIcon = () => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.382a12.008 12.008 0 010 16.764l-1.378-1.378M12 3c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10z" /></svg>
);
const ClockIcon = () => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);
const UsersIcon = () => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h-4v-2c0-2.209-1.791-4-4-4H7c-2.209 0-4 1.791-4 4v2H1M21 20h-4v-2c0-2.209-1.791-4-4-4h-2c-2.209 0-4 1.791-4 4v2H21M12 11a4 4 0 100-8 4 4 0 000 8zM17 11a4 4 0 100-8 4 4 0 000 8z" /></svg>
);
const TruckIcon = () => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-4m-2 4h4m6 0h2m-2-4h2v-6c0-1.1-.9-2-2-2h-8c-1.1 0-2 .9-2 2v6h2" /></svg>
);
const PhoneIcon = () => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
);
const MailIcon = () => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-17 10h18a2 2 0 002-2V8a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
);
const MapPinIcon = () => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243m10.606 0a7 7 0 10-10.606 0m10.606 0H12a2 2 0 01-2-2V8m5 4a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
);
const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
  </svg>
);
const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);
const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a2.7 2.7 0 0 0-2.7-2.7c-1.2 0-2 .7-2.3 1.2v-1.1h-2.6v7.9h2.7v-4.3a1.4 1.4 0 0 1 1.4-1.5 1.4 1.4 0 0 1 1.5 1.5v4.3h2.6M7.8 8.5a1.5 1.5 0 1 0-1.5-1.5 1.5 1.5 0 0 0 1.5 1.5m1.3 10V10.5H6.5v8h2.6z"/>
  </svg>
);
const WhatsAppIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.067 2.877 1.215 3.076.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.408 0 12.044c0 2.121.554 4.189 1.602 6.006L0 24l6.117-1.605a11.803 11.803 0 005.925 1.586h.005c6.635 0 12.046-5.411 12.05-12.047 0-3.214-1.25-6.233-3.522-8.508z"/>
  </svg>
);


const ModernFooter = ({ setCurrentPage }) => {
  // Fetch logo for footer
  const footerLogo = getCldImage(config.logoId, 400, 150);

  const socialLinks = [
    { id: 'facebook', icon: FacebookIcon, link: config.socialLinks.facebook, color: 'hover:text-[#1877F2]' },
    { id: 'instagram', icon: InstagramIcon, link: config.socialLinks.instagram, color: 'hover:text-[#E4405F]' },
    { id: 'linkedin', icon: LinkedinIcon, link: config.socialLinks.linkedin, color: 'hover:text-[#0A66C2]' },
    { id: 'whatsapp', icon: WhatsAppIcon, link: config.socialLinks.whatsapp, color: 'hover:text-[#25D366]' },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      /* CHANGED: Background to light grey (bg-gray-100) and text to dark (text-gray-900) */
      className="bg-gray-100 text-gray-900 py-12 border-t border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-5 gap-8 border-b border-gray-300 pb-8 mb-8">
          
          <div className="md:col-span-2 text-left">
            {/* LOGO: Now stands out naturally on the light background without a container */}
            <div className="mb-6 h-16 flex items-center justify-start">
              {footerLogo ? (
                <AdvancedImage 
                  cldImg={footerLogo} 
                  alt="Sun Enterprises Logo"
                  className="h-full w-auto object-contain" 
                />
              ) : (
                <h4 className="text-xl font-bold text-orange-500">Sun Enterprises</h4>
              )}
            </div>
            
            <p className="text-gray-600 text-sm mb-6 pr-4 leading-relaxed">
              Your trusted partner for premium printing and packaging solutions since 1997. Quality, speed, and innovation delivered.
            </p>

            {/* Social Icons updated for light background */}
            <div className="flex space-x-4">
              {socialLinks.map(({ id, icon: IconComponent, link, color }) => (
                <motion.a
                  key={id}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  className={`w-10 h-10 flex items-center justify-center rounded-full bg-white text-gray-500 shadow-sm border border-gray-200 ${color} transition-all duration-300`}
                >
                  <IconComponent className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
          
          <div className="text-left">
            <h4 className="text-sm font-bold mb-4 text-gray-900 uppercase tracking-widest">Quick Links</h4>
            <ul className="space-y-2">
              {['home', 'services', 'products', 'infrastructure', 'about', 'contact'].map(id => (
                <li key={id}>
                  <button
                    onClick={() => setCurrentPage(id)}
                    className="text-gray-600 hover:text-orange-500 transition-colors text-sm capitalize"
                  >
                    {id}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-left">
            <h4 className="text-sm font-bold mb-4 text-gray-900 uppercase tracking-widest">Our Expertise</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              {config.services.slice(0, 4).map(service => (
                <li key={service.title} className="hover:text-orange-500 transition-colors">
                  {service.title}
                </li>
              ))}
            </ul>
          </div>

          <div className="text-left">
            <h4 className="text-sm font-bold mb-4 text-gray-900 uppercase tracking-widest">Reach Us</h4>
            <p className="text-gray-600 mb-2 text-sm">PAP-A13, T.T.C. Industrial Area, Navi Mumbai - 710.</p>
            <p className="text-gray-600 mb-2 text-sm font-medium">sun.enterprises204@gmail.com</p>
            <p className="text-gray-900 text-sm font-bold">+91 93204 04204</p>
          </div>
        </div>

        <div className="text-center text-xs text-gray-500 pt-8">
          © {new Date().getFullYear()} Sun Enterprises. All rights reserved | Designed with ❤️ 
        </div>
      </div>
    </motion.footer>
  );
};

const FloatingWhatsAppButton = () => (
  <motion.a
    href={config.socialLinks.whatsapp} 
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 p-4 bg-[#25D366] text-white rounded-full shadow-2xl hover:bg-[#20ba5a] transition-all"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ type: "spring", stiffness: 200, delay: 1 }}
  >
    <WhatsAppIcon className="w-8 h-8" />
    <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></span>
  </motion.a>
);


// ==================== MAIN APP (UNCHANGED) ====================
const SunEnterprises = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [pageData, setPageData] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'products', label: 'Products' }, 
    { id: 'infrastructure', label: 'Infrastructure' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleCallNow = () => {
    window.open('tel:+919324844364.');
  };

  const handleNavigate = (page, data = null) => {
    setPageData(data); 
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };
  
  const renderPage = () => {
    switch(currentPage) {
      case 'services': return <ServicesPage />;
      case 'products': return <ProductsPage setCurrentPage={handleNavigate} />; 
      case 'infrastructure': return <InfrastructurePage />;
      case 'about': return <AboutPage />;
      case 'contact': return <ContactPage initialData={pageData} />; 
      default: return <HomePage setCurrentPage={setCurrentPage} handleCallNow={handleCallNow} />;
    }
  };

  const cldLogo = getCldImage(config.logoId, 160, 64);
  const placeholderLogoUrl = "kaim56lfzku0sjhalsxi";

  return (
    <div className="min-h-screen bg-white">
      {/* Updated Sticky Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/90 backdrop-blur-lg shadow-sm border-b border-gray-100' 
            : 'bg-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo Section */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setCurrentPage('home')}
              className="flex items-center"
            >
              <div className="w-40 h-16 flex items-center justify-center overflow-hidden">
                {cldLogo ? (
                  <AdvancedImage 
                    cldImg={cldLogo} 
                    alt="Sun Enterprises Logo"
                    className="h-full w-auto object-contain"
                  />
                ) : (
                  <img src={placeholderLogoUrl} alt="Sun Enterprises Logo" className="h-full w-auto object-contain" />
                )}
              </div>
            </motion.button>

            {/* Desktop Navigation - UPDATED COLOURS */}
            <div className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentPage(item.id)}
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-all relative ${
                    currentPage === item.id
                      ? 'border-2 border-orange-500 text-orange-600 shadow-md shadow-orange-500/10'
                      : 'text-gray-600 hover:text-orange-500 hover:bg-orange-50/50'
                  }`}
                >
                  {item.label}
                  {currentPage === item.id && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-orange-500/5 rounded-full -z-10"
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-xl border-2 transition-all ${
                  isMenuOpen ? 'border-orange-500 text-orange-600' : 'border-gray-100 text-gray-500'
                }`}
              >
                {isMenuOpen ? (
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                ) : (
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu - UPDATED COLOURS */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden bg-white border-t border-gray-100 shadow-xl"
            >
              <div className="px-4 py-6 space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentPage(item.id);
                      setIsMenuOpen(false);
                    }}
                    className={`block w-full text-left px-6 py-4 rounded-2xl text-base font-bold transition-all ${
                      currentPage === item.id
                        ? 'border-2 border-orange-500 text-orange-600 bg-orange-50/30'
                        : 'text-gray-600 border-2 border-transparent'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <main className="pt-0">
        <AnimatePresence mode="wait">
          {renderPage()}
        </AnimatePresence>
      </main>

      <ModernFooter setCurrentPage={setCurrentPage} />
      <FloatingWhatsAppButton />
    </div>
  );
};

export default SunEnterprises;