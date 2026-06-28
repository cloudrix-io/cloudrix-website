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

const sampleResume = `John Mitchell
Senior Software Engineer

EXPERIENCE:
TechCorp Inc. — Senior Developer (2020 - Present)
- Led development of React/TypeScript frontend serving 2M+ users
- Built RESTful APIs using Node.js and Express
- Managed PostgreSQL databases and wrote complex queries
- Implemented CI/CD pipelines using GitHub Actions
- Deployed applications on AWS (EC2, S3, Lambda, RDS)
- Worked in agile sprints with 2-week cadences

DevStudio — Full-Stack Developer (2017 - 2020)
- Developed web applications using React, Vue.js, and Angular
- Built backend services with Node.js and Python
- Containerized applications using Docker
- Implemented GraphQL APIs alongside REST endpoints

EDUCATION:
B.Sc. Computer Science — University of California, Berkeley (2017)

SKILLS:
React, TypeScript, JavaScript, Node.js, Python, PostgreSQL, MongoDB,
AWS (EC2, S3, Lambda, RDS), Docker, Git, GitHub Actions, REST APIs,
GraphQL, Redis, Agile/Scrum, Next.js

CERTIFICATIONS:
- AWS Certified Solutions Architect — Associate
- Google Cloud Professional Developer`;

interface AnalysisResult {
  overallScore: number;
  skillsMatch: { score: number; matched: string[]; missing: string[] };
  experienceMatch: { score: number; details: string };
  educationMatch: { score: number; details: string };
  cultureFit: { score: number; details: string };
  summary: string;
}

function analyzeMatch(jd: string, resume: string): AnalysisResult {
  const jdLower = jd.toLowerCase();
  const resumeLower = resume.toLowerCase();

  const skills = [
    "react", "typescript", "node.js", "postgresql", "aws", "docker",
    "kubernetes", "rest", "graphql", "agile", "ci/cd", "next.js",
    "microservices", "redis", "javascript", "python", "gcp", "azure",
    "communication", "teamwork",
  ];

  const matched: string[] = [];
  const missing: string[] = [];

  for (const skill of skills) {
    if (jdLower.includes(skill)) {
      if (resumeLower.includes(skill)) matched.push(skill);
      else missing.push(skill);
    }
  }

  const skillsScore = skills.filter(s => jdLower.includes(s)).length > 0
    ? Math.round((matched.length / skills.filter(s => jdLower.includes(s)).length) * 100)
    : 50;

  // Experience
  const yearMatch = resumeLower.match(/(\d+)\+?\s*years?/);
  const jdYearMatch = jdLower.match(/(\d+)\+?\s*years?/);
  let expScore = 70;
  let expDetail = "Experience level appears adequate.";
  if (yearMatch && jdYearMatch) {
    const resumeYears = parseInt(yearMatch[1]);
    const reqYears = parseInt(jdYearMatch[1]);
    if (resumeYears >= reqYears) {
      expScore = 95;
      expDetail = `Candidate has ${resumeYears}+ years (requires ${reqYears}+). Exceeds requirements.`;
    } else {
      expScore = Math.round((resumeYears / reqYears) * 80);
      expDetail = `Candidate has ${resumeYears} years (requires ${reqYears}+). Below requirements.`;
    }
  }
  // Check for seniority keywords
  if (resumeLower.includes("senior") || resumeLower.includes("lead") || resumeLower.includes("principal")) {
    expScore = Math.min(expScore + 10, 100);
    expDetail += " Senior-level experience detected.";
  }

  // Education
  let eduScore = 60;
  let eduDetail = "Education information limited.";
  if (resumeLower.includes("computer science") || resumeLower.includes("software engineering")) {
    eduScore = 90;
    eduDetail = "Relevant CS/SE degree found.";
  }
  if (resumeLower.includes("master") || resumeLower.includes("m.sc") || resumeLower.includes("m.s.")) {
    eduScore = 95;
    eduDetail = "Advanced degree in relevant field.";
  }
  if (resumeLower.includes("certif")) {
    eduScore = Math.min(eduScore + 5, 100);
    eduDetail += " Professional certifications detected.";
  }

  // Culture fit heuristics
  let cultureScore = 65;
  let cultureDetail = "Basic culture indicators present.";
  const cultureKeywords = ["agile", "scrum", "teamwork", "communication", "collaboration", "open-source", "mentor"];
  const cultureMatches = cultureKeywords.filter(k => resumeLower.includes(k));
  if (cultureMatches.length >= 3) { cultureScore = 90; cultureDetail = "Strong alignment with collaborative work culture."; }
  else if (cultureMatches.length >= 1) { cultureScore = 75; cultureDetail = "Some indicators of collaborative mindset."; }

  const overallScore = Math.round(skillsScore * 0.4 + expScore * 0.3 + eduScore * 0.15 + cultureScore * 0.15);

  let summary = "";
  if (overallScore >= 85) summary = "Excellent match. This candidate strongly aligns with the job requirements and should be prioritized for interview.";
  else if (overallScore >= 70) summary = "Good match. The candidate meets most requirements with some gaps that could be explored during the interview.";
  else if (overallScore >= 50) summary = "Partial match. The candidate has relevant experience but is missing key skills. Consider for a phone screen.";
  else summary = "Weak match. Significant gaps exist between the candidate's profile and the job requirements.";

  return {
    overallScore,
    skillsMatch: { score: skillsScore, matched, missing },
    experienceMatch: { score: expScore, details: expDetail },
    educationMatch: { score: eduScore, details: eduDetail },
    cultureFit: { score: cultureScore, details: cultureDetail },
    summary,
  };
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
      <div className="w-full bg-slate-100 rounded-full h-3">
        <div className={`${color} h-full rounded-full transition-all duration-700`} style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}

export default function HireAIDemo() {
  const [jobDescription, setJobDescription] = useState(sampleJD);
  const [resume, setResume] = useState(sampleResume);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const handleAnalyze = () => {
    if (!jobDescription.trim() || !resume.trim()) return;
    setAnalyzing(true);
    setResult(null);
    setTimeout(() => {
      setResult(analyzeMatch(jobDescription, resume));
      setAnalyzing(false);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/products/ai-hiring-assistant" className="text-emerald-200 hover:text-white text-sm mb-2 inline-block">&larr; Back to HireAI</Link>
          <h1 className="text-3xl font-bold">HireAI Candidate Screening</h1>
          <p className="text-emerald-100 mt-1">AI-powered resume analysis and candidate matching</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Job Description</label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={16}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-sm resize-none bg-white"
              placeholder="Paste job description here..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Resume / CV</label>
            <textarea
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              rows={16}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-sm resize-none bg-white"
              placeholder="Paste resume/CV here..."
            />
          </div>
        </div>

        <div className="text-center mb-8">
          <button
            onClick={handleAnalyze}
            disabled={analyzing || !jobDescription.trim() || !resume.trim()}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold px-10 py-3 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-200"
          >
            {analyzing ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                Analyzing Match...
              </span>
            ) : "Analyze Match"}
          </button>
        </div>

        {result && (
          <div className="space-y-6 animate-in fade-in">
            {/* Overall Score */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center">
              <p className="text-sm text-slate-500 mb-2">Overall Match Score</p>
              <div className="relative inline-flex items-center justify-center">
                <svg className="w-36 h-36" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="52" fill="none" stroke="#e2e8f0" strokeWidth="10" />
                  <circle
                    cx="60" cy="60" r="52" fill="none"
                    stroke={result.overallScore >= 80 ? "#22c55e" : result.overallScore >= 60 ? "#eab308" : "#ef4444"}
                    strokeWidth="10" strokeLinecap="round"
                    strokeDasharray={`${(result.overallScore / 100) * 327} 327`}
                    transform="rotate(-90 60 60)"
                  />
                </svg>
                <span className="absolute text-3xl font-bold text-slate-800">{result.overallScore}%</span>
              </div>
              <p className="text-slate-600 mt-4 max-w-lg mx-auto">{result.summary}</p>
            </div>

            {/* Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h3 className="font-semibold text-slate-800 mb-4">Score Breakdown</h3>
                <div className="space-y-4">
                  <ScoreBar score={result.skillsMatch.score} label="Skills Match (40%)" />
                  <ScoreBar score={result.experienceMatch.score} label="Experience (30%)" />
                  <ScoreBar score={result.educationMatch.score} label="Education (15%)" />
                  <ScoreBar score={result.cultureFit.score} label="Culture Fit (15%)" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h3 className="font-semibold text-slate-800 mb-4">Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="bg-slate-50 rounded-lg p-3">
                    <p className="font-medium text-slate-700">Experience</p>
                    <p className="text-slate-600">{result.experienceMatch.details}</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3">
                    <p className="font-medium text-slate-700">Education</p>
                    <p className="text-slate-600">{result.educationMatch.details}</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3">
                    <p className="font-medium text-slate-700">Culture Fit</p>
                    <p className="text-slate-600">{result.cultureFit.details}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-800 mb-4">Skills Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-medium text-green-700 mb-2">Matched Skills ({result.skillsMatch.matched.length})</p>
                  <div className="flex flex-wrap gap-2">
                    {result.skillsMatch.matched.map((s) => (
                      <span key={s} className="bg-green-100 text-green-700 text-xs px-3 py-1.5 rounded-full font-medium">{s}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-red-700 mb-2">Missing Skills ({result.skillsMatch.missing.length})</p>
                  <div className="flex flex-wrap gap-2">
                    {result.skillsMatch.missing.length > 0 ? result.skillsMatch.missing.map((s) => (
                      <span key={s} className="bg-red-100 text-red-700 text-xs px-3 py-1.5 rounded-full font-medium">{s}</span>
                    )) : <span className="text-sm text-slate-500">No critical missing skills!</span>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-8 text-center text-white mt-8">
          <h2 className="text-2xl font-bold mb-2">Want AI-powered hiring?</h2>
          <p className="text-emerald-100 mb-6">Screen hundreds of candidates in minutes with advanced AI matching, bias detection, and automated interview scheduling.</p>
          <Link href="/contact" className="inline-block bg-white text-emerald-700 font-semibold px-8 py-3 rounded-lg hover:bg-emerald-50 transition-colors">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
