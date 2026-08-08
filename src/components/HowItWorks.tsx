import React from 'react';
import { Compass, Code, Upload } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      stepNumber: '1',
      icon: Compass,
      title: 'Pick a Track',
      description: 'Choose what you want to build',
    },
    {
      stepNumber: '2',
      icon: Code,
      title: 'Build Every Day',
      description: 'Complete a small project daily',
    },
    {
      stepNumber: '3',
      icon: Upload,
      title: 'Share & Grow',
      description: 'Submit 2 proofs and grow in public',
    },
  ];

  return (
    <section id="how-it-works" className="max-w-[1180px] mx-auto px-4 sm:px-6 my-10 md:my-14 scroll-mt-20">
      <div className="bg-neutral-50/90 border border-neutral-200/90 rounded-2xl p-8 sm:p-12 text-center">
        {/* Header */}
        <div className="mb-10 sm:mb-14">
          <span className="text-[11px] font-bold tracking-widest text-neutral-500 uppercase">
            HOW IT WORKS
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black tracking-tight mt-1.5">
            Simple. Daily. Impactful.
          </h2>
        </div>

        {/* Steps Grid with Connectors */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 items-start max-w-4xl mx-auto">
          {/* Connector line for desktop */}
          <div className="hidden md:block absolute top-[28px] left-[15%] right-[15%] h-[1px] border-t border-dashed border-neutral-300 -z-0" />

          {steps.map((step, idx) => {
            const IconComponent = step.icon;
            return (
              <div key={idx} className="relative z-10 flex flex-col items-center group">
                {/* Number Badge & Icon Box Container */}
                <div className="relative mb-5">
                  {/* Icon Card Box */}
                  <div className="w-14 h-14 rounded-2xl bg-white border border-neutral-200 shadow-2xs flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-black stroke-[1.75]" />
                  </div>

                  {/* Circular Step Number Badge */}
                  <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-black text-white text-xs font-bold flex items-center justify-center shadow-xs">
                    {step.stepNumber}
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-extrabold text-base md:text-lg text-black tracking-tight mb-1">
                  {step.title}
                </h3>
                <p className="text-xs md:text-sm text-neutral-500 max-w-[200px] leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
