import React from 'react';

interface JourneyProgressProps {
  completedDays?: number;
  totalDays?: number;
  onSelectDay?: (dayNumber: number) => void;
}

export const JourneyProgress: React.FC<JourneyProgressProps> = ({
  completedDays = 12,
  totalDays = 60,
  onSelectDay,
}) => {
  const daysArray = Array.from({ length: totalDays }, (_, i) => i + 1);

  return (
    <section className="max-w-[1180px] mx-auto px-4 sm:px-6 my-8 md:my-14">
      <div className="bg-white border border-neutral-200 rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xs max-w-full overflow-hidden">
        {/* Header Row */}
        <div className="flex items-center justify-between pb-4 sm:pb-6 border-b border-neutral-100 mb-4 sm:mb-6">
          <span className="text-[11px] sm:text-xs md:text-sm font-bold text-black tracking-wider uppercase">
            YOUR 60-DAY JOURNEY
          </span>
          <span className="text-xs sm:text-sm font-extrabold text-black">
            Day {completedDays} / {totalDays}
          </span>
        </div>

        {/* 60-Day Dots Representation Container */}
        <div className="py-2 w-full overflow-x-auto no-scrollbar">
          <div className="flex items-center justify-between gap-1 sm:gap-1.5 min-w-[540px] sm:min-w-0 py-2">
            {daysArray.map((dayNum) => {
              const isCompleted = dayNum <= completedDays;
              const isCurrentDay = dayNum === completedDays;

              return (
                <button
                  key={dayNum}
                  onClick={() => onSelectDay?.(dayNum)}
                  title={`Day ${dayNum}: ${isCompleted ? 'Completed' : 'Upcoming'}`}
                  className={`group relative flex items-center justify-center transition-transform hover:scale-125 focus:outline-none cursor-pointer`}
                >
                  <div
                    className={`rounded-full transition-all ${
                      isCompleted
                        ? 'w-3 h-3 bg-black'
                        : 'w-3 h-3 bg-white border border-neutral-300'
                    } ${isCurrentDay ? 'ring-2 ring-black ring-offset-2' : ''}`}
                  />
                  {/* Tooltip on hover */}
                  <div className="absolute bottom-full mb-2 hidden group-hover:flex flex-col items-center z-20 pointer-events-none">
                    <div className="bg-black text-white text-[10px] font-bold py-1 px-2 rounded whitespace-nowrap">
                      Day {dayNum} {isCompleted ? '✓' : ''}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer Bounds Row */}
        <div className="flex items-center justify-between pt-4 text-xs font-semibold text-neutral-400">
          <span>Day 1</span>
          <span>Day 60</span>
        </div>
      </div>
    </section>
  );
};
