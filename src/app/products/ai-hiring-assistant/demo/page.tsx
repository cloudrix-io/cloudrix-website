"use client";

import { useState } from "react";
import Link from "next/link";

const sampleJD = `Senior Full-Stack Developer

We are looking for an experienced Full-Stack Developer to join our growing team.

Requirements:
- 5+ years of experience in web development
- Strong proficiency in React, TypeScript, and Node.js
- Experience with PostgreSQL or similar relational databases
- Knowledge of cloud services (AWS, GCP, or Azure)
- Experience with CI/CD pipelines and DevOps practices
- Familiarity with Docker and Kubernetes
- Strong understanding of RESTful APIs and GraphQL
- Experience with agile methodologies
- Excellent communication and teamwork skills
- Bachelor's degree in Computer Science or related field

Nice to have:
- Experience with Next.js
- Knowledge of microservices architecture
- Experience with Redis or message queues
- Contributions to open-source projects`;

interface Candidate {
  name: string;
  title: string;
  location: string;
  avatar: string;
  overallScore: number;
  skills: { name: string; match: boolean }[];
  experience: { years: number; detail: string; score: number };
  education: { degree: string; school: string; score: number };
  cultureFit: { score: number; detail: string };
  summary: string;
  interviewQuestions: string[];
}

const sampleCandidates: Candidate[] = [
  {
    name: "John Mitchell",
    title: "Senior Software Engineer",
    location: "San Francisco, CA",
    avatar: "JM",
    overallScore: 92,
    skills: [
      { name: "React", match: true }, { name: "TypeScript", match: true },
      { name: "Node.js", match: true }, { name: "PostgreSQL", match: true },
      { name: "AWS", match: true }, { name: "Docker", match: true },
      { name: "Kubernetes", match: false }, { name: "REST APIs", match: true },
      { name: "GraphQL", match: true }, { name: "CI/CD", match: true },
      { name: "Next.js", match: true }, { name: "Redis", match: true },
      { name: "Agile", match: true },
    ],
    experience: { years: 7, detail: "7 years in full-stack development. Led frontend serving 2M+ users at TechCorp. Built RESTful APIs and deployed on AWS.", score: 95 },
    education: { degree: "B.Sc. Computer Science", school: "UC Berkeley", score: 90 },
    cultureFit: { score: 88, detail: "Agile/Scrum experience, collaborative mindset, AWS certified. Strong teamwork indicators." },
    summary: "Excellent match. Exceeds requirements in most areas. 7+ years of experience with strong React/TypeScript/Node.js stack. AWS certified. Prioritize for interview.",
    interviewQuestions: [
      "You led a React/TypeScript frontend serving 2M+ users. What architectural decisions were critical to handling that scale, and what would you do differently today?",
      "Describe a time you had to migrate a monolithic REST API to a microservices architecture. What challenges did you face with data consistency?",
      "How do you approach CI/CD pipeline design for a team of 10+ developers? Walk me through your ideal setup with GitHub Actions.",
      "You have experience with both GraphQL and REST. In what scenarios would you recommend one over the other for a new project?",
      "Tell me about a production incident you managed. How did you handle communication with stakeholders while debugging?",
    ],
  },
  {
    name: "Priya Sharma",
    title: "Full-Stack Developer",
    location: "London, UK",
    avatar: "PS",
    overallScore: 78,
    skills: [
      { name: "React", match: true }, { name: "TypeScript", match: true },
      { name: "Node.js", match: true }, { name: "PostgreSQL", match: true },
      { name: "AWS", match: false }, { name: "Docker", match: true },
      { name: "Kubernetes", match: false }, { name: "REST APIs", match: true },
      { name: "GraphQL", match: false }, { name: "CI/CD", match: true },
      { name: "Next.js", match: true }, { name: "Redis", match: false },
      { name: "Agile", match: true },
    ],
    experience: { years: 4, detail: "4 years of full-stack development. Built internal tools and customer portals. Strong frontend skills with React/Next.js.", score: 72 },
    education: { degree: "M.Sc. Software Engineering", school: "Imperial College London", score: 95 },
    cultureFit: { score: 82, detail: "Open-source contributor, agile practitioner, strong communicator. Mentored junior developers." },
    summary: "Good match. Strong frontend skills and excellent education. Slightly under on experience requirements (4 vs 5 years). Missing AWS and GraphQL but has strong learning trajectory.",
    interviewQuestions: [
      "You have 4 years of experience. Can you describe a project where you took ownership beyond your experience level? What did you learn?",
      "Your experience is primarily with GCP. How would you approach transitioning to an AWS-based infrastructure? What parallels would you draw?",
      "Tell me about your open-source contributions. What motivated you, and how did you handle code reviews from strangers?",
      "Describe how you would design a GraphQL schema for a multi-tenant SaaS application, even though it is a new technology for you.",
      "How do you prioritize technical debt versus feature development in an agile sprint?",
    ],
  },
  {
    name: "Alex Kowalski",
    title: "Backend Engineer",
    location: "Berlin, Germany",
    avatar: "AK",
    overallScore: 65,
    skills: [
      { name: "React", match: false }, { name: "TypeScript", match: true },
      { name: "Node.js", match: true }, { name: "PostgreSQL", match: true },
      { name: "AWS", match: true }, { name: "Docker", match: true },
      { name: "Kubernetes", match: true }, { name: "REST APIs", match: true },
      { name: "GraphQL", match: false }, { name: "CI/CD", match: true },
      { name: "Next.js", match: false }, { name: "Redis", match: true },
      { name: "Agile", match: true },
    ],
    experience: { years: 6, detail: "6 years backend-focused. Strong DevOps and infrastructure skills. Limited frontend experience.", score: 70 },
    education: { degree: "B.Eng. Computer Engineering", school: "TU Berlin", score: 85 },
    cultureFit: { score: 65, detail: "Independent worker, strong technical skills. Less experience in collaborative agile environments." },
    summary: "Partial match. Strong backend and DevOps skills with Kubernetes expertise. Missing frontend experience (React, Next.js). Consider for backend-heavy variation of the role.",
    interviewQuestions: [
      "Your background is backend-focused. How comfortable would you be taking on React/TypeScript frontend work? What is your learning plan?",
      "You have strong Kubernetes experience. Describe how you would set up a production-grade K8s cluster for a SaaS platform from scratch.",
      "How do you approach database schema design for a high-traffic application? Walk me through your PostgreSQL optimization strategies.",
      "Tell me about a time you had to collaborate closely with frontend developers. How did you handle API contract design?",
      "What is your experience with monitoring and observability? How do you ensure production reliability?",
    ],
  },
  {
    name: "Maria Santos",
    title: "Junior Developer",
    location: "Lisbon, Portugal",
    avatar: "MS",
    overallScore: 42,
    skills: [
      { name: "React", match: true }, { name: "TypeScript", match: false },
      { name: "Node.js", match: true }, { name: "PostgreSQL", match: false },
      { name: "AWS", match: false }, { name: "Docker", match: false },
      { name: "Kubernetes", match: false }, { name: "REST APIs", match: true },
      { name: "GraphQL", match: false }, { name: "CI/CD", match: false },
      { name: "Next.js", match: false }, { name: "Redis", match: false },
      { name: "Agile", match: true },
    ],
    experience: { years: 1, detail: "1 year of development experience. Completed a coding bootcamp. Built small React projects.", score: 30 },
    education: { degree: "Coding Bootcamp Certificate", school: "Le Wagon Lisbon", score: 45 },
    cultureFit: { score: 75, detail: "Enthusiastic learner, team player, agile experience from bootcamp projects." },
    summary: "Weak match. Significantly under-qualified for a senior role. Only 1 year of experience, missing most required skills. Better suited for a junior position.",
    interviewQuestions: [
      "What projects have you built independently since completing your bootcamp? What technologies did you use?",
      "How do you approach learning new technologies? Give me an example of something complex you taught yourself.",
      "Describe your ideal development environment and workflow. How do you stay productive?",
      "Where do you see yourself in 2-3 years? What specific skills do you want to develop?",
      "Tell me about a group project from your bootcamp. What was your role and what did you contribute?",
    ],
  },
];

function ScoreRing({ score, size = 80 }: { score: number; size?: number }) {
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const color = score >= 80 ? "#22c55e" : score >= 60 ? "#eab308" : "#ef4444";
  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#e2e8f0" strokeWidth="6" />
        <circle
          cx={size / 2} cy={size / 2} r={radius} fill="none"
          stroke={color} strokeWidth="6" strokeLinecap="round"
          strokeDasharray={`${(score / 100) * circumference} ${circumference}`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <span className="absolute text-lg font-bold text-slate-800">{score}%</span>
    </div>
  );
}

function ScoreBar({ score, label }: { score: number; label: string }) {
  const color = score >= 80 ? "bg-green-500" : score >= 60 ? "bg-yellow-500" : "bg-red-500";
  const textColor = score >= 80 ? "text-green-600" : score >= 60 ? "text-yellow-600" : "text-red-600";
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-slate-700">{label}</span>
        <span className={`text-sm font-bold ${textColor}`}>{score}%</span>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-2.5">
        <div className={`${color} h-full rounded-full transition-all duration-700`} style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}

export default function HireAIDemo() {
  const [jobDescription, setJobDescription] = useState(sampleJD);
  const [showResults, setShowResults] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>(["John_Mitchell_CV.pdf", "Priya_Sharma_CV.pdf", "Alex_Kowalski_CV.pdf", "Maria_Santos_CV.pdf"]);
  const [dragOver, setDragOver] = useState(false);

  const handleAnalyze = () => {
    if (!jobDescription.trim() || uploadedFiles.length === 0) return;
    setAnalyzing(true);
    setShowResults(false);
    setSelectedCandidate(null);
    setTimeout(() => {
      setShowResults(true);
      setAnalyzing(false);
    }, 2200);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/products/ai-hiring-assistant" className="text-emerald-200 hover:text-white text-sm mb-2 inline-block">&larr; Back to HireAI</Link>
          <h1 className="text-3xl font-bold">HireAI Candidate Screening</h1>
          <p className="text-emerald-100 mt-1">AI-powered resume analysis, candidate ranking, and interview question generation</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Input Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Job Description */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Job Description</label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={14}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-sm resize-none bg-white"
              placeholder="Paste job description here..."
            />
          </div>

          {/* CV Upload */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Resumes / CVs</label>
            <div
              className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
                dragOver ? "border-emerald-400 bg-emerald-50" : "border-slate-300 bg-white"
              }`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => { e.preventDefault(); setDragOver(false); }}
            >
              <div className="text-4xl mb-3">&#128196;</div>
              <p className="text-sm font-medium text-slate-700 mb-1">Drop CV files here or click to browse</p>
              <p className="text-xs text-slate-500 mb-3">Supports PDF, DOCX, TXT (max 10MB each)</p>
              <button className="text-xs bg-emerald-100 text-emerald-700 px-4 py-2 rounded-lg font-medium hover:bg-emerald-200 transition-colors">
                Browse Files
              </button>
            </div>

            {/* Uploaded files list */}
            <div className="mt-3 space-y-2">
              {uploadedFiles.map((file, i) => (
                <div key={i} className="flex items-center justify-between bg-white border border-slate-200 rounded-lg px-3 py-2">
                  <div className="flex items-center gap-2">
                    <span className="text-red-500 text-sm">&#128196;</span>
                    <span className="text-sm text-slate-700">{file}</span>
                  </div>
                  <button
                    onClick={() => setUploadedFiles(uploadedFiles.filter((_, idx) => idx !== i))}
                    className="text-slate-400 hover:text-red-500 text-lg leading-none"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Analyze Button */}
        <div className="text-center mb-8">
          <button
            onClick={handleAnalyze}
            disabled={analyzing || !jobDescription.trim() || uploadedFiles.length === 0}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold px-10 py-3 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-200"
          >
            {analyzing ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                Screening {uploadedFiles.length} Candidates...
              </span>
            ) : `Screen ${uploadedFiles.length} Candidates`}
          </button>
        </div>

        {/* Results */}
        {showResults && (
          <div className="space-y-6">
            {/* Summary */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">&#129302;</span>
                <h2 className="text-lg font-semibold text-slate-800">AI Screening Results</h2>
                <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">{sampleCandidates.length} candidates ranked</span>
              </div>

              {/* Candidate Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {sampleCandidates.map((c, i) => {
                  const rankColors = ["bg-emerald-100 text-emerald-700 border-emerald-200", "bg-blue-100 text-blue-700 border-blue-200", "bg-amber-100 text-amber-700 border-amber-200", "bg-red-100 text-red-700 border-red-200"];
                  const rankLabels = ["Top Match", "Strong", "Partial", "Weak"];
                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedCandidate(c)}
                      className={`text-left bg-white rounded-xl border p-5 transition-all cursor-pointer hover:shadow-md ${
                        selectedCandidate === c ? "border-emerald-400 ring-2 ring-emerald-200 shadow-md" : "border-slate-200 hover:border-emerald-300"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${rankColors[i]}`}>#{i + 1} {rankLabels[i]}</span>
                        <ScoreRing score={c.overallScore} size={52} />
                      </div>
                      <div className="flex items-center gap-2.5 mb-2">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-white text-xs font-bold flex items-center justify-center">
                          {c.avatar}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800">{c.name}</p>
                          <p className="text-xs text-slate-500">{c.title}</p>
                        </div>
                      </div>
                      <p className="text-xs text-slate-400">{c.location}</p>
                      <div className="mt-3 flex flex-wrap gap-1">
                        {c.skills.filter(s => s.match).slice(0, 4).map(s => (
                          <span key={s.name} className="text-[10px] bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded">{s.name}</span>
                        ))}
                        {c.skills.filter(s => s.match).length > 4 && (
                          <span className="text-[10px] text-slate-400">+{c.skills.filter(s => s.match).length - 4} more</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Candidate Detail */}
            {selectedCandidate && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left - Scores */}
                <div className="lg:col-span-1 space-y-6">
                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 text-center">
                    <ScoreRing score={selectedCandidate.overallScore} size={100} />
                    <p className="text-lg font-bold text-slate-800 mt-3">{selectedCandidate.name}</p>
                    <p className="text-sm text-slate-500">{selectedCandidate.title}</p>
                    <p className="text-xs text-slate-400 mt-1">{selectedCandidate.location}</p>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <h3 className="font-semibold text-slate-800 mb-4">Score Breakdown</h3>
                    <div className="space-y-3">
                      <ScoreBar score={Math.round(selectedCandidate.skills.filter(s => s.match).length / selectedCandidate.skills.length * 100)} label="Skills Match (40%)" />
                      <ScoreBar score={selectedCandidate.experience.score} label="Experience (30%)" />
                      <ScoreBar score={selectedCandidate.education.score} label="Education (15%)" />
                      <ScoreBar score={selectedCandidate.cultureFit.score} label="Culture Fit (15%)" />
                    </div>
                  </div>
                </div>

                {/* Center - Skills & Details */}
                <div className="lg:col-span-1 space-y-6">
                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <h3 className="font-semibold text-slate-800 mb-3">Skill Match Breakdown</h3>
                    <div className="space-y-2">
                      {selectedCandidate.skills.map(s => (
                        <div key={s.name} className="flex items-center justify-between text-sm">
                          <span className="text-slate-700">{s.name}</span>
                          {s.match ? (
                            <span className="text-green-600 font-medium text-xs bg-green-50 px-2 py-0.5 rounded-full">Match</span>
                          ) : (
                            <span className="text-red-500 font-medium text-xs bg-red-50 px-2 py-0.5 rounded-full">Missing</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <h3 className="font-semibold text-slate-800 mb-3">Details</h3>
                    <div className="space-y-3 text-sm">
                      <div className="bg-slate-50 rounded-lg p-3">
                        <p className="font-medium text-slate-700 mb-1">Experience ({selectedCandidate.experience.years} years)</p>
                        <p className="text-slate-600 text-xs">{selectedCandidate.experience.detail}</p>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-3">
                        <p className="font-medium text-slate-700 mb-1">Education</p>
                        <p className="text-slate-600 text-xs">{selectedCandidate.education.degree} - {selectedCandidate.education.school}</p>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-3">
                        <p className="font-medium text-slate-700 mb-1">Culture Fit</p>
                        <p className="text-slate-600 text-xs">{selectedCandidate.cultureFit.detail}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right - AI Summary & Interview Questions */}
                <div className="lg:col-span-1 space-y-6">
                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span>&#129302;</span>
                      <h3 className="font-semibold text-slate-800">AI Summary</h3>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{selectedCandidate.summary}</p>
                  </div>

                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-200 p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span>&#128172;</span>
                      <h3 className="font-semibold text-emerald-800">AI-Generated Interview Questions</h3>
                    </div>
                    <div className="space-y-3">
                      {selectedCandidate.interviewQuestions.map((q, i) => (
                        <div key={i} className="flex gap-2.5">
                          <span className="text-emerald-600 font-bold text-sm flex-shrink-0 mt-0.5">{i + 1}.</span>
                          <p className="text-sm text-slate-700 leading-relaxed">{q}</p>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => navigator.clipboard.writeText(selectedCandidate.interviewQuestions.join("\n\n"))}
                      className="mt-4 text-xs bg-emerald-100 text-emerald-700 px-4 py-2 rounded-lg font-medium hover:bg-emerald-200 transition-colors"
                    >
                      Copy Questions
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* CTA */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-8 text-center text-white mt-8">
          <h2 className="text-2xl font-bold mb-2">Want AI-powered hiring?</h2>
          <p className="text-emerald-100 mb-6">Screen hundreds of candidates in minutes with advanced AI matching, bias detection, and automated interview scheduling.</p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/products/ai-hiring-assistant" className="inline-block bg-white text-emerald-700 font-semibold px-8 py-3 rounded-lg hover:bg-emerald-50 transition-colors">
              Try Free
            </Link>
            <Link href="/products/ai-hiring-assistant#pricing" className="inline-block bg-white/10 text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/20 transition-colors border border-white/20">
              View Pricing
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
