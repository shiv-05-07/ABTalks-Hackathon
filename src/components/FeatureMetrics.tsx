import React from 'react';
import { Calendar, Code, Upload, Users } from 'lucide-react';

export const FeatureMetrics: React.FC = () => {
  const metrics = [
    {
      icon: Calendar,
      title: '60 Days',
      subtitle: 'of consistency',
    },
    {
      icon: Code,
      title: 'Build Daily',
      subtitle: 'something real',
    },
    {
      icon: Upload,
      title: '2 Proofs',
      subtitle: 'GitHub + LinkedIn',
    },
    {
      icon: Users,
      title: 'Get Noticed',
      subtitle: 'by recruiters',
    },
  ];

  return (
    <section className="max-w-[1180px] mx-auto px-4 sm:px-6 my-6 md:my-12">
      <div className="bg-white border border-neutral-200 rounded-2xl p-4 sm:p-6 md:p-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-2 sm:gap-6 md:gap-0 md:divide-x divide-neutral-200/80">
          {metrics.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center text-center px-2 sm:px-3 py-1 sm:py-2"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center justify-center mb-2.5 sm:mb-3 shrink-0">
                  <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-black stroke-[1.75]" />
                </div>
                <h3 className="font-extrabold text-sm sm:text-base md:text-lg text-black tracking-tight">
                  {item.title}
                </h3>
                <p className="text-[11px] sm:text-xs md:text-sm text-neutral-500 font-normal mt-0.5 leading-tight">
                  {item.subtitle}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
