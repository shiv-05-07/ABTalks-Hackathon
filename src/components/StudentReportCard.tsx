// src/components/StudentReportCard.tsx
import React, { useState } from 'react';
import { SubmissionProofInput, AIProofAnalysisResult } from '../types';
import { analyzeDailySubmission } from '../services/aiReportService';
import { Sparkles, Code2, Linkedin, Clock, CheckCircle2, Award, ArrowRight, ShieldCheck } from 'lucide-react';

export const StudentReportCard: React.FC = () => {
  const [form, setForm] = useState<SubmissionProofInput>({
    dayId: 12,
    githubUrl: 'https://github.com/student/abtalks-day12',
    codeSnippet: `// Day 12 Challenge Solution
function processSubmission(proof) {
  if (!proof.githubUrl || !proof.linkedinPostText) {
    throw new Error("Missing proof");
  }
  return { status: "verified", timestamp: Date.now() };
}`,
    linkedinPostText: `🚀 Day 12 of 60 #ABTalks Coding Challenge completed!

Today I built an AI-powered submission reviewer using React and TypeScript. Learned how to parse prompt responses and handle fallback heuristics gracefully.

#60DaysOfCode #BuildInPublic #WebDev #ReactJS`,
    timeSpentMinutes: 42,
    submittedAt: '11:24 PM'
  });

  const [analysis, setAnalysis] = useState<AIProofAnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await analyzeDailySubmission(form);
      setAnalysis(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-3 py-4 space-y-4 text-neutral-900">
      {/* Mobile Title Header */}
      <div className="bg-neutral-900 text-white p-4 rounded-2xl space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold tracking-wider uppercase bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded border border-amber-500/30">
            Day {form.dayId} AI Proof Reviewer
          </span>
          <Award className="w-4 h-4 text-amber-400" />
        </div>
        <h1 className="text-xl font-bold tracking-tight">Challenge Report Card</h1>
        <p className="text-xs text-neutral-400">
          Paste your code & LinkedIn post content for instant AI feedback & recruiter pitch analysis.
        </p>
      </div>

      {!analysis ? (
        <form onSubmit={handleAnalyze} className="bg-white border border-neutral-200 p-4 rounded-2xl shadow-sm space-y-3">
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">
              GitHub Repo / Commit URL
            </label>
            <input
              type="url"
              required
              value={form.githubUrl}
              onChange={e => setForm({ ...form, githubUrl: e.target.value })}
              className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
              placeholder="https://github.com/user/repo"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1 flex items-center justify-between">
              <span>Pasted LinkedIn Post Content</span>
              <span className="text-[10px] text-neutral-400">No API required</span>
            </label>
            <textarea
              rows={3}
              required
              value={form.linkedinPostText}
              onChange={e => setForm({ ...form, linkedinPostText: e.target.value })}
              className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
              placeholder="Paste what you posted on LinkedIn today..."
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">
              Code Snippet / Implementation Logic
            </label>
            <textarea
              rows={3}
              required
              value={form.codeSnippet}
              onChange={e => setForm({ ...form, codeSnippet: e.target.value })}
              className="w-full bg-neutral-950 font-mono text-[11px] text-amber-300 p-2.5 rounded-lg focus:outline-none"
              placeholder="// Paste main code function built today..."
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">
              Time Spent Today (Minutes)
            </label>
            <input
              type="number"
              min="5"
              max="600"
              value={form.timeSpentMinutes}
              onChange={e => setForm({ ...form, timeSpentMinutes: Number(e.target.value) })}
              className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black hover:bg-neutral-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition disabled:opacity-50"
          >
            {loading ? (
              <span>Analyzing Code & LinkedIn Pitch...</span>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Evaluate Today's Proof</span>
              </>
            )}
          </button>
        </form>
      ) : (
        /* Mobile Report Card Output */
        <div className="bg-white border border-neutral-200 p-4 rounded-2xl shadow-sm space-y-4">
          {/* Header Status Badge */}
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <div>
                <h3 className="text-xs font-bold text-neutral-900">Day {analysis.dayId} Verified</h3>
                <p className="text-[10px] text-neutral-500">{analysis.generatedBadge}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-lg font-black text-black">{analysis.overallScore}</span>
              <span className="text-[10px] text-neutral-400">/100</span>
            </div>
          </div>

          {/* Metric Ratings */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-neutral-50 p-2.5 rounded-xl border border-neutral-100">
              <p className="text-[10px] font-bold text-neutral-500 uppercase flex items-center gap-1">
                <Code2 className="w-3 h-3 text-neutral-700" /> Code Quality
              </p>
              <p className="text-base font-bold text-neutral-900 mt-0.5">{analysis.codeQualityScore}%</p>
            </div>
            <div className="bg-neutral-50 p-2.5 rounded-xl border border-neutral-100">
              <p className="text-[10px] font-bold text-neutral-500 uppercase flex items-center gap-1">
                <Linkedin className="w-3 h-3 text-sky-600" /> LinkedIn Pitch
              </p>
              <p className="text-base font-bold text-neutral-900 mt-0.5">{analysis.linkedinPitchScore}%</p>
            </div>
          </div>

          {/* Code Feedback */}
          <div className="bg-neutral-900 text-white p-3 rounded-xl space-y-2">
            <p className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">AI Code Review</p>
            <p className="text-xs text-neutral-300 leading-relaxed">{analysis.codeReview.eleganceSummary}</p>
            <div className="pt-1">
              <p className="text-[10px] text-neutral-400 font-bold mb-1">Key Strengths:</p>
              {analysis.codeReview.strengths.map((str, idx) => (
                <p key={idx} className="text-[11px] text-emerald-400 flex items-center gap-1">
                  ✓ <span>{str}</span>
                </p>
              ))}
            </div>
          </div>

          {/* LinkedIn Recruiter Feedback */}
          <div className="bg-sky-50 border border-sky-100 p-3 rounded-xl space-y-1">
            <p className="text-[10px] font-bold text-sky-800 uppercase tracking-wider">Recruiter Visibility Feedback</p>
            <p className="text-xs text-sky-950 font-medium">{analysis.linkedinFeedback.suggestion}</p>
            <p className="text-[10px] text-sky-700 italic mt-1">Tip: {analysis.linkedinFeedback.visibilityTip}</p>
          </div>

          {/* Time Efficiency */}
          <div className="flex items-center gap-2 text-xs text-neutral-600 bg-neutral-50 p-2.5 rounded-xl border border-neutral-100">
            <Clock className="w-4 h-4 text-neutral-500 shrink-0" />
            <span>{analysis.timeEfficiencyNote}</span>
          </div>

          <button
            onClick={() => setAnalysis(null)}
            className="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold py-2 rounded-xl text-xs transition"
          >
            Review Another Submission
          </button>
        </div>
      )}
    </div>
  );
};