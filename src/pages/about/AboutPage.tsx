import { useEffect, useRef } from "react";
import DescribeUs from "../../components/about-us/DescribeUs";
import OurProducts from "../../components/about-us/OurProducts";
import Header from "../../components/shared/header/Header";

export default function AboutPage() {
  const products = useRef<HTMLDivElement>(null);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToOurProducts = () => {
    products.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <Header />

      <DescribeUs learnMoreBtn={scrollToOurProducts} />

      <div ref={products}>
        <OurProducts />
      </div>
    </div>
  );
}
