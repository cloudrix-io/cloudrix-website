"use client";

import { useState } from "react";
import { Shield, ArrowRight, ArrowLeft, AlertTriangle, CheckCircle, XCircle, AlertCircle, FileCheck } from "lucide-react";

interface FormData {
  description: string;
  primaryFunction: string;
  affectedParties: string;
  humanOversight: string;
  biometricData: boolean;
  lawEnforcement: boolean;
}

interface RiskResult {
  level: "UNACCEPTABLE RISK" | "HIGH RISK" | "LIMITED RISK" | "MINIMAL RISK";
  color: string;
  bgColor: string;
  borderColor: string;
  icon: React.ReactNode;
  explanation: string;
  obligations: string[];
  nextSteps: string[];
}

const INITIAL_FORM: FormData = {
  description: "",
  primaryFunction: "",
  affectedParties: "",
  humanOversight: "",
  biometricData: false,
  lawEnforcement: false,
};

const PRIMARY_FUNCTIONS = [
  { value: "decision-making", label: "Decision-making about people (hiring, credit, insurance)" },
  { value: "content-generation", label: "Content generation (text, image, video)" },
  { value: "customer-service", label: "Customer service (chatbot, voice agent)" },
  { value: "data-analysis", label: "Data analysis & insights" },
  { value: "biometric-id", label: "Biometric identification" },
  { value: "critical-infra", label: "Critical infrastructure management" },
  { value: "education", label: "Education & training assessment" },
  { value: "other", label: "Other" },
];

const AFFECTED_PARTIES = [
  { value: "internal", label: "Internal employees only" },
  { value: "b2b", label: "B2B customers/partners" },
  { value: "public", label: "General public / consumers" },
  { value: "vulnerable", label: "Vulnerable populations (children, elderly, patients)" },
];

const HUMAN_OVERSIGHT = [
  { value: "autonomous", label: "Fully autonomous decisions" },
  { value: "human-reviews", label: "Human reviews AI recommendations" },
  { value: "human-decides", label: "Human makes final decision, AI assists" },
  { value: "info-only", label: "AI only provides information, no recommendations" },
];

function classifyRisk(data: FormData): RiskResult {
  // Unacceptable risk
  if (data.biometricData && data.lawEnforcement) {
    return {
      level: "UNACCEPTABLE RISK",
      color: "text-red-700",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      icon: <XCircle className="w-8 h-8 text-red-600" />,
      explanation:
        "Your AI system falls under the UNACCEPTABLE RISK category of the EU AI Act. Systems combining biometric identification with law enforcement applications are prohibited under Article 5. This type of AI system must be discontinued within the EU market.",
      obligations: [
        "Immediate discontinuation of the AI system in EU markets",
        "No exceptions — this category has an absolute prohibition",
        "Potential fines of up to \u20ac35 million or 7% of global annual turnover",
        "Review all related AI systems for similar classifications",
      ],
      nextSteps: [
        "Conduct an immediate audit of all AI systems with biometric capabilities",
        "Consult with legal counsel specializing in EU AI regulation",
        "Explore alternative approaches that do not combine biometric data with law enforcement",
        "Document your compliance efforts for regulatory authorities",
      ],
    };
  }

  // High risk checks
  if (
    (data.primaryFunction === "decision-making" &&
      (data.affectedParties === "public" || data.affectedParties === "vulnerable")) ||
    data.primaryFunction === "biometric-id" ||
    data.primaryFunction === "critical-infra" ||
    (data.humanOversight === "autonomous" && data.affectedParties === "public")
  ) {
    return {
      level: "HIGH RISK",
      color: "text-orange-700",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      icon: <AlertTriangle className="w-8 h-8 text-orange-600" />,
      explanation:
        "Your AI system is classified as HIGH RISK under the EU AI Act. This means it is permitted but subject to strict regulatory requirements. You must complete a full conformity assessment before deploying or continuing to operate this system in the EU.",
      obligations: [
        "Conduct a full conformity assessment (Annex VI/VII procedures)",
        "Implement a comprehensive risk management system",
        "Ensure training data quality, relevance, and representativeness",
        "Maintain detailed technical documentation",
        "Implement logging and traceability capabilities",
        "Provide clear information to deployers about system capabilities and limitations",
        "Ensure appropriate human oversight mechanisms",
        "Meet accuracy, robustness, and cybersecurity requirements",
      ],
      nextSteps: [
        "Engage a notified body for conformity assessment (if required for your category)",
        "Begin documenting your AI system\u2019s design, development, and testing processes",
        "Implement or strengthen human oversight mechanisms",
        "Set up a post-market monitoring system",
      ],
    };
  }

  // Limited risk
  if (
    data.primaryFunction === "content-generation" ||
    data.primaryFunction === "customer-service"
  ) {
    return {
      level: "LIMITED RISK",
      color: "text-yellow-700",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      icon: <AlertCircle className="w-8 h-8 text-yellow-600" />,
      explanation:
        "Your AI system falls under the LIMITED RISK category. This means you have specific transparency obligations — users must be informed they are interacting with an AI system, and AI-generated content must be labeled as such.",
      obligations: [
        "Clearly disclose to users that they are interacting with an AI system",
        "Label AI-generated or manipulated content (text, image, audio, video)",
        "Ensure transparency about the system\u2019s capabilities and limitations",
        "Maintain records of AI-generated content where applicable",
      ],
      nextSteps: [
        "Audit your user-facing interfaces for proper AI disclosure",
        "Implement watermarking or labeling for AI-generated content",
        "Update terms of service and privacy policies",
        "Train your team on transparency requirements",
      ],
    };
  }

  // Minimal risk
  return {
    level: "MINIMAL RISK",
    color: "text-green-700",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    icon: <CheckCircle className="w-8 h-8 text-green-600" />,
    explanation:
      "Your AI system is classified as MINIMAL RISK under the EU AI Act. There are no specific regulatory obligations for this category. However, we recommend following AI ethics best practices and voluntarily adopting a code of conduct.",
    obligations: [
      "No specific regulatory obligations under the EU AI Act",
      "Voluntary adoption of codes of conduct is encouraged",
      "General data protection (GDPR) requirements still apply",
      "Follow industry best practices for responsible AI development",
    ],
    nextSteps: [
      "Consider voluntarily adopting an AI code of conduct",
      "Monitor regulatory developments — classifications may change",
      "Document your AI practices for future compliance needs",
      "Stay informed about sector-specific AI regulations",
    ],
  };
}

export function EuAiActScanner() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep1 = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.description.trim()) newErrors.description = "Please describe your AI system";
    if (!formData.primaryFunction) newErrors.primaryFunction = "Please select a primary function";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.affectedParties) newErrors.affectedParties = "Please select who is affected";
    if (!formData.humanOversight) newErrors.humanOversight = "Please select an oversight level";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
  };

  const result = step === 3 ? classifyRisk(formData) : null;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xl">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 px-6 py-8 text-center">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">EU AI Act Compliance Scanner</h2>
        <p className="text-indigo-200">
          Find out your AI system&apos;s risk classification in 2 minutes
        </p>
      </div>

      {/* Progress Bar */}
      <div className="px-6 pt-6">
        <div className="flex items-center justify-between mb-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                  s <= step
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {s}
              </div>
              <span
                className={`text-sm font-medium hidden sm:inline ${
                  s <= step ? "text-indigo-600" : "text-gray-400"
                }`}
              >
                {s === 1 ? "Describe" : s === 2 ? "Details" : "Results"}
              </span>
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-6">
          <div
            className="bg-indigo-600 h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${((step) / 3) * 100}%` }}
          />
        </div>
      </div>

      <div className="p-6 pt-0">
        {/* Step 1 */}
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What does your AI system do? <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe what your AI system does, who uses it, and what decisions or outputs it produces..."
                rows={4}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none ${
                  errors.description ? "border-red-400" : "border-gray-300"
                }`}
              />
              {errors.description && (
                <p className="text-sm text-red-500 mt-1">{errors.description}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary function <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.primaryFunction}
                onChange={(e) => setFormData({ ...formData, primaryFunction: e.target.value })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white ${
                  errors.primaryFunction ? "border-red-400" : "border-gray-300"
                }`}
              >
                <option value="">Select a primary function...</option>
                {PRIMARY_FUNCTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {errors.primaryFunction && (
                <p className="text-sm text-red-500 mt-1">{errors.primaryFunction}</p>
              )}
            </div>

            <button
              onClick={handleNext}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium flex items-center justify-center gap-2"
            >
              Continue
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Who does this AI system affect? <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.affectedParties}
                onChange={(e) => setFormData({ ...formData, affectedParties: e.target.value })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white ${
                  errors.affectedParties ? "border-red-400" : "border-gray-300"
                }`}
              >
                <option value="">Select affected parties...</option>
                {AFFECTED_PARTIES.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {errors.affectedParties && (
                <p className="text-sm text-red-500 mt-1">{errors.affectedParties}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Is there human oversight? <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.humanOversight}
                onChange={(e) => setFormData({ ...formData, humanOversight: e.target.value })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white ${
                  errors.humanOversight ? "border-red-400" : "border-gray-300"
                }`}
              >
                <option value="">Select oversight level...</option>
                {HUMAN_OVERSIGHT.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {errors.humanOversight && (
                <p className="text-sm text-red-500 mt-1">{errors.humanOversight}</p>
              )}
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.biometricData}
                  onChange={(e) => setFormData({ ...formData, biometricData: e.target.checked })}
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-700">
                  Does the system process biometric data?
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.lawEnforcement}
                  onChange={(e) => setFormData({ ...formData, lawEnforcement: e.target.checked })}
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-700">
                  Is the system used in law enforcement or border control?
                </span>
              </label>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => { setStep(1); setErrors({}); }}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </button>
              <button
                onClick={handleNext}
                className="flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium flex items-center justify-center gap-2"
              >
                See Results
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Results */}
        {step === 3 && result && (
          <div className="space-y-6">
            {/* Risk Level Badge */}
            <div className={`${result.bgColor} ${result.borderColor} border rounded-xl p-6 text-center`}>
              <div className="flex justify-center mb-3">{result.icon}</div>
              <div className={`text-2xl font-bold ${result.color} mb-2`}>{result.level}</div>
              <p className={`text-sm ${result.color}`}>{result.explanation}</p>
            </div>

            {/* Key Obligations */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-indigo-600" />
                Key Obligations
              </h4>
              <ul className="space-y-2">
                {result.obligations.map((obligation, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-2 flex-shrink-0" />
                    {obligation}
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommended Next Steps */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Recommended Next Steps</h4>
              <ul className="space-y-2">
                {result.nextSteps.map((step, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-indigo-600 font-semibold flex-shrink-0">{i + 1}.</span>
                    {step}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTAs */}
            <div className="border-t border-gray-200 pt-6 space-y-3">
              <a
                href="/contact?type=ai-act"
                className="block w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium text-center"
              >
                Get Professional Assessment — &euro;2,500
              </a>
              <a
                href="/ai-tools"
                className="block w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium text-center"
              >
                Download Full EU AI Act Checklist
              </a>
              <button
                onClick={() => { setStep(1); setFormData(INITIAL_FORM); setErrors({}); }}
                className="w-full text-sm text-gray-500 hover:text-gray-700 transition-colors py-2"
              >
                Start Over
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
