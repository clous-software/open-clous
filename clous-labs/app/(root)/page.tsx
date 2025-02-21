"use client";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import React from 'react';
import { IoLogoInstagram, IoLogoYoutube, IoLogoTiktok } from 'react-icons/io5';
import Footer from "@/components/navigation/Footer";
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Import predefined component
import InfiniteLogoCarousel from "@/components/ui/infiniteloop";

// Data for pricing section
const pricingOptions = [
  { price: '$50', title: 'Basic Plan', description: 'Access to all basic features' },
  { price: '$100', title: 'Pro Plan', description: 'Extended access to premium features' },
  { price: '$150', title: 'VIP Plan', description: 'Exclusive membership with full benefits' },
  // Add other items here...
];

// Data for cards in the carousel
const cards = Array.from({ length: 20 }, (_, i) => ({
  number: i + 1,
  title: `Card Title ${i + 1}`,
  subtitle: `Card Subtitle ${i + 1}`,
  image: '/path-to-image.jpg', // replace with actual image paths
}));

const roadmapData = [
  {
    year: '1968-69',
    title: 'La historia de nuestro escudo',
    description:
      'La historia de nuestro escudo La historia de nuestro escudo La historia de nuestro escudo a historia de nuestro escudo',
    imageUrl: 'https://your-image-url-here', // Replace with your image
  },
  // Add more items here
];

const carouselData = [
  { number: 1, title: "Card 1", subtitle: "Subtitle 1", imageUrl: "/path/to/image1.jpg" },
  { number: 2, title: "Card 2", subtitle: "Subtitle 2", imageUrl: "/path/to/image2.jpg" },
  // ... Repeat for all 20 items
];


const Home = () => {
  return (
    <>
      <Head>
        <title>Football Club</title>
        <meta name="description" content="Join our football club today!" />
      </Head>

      {/* Navbar */}
      <nav className="fixed top-0 w-full flex justify-between p-4 bg-transparent">
        <div className="flex space-x-4">
          <Link href="https://instagram.com"><IoLogoInstagram size={24} /></Link>
          <Link href="https://youtube.com"><IoLogoYoutube size={24} /></Link>
          <Link href="https://tiktok.com"><IoLogoTiktok size={24} /></Link>
        </div>
        <div className="space-x-4">
          <a href="#section1" className="hover:text-gray-700">About</a>
          <a href="#section2" className="hover:text-gray-700">Pricing</a>
          <a href="#section3" className="hover:text-gray-700">Join</a>
          <a href="#section4" className="hover:text-gray-700">Roadmap</a>
        </div>
      </nav>

      {/* Hero Section with background image */}
      <section id="section1" className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('/path-to-background-image.jpg')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div> {/* Overlay for contrast */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
          <h1 className="text-4xl font-bold">Welcome to Our Football Club</h1>
          <p className="mt-4">Join us for an amazing experience!</p>
          <Button className="mt-6">Get Started</Button>
        </div>
      </section>

      {/* Predefined Component Section */}
      <section id="section2" className="min-h-screen flex items-center justify-center">
        <InfiniteLogoCarousel />
      </section>

      {/* Pricing Section */}
      <section id="section3" className="flex flex-col lg:flex-row items-center p-12 bg-white">
        <div className="lg:w-1/2 text-center lg:text-left">
          <h2 className="text-3xl font-bold">Join Our Club</h2>
          <Button className="mt-4">Sign Up Now</Button>
        </div>
        <div className="lg:w-1/2 flex flex-col items-center">
          {pricingOptions.map((option, index) => (
            <div key={index} className="mt-4 p-4 bg-gray-100 rounded-md w-full text-center">
              <h3 className="text-xl font-semibold">{option.title}</h3>
              <p>{option.description}</p>
              <p className="text-2xl font-bold">{option.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA and Image Section */}
      <section id="section4" className="flex flex-col-reverse lg:flex-row items-center p-12 bg-gray-50">
        <div className="lg:w-1/2">
          <h2 className="text-3xl font-bold">Get Involved</h2>
          <p className="mt-2">We welcome everyone to be a part of this incredible journey.</p>
          <Button className="mt-4">Join Now</Button>
        </div>
        <div className="lg:w-1/2">
          <Image src="/path-to-image.jpg" alt="Join Us" width={600} height={400} />
        </div>
      </section>

      {/* Carousel Section */}
      <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-4xl" // Adjust the size of the carousel
    >
      <CarouselContent>
        {carouselData.map((item, index) => (
          <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/3 p-2">
            <div className="p-1">
              <Card className="h-full">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-32 object-cover rounded-md mb-4"
                  />
                  <span className="text-3xl font-semibold mb-2">{item.number}</span>
                  <span className="text-xl font-bold mb-1">{item.title}</span>
                  <span className="text-sm text-gray-500">{item.subtitle}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>

      {/* Roadmap Section */}
      <section className="relative roadmap-container mx-auto my-12">
      <h2 className="text-center text-4xl font-bold mb-8">La historia del nostre escut</h2>
      <div className="roadmap relative w-full mx-auto">
        {roadmapData.map((item, index) => (
            <div className="roadmap-item flex flex-col md:flex-row items-center mb-12">
            <div className="roadmap-image-container md:w-1/2 flex justify-center md:justify-end">
              <img src={item.imageUrl} alt={item.title} className="w-64 h-auto rounded-lg shadow-lg" />
            </div>
            <div className="roadmap-content md:w-1/2 flex flex-col items-start md:items-start pl-8 md:pl-12">
              <div className="roadmap-year text-lg font-bold">{item.year}</div>
              <div className="roadmap-title text-xl font-semibold mt-2">{item.title}</div>
              <p className="roadmap-description mt-2 text-gray-600">{item.description}</p>
            </div>
            <div className="roadmap-line hidden md:block w-1 bg-gray-300 h-full absolute left-1/2"></div>
          </div>
        ))}
      </div>
    </section>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Home;
