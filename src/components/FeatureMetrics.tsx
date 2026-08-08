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
    <section className="max-w-[1180px] mx-auto px-4 sm:px-6 my-8 md:my-12">
      <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x divide-neutral-200/80">
          {metrics.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center text-center px-3 py-2"
              >
                <div className="w-10 h-10 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center justify-center mb-3">
                  <IconComponent className="w-5 h-5 text-black stroke-[1.75]" />
                </div>
                <h3 className="font-extrabold text-base md:text-lg text-black tracking-tight">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-neutral-500 font-normal mt-0.5">
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
