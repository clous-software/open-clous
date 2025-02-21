
import React from "react";
import FeatureCard from "../../ui/FeatureCard";
import NormalButton from "../../ui/NormalButton";

function SectionFourty() {
  return (
    <main className="lg:py-16 lg:mt-32 py-8 px-8 lg:px-24">
      <section className=" gap-24">
        <div className={` lg:gap-12 transition-opacity duration-500 section-transition text-center w-full max-w-5xl mx-auto`}>
            <h2 className="text-3xl lg:text-6xl">We acknowledge bias, but push forward to solve it</h2>
              <p className="text-base font-normal mt-2 mb-6">
                Bias inherently exists in AI models, so we're super dedicated to finding ways to minimize it in our algorithms. It&apos;s a constant journey towards fairness and equality.
              </p>
          <a className="text-primary text-lg text-semibold line-under underline">Read our research</a>
        </div>
      </section>
    </main>
  );
}

export default SectionFourty;
