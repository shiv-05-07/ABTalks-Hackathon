import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Github,
  Linkedin,
  Code,
  ExternalLink,
  Flame,
  Check,
  Send,
  AlertCircle,
  FileCode,
  Sparkles,
  Share2
} from 'lucide-react';
import { DayChallenge, ProofSubmission, RoutePath } from '../types';

interface ChallengeDayProps {
  dayId: number;
  challenge: DayChallenge;
  existingSubmission?: ProofSubmission;
  onNavigate: (path: RoutePath) => void;
  onSubmitProof: (submission: ProofSubmission) => void;
}

export const ChallengeDay: React.FC<ChallengeDayProps> = ({
  dayId,
  challenge,
  existingSubmission,
  onNavigate,
  onSubmitProof,
}) => {
  const [githubUrl, setGithubUrl] = useState(existingSubmission?.githubUrl || '');
  const [linkedinUrl, setLinkedinUrl] = useState(existingSubmission?.linkedinUrl || '');
  const [reflection, setReflection] = useState(existingSubmission?.reflection || '');
  const [isSubmitted, setIsSubmitted] = useState(!!existingSubmission);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!githubUrl.trim() || !githubUrl.includes('github.com')) {
      setErrorMsg('Please enter a valid GitHub commit or repository URL (e.g. https://github.com/your-username/repo)');
      return;
    }

    if (!linkedinUrl.trim() || !linkedinUrl.includes('linkedin.com')) {
      setErrorMsg('Please enter a valid LinkedIn post URL (e.g. https://linkedin.com/posts/your-post-id)');
      return;
    }

    const newSubmission: ProofSubmission = {
      dayId,
      githubUrl: githubUrl.trim(),
      linkedinUrl: linkedinUrl.trim(),
      reflection: reflection.trim(),
      submittedAt: new Date().toISOString(),
      status: 'verified',
    };

    onSubmitProof(newSubmission);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-neutral-50/60 pb-20">
      {/* Navigation Sub-Bar */}
      <div className="bg-white border-b border-neutral-200 sticky top-14 md:top-16 z-40">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6 h-12 flex items-center justify-between text-xs sm:text-sm">
          <button
            onClick={() => onNavigate('/dashboard')}
            className="flex items-center gap-1.5 font-semibold text-neutral-600 hover:text-black transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>

          <div className="flex items-center gap-4">
            {dayId > 1 && (
              <button
                onClick={() => onNavigate(`/day/${dayId - 1}`)}
                className="text-neutral-500 hover:text-black font-semibold cursor-pointer"
              >
                ← Day {dayId - 1}
              </button>
            )}
            <span className="font-extrabold text-black bg-neutral-100 px-2.5 py-0.5 rounded border border-neutral-200">
              Day {dayId} of 60
            </span>
            {dayId < 60 && (
              <button
                onClick={() => onNavigate(`/day/${dayId + 1}`)}
                className="text-neutral-500 hover:text-black font-semibold cursor-pointer"
              >
                Day {dayId + 1} →
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 pt-6 space-y-6">
        {/* Main Header Banner */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black text-white text-[11px] font-bold uppercase tracking-wider w-fit">
              <Clock className="w-3.5 h-3.5" />
              <span>CHALLENGE DAY {dayId}</span>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500">
              <span>Track: <strong className="text-black">{challenge.track}</strong></span>
              <span>•</span>
              <span>Est. {challenge.estimatedMinutes} Mins</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-black tracking-tight mb-3">
            {challenge.title}
          </h1>
          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
            {challenge.summary}
          </p>
        </div>

        {/* Content Columns: Task Brief & Proof Submission */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Task Description & Objectives (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Objectives */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-2xs">
              <h2 className="text-xs font-bold text-black uppercase tracking-wider mb-4 flex items-center gap-2">
                <FileCode className="w-4 h-4 text-black" />
                <span>WHAT YOU NEED TO BUILD TODAY:</span>
              </h2>

              <ul className="space-y-3 text-xs sm:text-sm text-neutral-700">
                {challenge.objectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-neutral-100 border border-neutral-300 text-black font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <span className="leading-relaxed">{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Code Starter Snippet */}
            {challenge.starterCodeSnippet && (
              <div className="bg-neutral-900 text-neutral-100 border border-neutral-800 rounded-2xl p-6 shadow-md font-mono text-xs overflow-x-auto">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-4 text-neutral-400 text-[11px]">
                  <span>Starter Code Specification</span>
                  <span>TypeScript / React</span>
                </div>
                <pre className="text-neutral-200 leading-relaxed font-mono">
                  <code>{challenge.starterCodeSnippet}</code>
                </pre>
              </div>
            )}

            {/* Recommended Resources */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-2xs">
              <h2 className="text-xs font-bold text-black uppercase tracking-wider mb-3">
                RECOMMENDED RESOURCES
              </h2>
              <div className="space-y-2">
                {challenge.resources.map((res, i) => (
                  <a
                    key={i}
                    href={res.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/80 text-xs font-semibold text-black transition-colors"
                  >
                    <span>{res.title}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Submission Form (5 Cols) */}
          <div className="lg:col-span-5 bg-white border border-neutral-200 rounded-2xl p-6 shadow-2xs space-y-5 sticky top-28">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <h2 className="text-sm font-extrabold text-black uppercase tracking-wider">
                SUBMIT PROOF OF WORK
              </h2>
              <span className="text-[11px] font-bold text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded">
                2 Proofs
              </span>
            </div>

            {isSubmitted ? (
              <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-5 space-y-4">
                <div className="flex items-center gap-2.5 text-black font-extrabold text-sm sm:text-base">
                  <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>Day {dayId} Proof Verified!</span>
                </div>

                <p className="text-xs text-neutral-600 leading-relaxed">
                  Great job! Your submission has been logged and your streak extended.
                </p>

                <div className="space-y-2 text-xs pt-2">
                  <div className="p-2.5 bg-white border border-neutral-200 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-2 text-neutral-800 font-semibold truncate max-w-[200px]">
                      <Github className="w-4 h-4 text-black shrink-0" />
                      <span className="truncate">{githubUrl}</span>
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-black shrink-0" />
                  </div>

                  <div className="p-2.5 bg-white border border-neutral-200 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-2 text-neutral-800 font-semibold truncate max-w-[200px]">
                      <Linkedin className="w-4 h-4 text-black shrink-0" />
                      <span className="truncate">{linkedinUrl}</span>
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-black shrink-0" />
                  </div>
                </div>

                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs font-semibold text-neutral-500 hover:text-black underline cursor-pointer pt-2 inline-block"
                >
                  Edit Submission Links
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="bg-neutral-100 border border-neutral-300 text-black p-3 rounded-xl text-xs flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* GitHub Input */}
                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1.5">
                    1. GitHub Repository / Commit URL <span className="text-black">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      placeholder="https://github.com/username/repo-name"
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                      className="w-full px-3.5 py-2.5 pl-9 bg-white border border-neutral-200 rounded-xl text-xs text-black placeholder-neutral-400 focus:outline-none focus:border-black font-mono transition-colors"
                      required
                    />
                    <Github className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  </div>
                </div>

                {/* LinkedIn Input */}
                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1.5">
                    2. LinkedIn Post URL <span className="text-black">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      placeholder="https://linkedin.com/posts/your-post"
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      className="w-full px-3.5 py-2.5 pl-9 bg-white border border-neutral-200 rounded-xl text-xs text-black placeholder-neutral-400 focus:outline-none focus:border-black font-mono transition-colors"
                      required
                    />
                    <Linkedin className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  </div>
                </div>

                {/* Reflection Notes (Optional) */}
                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1.5">
                    Learning Notes / Reflection (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="What did you learn today? Any challenges overcome?"
                    value={reflection}
                    onChange={(e) => setReflection(e.target.value)}
                    className="w-full p-3 bg-white border border-neutral-200 rounded-xl text-xs text-black placeholder-neutral-400 focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3 bg-black hover:bg-neutral-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-99"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Day {dayId} Proof</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
