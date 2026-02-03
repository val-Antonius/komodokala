
import { HeroSection } from '@/sections/HeroSection';
import { FeaturedPackages } from '@/sections/FeaturedPackages';
import { Destinations } from '@/sections/Destinations';
import { PackageTypes } from '@/sections/PackageTypes';
import { BookingProcess } from '@/sections/BookingProcess';
import { WhyChooseUs } from '@/sections/WhyChooseUs';
import { Testimonials } from '@/sections/Testimonials';
import { TrustIndicators } from '@/sections/TrustIndicators';
import { FAQ } from '@/sections/FAQ';
import { Newsletter } from '@/sections/Newsletter';

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedPackages />
      <Destinations />
      <PackageTypes />
      <BookingProcess />
      <WhyChooseUs />
      <Testimonials />
      <TrustIndicators />
      <FAQ />
      <Newsletter />
    </>
  );
}
