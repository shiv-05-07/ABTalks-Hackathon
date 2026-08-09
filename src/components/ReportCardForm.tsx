// src/components/ReportCardForm.tsx
import React, { useState } from 'react';
import { StudentProfile, SubjectScore } from '../types';
import { Plus, Trash2, Sparkles, UserCheck, BookOpen } from 'lucide-react';

interface Props {
  onSubmit: (student: StudentProfile) => void;
  isLoading: boolean;
}

const PRESET_STUDENTS: { label: string; data: StudentProfile }[] = [
  {
    label: 'High Achiever Sample',
    data: {
      studentName: 'Alex Morgan',
      rollNumber: 'AB-2026-042',
      gradeLevel: 'Grade 10',
      academicTerm: 'Term 1 - 2026',
      attendancePercentage: 96,
      conductRating: 'Excellent',
      teacherNotes: 'Consistently engaged, curious, and demonstrates strong analytical skills.',
      subjects: [
        { id: '1', subjectName: 'Mathematics', marksObtained: 94, totalMarks: 100 },
        { id: '2', subjectName: 'Physics', marksObtained: 91, totalMarks: 100 },
        { id: '3', subjectName: 'English Literature', marksObtained: 88, totalMarks: 100 },
        { id: '4', subjectName: 'Computer Science', marksObtained: 98, totalMarks: 100 },
        { id: '5', subjectName: 'World History', marksObtained: 85, totalMarks: 100 },
      ]
    }
  },
  {
    label: 'STEM Focused (Needs Humanities Boost)',
    data: {
      studentName: 'Rohan Sharma',
      rollNumber: 'AB-2026-089',
      gradeLevel: 'Grade 11',
      academicTerm: 'Semester 1',
      attendancePercentage: 88,
      conductRating: 'Good',
      teacherNotes: 'Brilliant in analytical subjects; requires encouraged participation in verbal/essay writing assignments.',
      subjects: [
        { id: '1', subjectName: 'Advanced Mathematics', marksObtained: 96, totalMarks: 100 },
        { id: '2', subjectName: 'Chemistry', marksObtained: 89, totalMarks: 100 },
        { id: '3', subjectName: 'English Composition', marksObtained: 62, totalMarks: 100 },
        { id: '4', subjectName: 'Social Studies', marksObtained: 58, totalMarks: 100 },
        { id: '5', subjectName: 'Physics', marksObtained: 92, totalMarks: 100 },
      ]
    }
  }
];

export const ReportCardForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<StudentProfile>(PRESET_STUDENTS[0].data);

  const handleInputChange = (field: keyof StudentProfile, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubjectChange = (id: string, field: keyof SubjectScore, value: any) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.map(s => s.id === id ? { ...s, [field]: value } : s)
    }));
  };

  const addSubject = () => {
    const newSubject: SubjectScore = {
      id: Date.now().toString(),
      subjectName: '',
      marksObtained: 0,
      totalMarks: 100
    };
    setFormData(prev => ({ ...prev, subjects: [...prev.subjects, newSubject] }));
  };

  const removeSubject = (id: string) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.filter(s => s.id !== id)
    }));
  };

  const applyPreset = (presetData: StudentProfile) => {
    setFormData({ ...presetData });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl text-white space-y-6">
      {/* Header & Presets */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-zinc-800 gap-4">
        <div>
          <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
            <BookOpen className="w-5 h-5" /> Student Grade & Performance Input
          </h2>
          <p className="text-xs text-zinc-400">Fill in student details or pick a quick test preset.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {PRESET_STUDENTS.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => applyPreset(p.data)}
              className="text-xs bg-zinc-800 hover:bg-amber-500 hover:text-black text-zinc-300 px-3 py-1.5 rounded-lg border border-zinc-700 transition"
            >
              Load: {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Student Personal Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-semibold text-zinc-400 mb-1">Student Name</label>
          <input
            type="text"
            required
            value={formData.studentName}
            onChange={e => handleInputChange('studentName', e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-zinc-400 mb-1">Roll / Student ID</label>
          <input
            type="text"
            required
            value={formData.rollNumber}
            onChange={e => handleInputChange('rollNumber', e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-zinc-400 mb-1">Grade / Class</label>
          <input
            type="text"
            required
            value={formData.gradeLevel}
            onChange={e => handleInputChange('gradeLevel', e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-zinc-400 mb-1">Academic Term</label>
          <input
            type="text"
            required
            value={formData.academicTerm}
            onChange={e => handleInputChange('academicTerm', e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      {/* Attendance & Conduct */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-zinc-950/60 p-4 rounded-xl border border-zinc-800/80">
        <div>
          <label className="block text-xs font-semibold text-zinc-400 mb-1">
            Attendance (%)
          </label>
          <input
            type="number"
            min="0"
            max="100"
            value={formData.attendancePercentage}
            onChange={e => handleInputChange('attendancePercentage', Number(e.target.value))}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-zinc-400 mb-1">Conduct Rating</label>
          <select
            value={formData.conductRating}
            onChange={e => handleInputChange('conductRating', e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
          >
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Satisfactory">Satisfactory</option>
            <option value="Needs Improvement">Needs Improvement</option>
          </select>
        </div>
      </div>

      {/* Subject Scores Table */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-zinc-300">Subject Marks</h3>
          <button
            type="button"
            onClick={addSubject}
            className="flex items-center gap-1 text-xs bg-zinc-800 hover:bg-zinc-700 text-amber-400 px-3 py-1.5 rounded-lg border border-zinc-700 transition"
          >
            <Plus className="w-3.5 h-3.5" /> Add Subject
          </button>
        </div>

        <div className="space-y-2">
          {formData.subjects.map((sub) => (
            <div key={sub.id} className="flex items-center gap-2 bg-zinc-950 p-2.5 rounded-xl border border-zinc-850">
              <input
                type="text"
                placeholder="Subject Name (e.g. Science)"
                required
                value={sub.subjectName}
                onChange={e => handleSubjectChange(sub.id, 'subjectName', e.target.value)}
                className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400"
              />
              <div className="flex items-center gap-1 w-36">
                <input
                  type="number"
                  min="0"
                  placeholder="Obtained"
                  required
                  value={sub.marksObtained}
                  onChange={e => handleSubjectChange(sub.id, 'marksObtained', Number(e.target.value))}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-1.5 text-xs text-white text-center focus:outline-none focus:border-amber-400"
                />
                <span className="text-zinc-500 text-xs">/</span>
                <input
                  type="number"
                  min="1"
                  placeholder="Total"
                  required
                  value={sub.totalMarks}
                  onChange={e => handleSubjectChange(sub.id, 'totalMarks', Number(e.target.value))}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-1.5 text-xs text-white text-center focus:outline-none focus:border-amber-400"
                />
              </div>
              {formData.subjects.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSubject(sub.id)}
                  className="p-1.5 text-zinc-500 hover:text-red-400 transition"
                  title="Remove subject"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Teacher Remarks */}
      <div>
        <label className="block text-xs font-semibold text-zinc-400 mb-1">Teacher / Counselor Remarks</label>
        <textarea
          rows={2}
          placeholder="Add qualitative observation notes..."
          value={formData.teacherNotes || ''}
          onChange={e => handleInputChange('teacherNotes', e.target.value)}
          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-amber-400"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-bold py-3 px-6 rounded-xl shadow-lg flex items-center justify-center gap-2 transition disabled:opacity-50"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin"></span>
            Generating AI Report Card...
          </span>
        ) : (
          <>
            <Sparkles className="w-5 h-5 fill-zinc-950" /> Generate AI Report Card
          </>
        )}
      </button>
    </form>
  );
};