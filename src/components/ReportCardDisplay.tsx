// src/components/ReportCardDisplay.tsx
import React from 'react';
import { FullReportCardData } from '../types';
import { Award, CheckCircle2, AlertCircle, Printer, RefreshCw, Sparkles, TrendingUp, User, Calendar } from 'lucide-react';

interface Props {
  reportData: FullReportCardData;
  onReset: () => void;
}

export const ReportCardDisplay: React.FC<Props> = ({ reportData, onReset }) => {
  const { student, aiEvaluation, generatedAt } = reportData;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 print:space-y-4">
      {/* Top Controls (Hidden during print) */}
      <div className="flex items-center justify-between bg-zinc-900 border border-zinc-800 p-4 rounded-xl print:hidden">
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Report generated on {new Date(generatedAt).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-3 py-2 rounded-lg transition"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Edit Data
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 text-xs bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-4 py-2 rounded-lg transition"
          >
            <Printer className="w-3.5 h-3.5" /> Print / Save PDF
          </button>
        </div>
      </div>

      {/* Main Print Container */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8 text-white space-y-6 print:bg-white print:text-black print:border-none print:p-0">
        
        {/* Header Branding & Student Badge */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 border-b border-zinc-800 print:border-zinc-300 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-amber-400 text-xs font-bold tracking-widest uppercase bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
                AI Performance Report
              </span>
              <span className="text-zinc-500 text-xs">{student.academicTerm}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black mt-2 tracking-tight text-white print:text-black">
              {student.studentName}
            </h1>
            <p className="text-xs text-zinc-400 print:text-zinc-600 flex items-center gap-3 mt-1">
              <span>Roll ID: <strong className="text-zinc-200 print:text-black">{student.rollNumber}</strong></span>
              <span>•</span>
              <span>Class: <strong className="text-zinc-200 print:text-black">{student.gradeLevel}</strong></span>
            </p>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl flex items-center gap-6 print:border-zinc-300 print:bg-zinc-50">
            <div className="text-center">
              <p className="text-[10px] text-zinc-400 print:text-zinc-600 uppercase font-bold tracking-wider">Overall</p>
              <p className="text-2xl font-black text-amber-400 print:text-black">{aiEvaluation.overallPercentage}%</p>
            </div>
            <div className="h-8 w-px bg-zinc-800 print:bg-zinc-300" />
            <div className="text-center">
              <p className="text-[10px] text-zinc-400 print:text-zinc-600 uppercase font-bold tracking-wider">Est. GPA</p>
              <p className="text-2xl font-black text-white print:text-black">{aiEvaluation.overallGpa}</p>
            </div>
            <div className="h-8 w-px bg-zinc-800 print:bg-zinc-300" />
            <div className="text-center">
              <p className="text-[10px] text-zinc-400 print:text-zinc-600 uppercase font-bold tracking-wider">Band</p>
              <p className="text-xs font-bold text-amber-400/90 print:text-black">{aiEvaluation.performanceBand}</p>
            </div>
          </div>
        </div>

        {/* Executive AI Synthesis */}
        <div className="bg-gradient-to-br from-zinc-950 to-zinc-900 border border-amber-500/20 p-5 rounded-xl print:bg-zinc-50 print:border-zinc-300">
          <div className="flex items-center gap-2 mb-2 text-amber-400 print:text-amber-700">
            <Sparkles className="w-4 h-4" />
            <h3 className="text-xs font-bold uppercase tracking-wider">AI Executive Synthesis</h3>
          </div>
          <p className="text-sm text-zinc-300 print:text-zinc-800 leading-relaxed">
            {aiEvaluation.executiveSummary}
          </p>
        </div>

        {/* Key Strengths & Areas for Improvement */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-zinc-950/60 border border-zinc-800/80 p-4 rounded-xl print:border-zinc-300 print:bg-zinc-50">
            <h4 className="text-xs font-bold text-emerald-400 print:text-emerald-700 flex items-center gap-1.5 mb-3">
              <CheckCircle2 className="w-4 h-4" /> Demonstrated Strengths
            </h4>
            <ul className="space-y-2">
              {aiEvaluation.keyStrengths.map((str, i) => (
                <li key={i} className="text-xs text-zinc-300 print:text-zinc-800 flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">•</span>
                  <span>{str}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-zinc-950/60 border border-zinc-800/80 p-4 rounded-xl print:border-zinc-300 print:bg-zinc-50">
            <h4 className="text-xs font-bold text-amber-400 print:text-amber-700 flex items-center gap-1.5 mb-3">
              <TrendingUp className="w-4 h-4" /> Focus & Growth Areas
            </h4>
            <ul className="space-y-2">
              {aiEvaluation.areasForImprovement.map((area, i) => (
                <li key={i} className="text-xs text-zinc-300 print:text-zinc-800 flex items-start gap-2">
                  <span className="text-amber-500 mt-0.5">•</span>
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Subject Breakdown Table */}
        <div>
          <h3 className="text-sm font-bold text-zinc-300 print:text-black mb-3">Subject Wise Breakdown</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 print:border-zinc-300 text-zinc-400 print:text-zinc-600">
                  <th className="py-2.5 px-3">Subject</th>
                  <th className="py-2.5 px-3">Marks Obtained</th>
                  <th className="py-2.5 px-3">Percentage</th>
                  <th className="py-2.5 px-3">AI Subject Insight & Tip</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50 print:divide-zinc-200">
                {student.subjects.map((sub) => {
                  const pct = Math.round((sub.marksObtained / sub.totalMarks) * 100);
                  const insight = aiEvaluation.subjectInsights.find(
                    s => s.subjectName.toLowerCase() === sub.subjectName.toLowerCase()
                  );

                  return (
                    <tr key={sub.id} className="hover:bg-zinc-950/40">
                      <td className="py-3 px-3 font-semibold text-white print:text-black">{sub.subjectName}</td>
                      <td className="py-3 px-3 text-zinc-300 print:text-black">
                        {sub.marksObtained} / {sub.totalMarks}
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-amber-400 print:text-black">{pct}%</span>
                          <div className="w-16 bg-zinc-800 print:bg-zinc-200 h-1.5 rounded-full overflow-hidden print:hidden">
                            <div
                              className="bg-amber-400 h-full rounded-full"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-zinc-400 print:text-zinc-700">
                        <p>{insight?.insight || 'Good engagement in coursework.'}</p>
                        {insight?.recommendation && (
                          <p className="text-[11px] text-amber-400/90 print:text-zinc-900 mt-0.5 italic">
                            Tip: {insight.recommendation}
                          </p>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Attendance & Conduct Footer Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-zinc-800 print:border-zinc-300">
          <div className="text-xs text-zinc-400 print:text-zinc-700 space-y-1">
            <p>Attendance Record: <strong className="text-white print:text-black">{student.attendancePercentage}%</strong></p>
            <p>Conduct Rating: <strong className="text-white print:text-black">{student.conductRating}</strong></p>
            {student.teacherNotes && (
              <p className="pt-1 italic text-zinc-400">"{student.teacherNotes}"</p>
            )}
          </div>
          <div>
            <h4 className="text-xs font-bold text-zinc-300 print:text-black mb-1">Recommended Action Plan</h4>
            <ul className="space-y-1 text-xs text-zinc-400 print:text-zinc-700">
              {aiEvaluation.actionableRecommendations.map((rec, idx) => (
                <li key={idx}>• {rec}</li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};