"use client";

import { useState } from "react";
import { Calculator, TrendingDown, Clock, Users, Euro, ArrowRight, CheckCircle, AlertTriangle } from "lucide-react";

interface CalculatorInputs {
  teamSize: number;
  avgSalary: number;
  deployFrequency: string;
  downtimeHours: number;
  technicalDebtPercent: number;
}

interface CalculatorResults {
  annualWaste: number;
  downtimeCost: number;
  productivityLoss: number;
  opportunityCost: number;
  potentialSavings: number;
}

export function ROICalculator() {
  const [step, setStep] = useState(1);
  const [inputs, setInputs] = useState<CalculatorInputs>({
    teamSize: 5,
    avgSalary: 75000,
    deployFrequency: "weekly",
    downtimeHours: 4,
    technicalDebtPercent: 30,
  });
  const [results, setResults] = useState<CalculatorResults | null>(null);
  const [email, setEmail] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculateROI = () => {
    const hourlyRate = inputs.avgSalary / 2080; // Annual salary / work hours

    // Technical debt time waste (% of time on maintenance vs features)
    const techDebtHoursPerYear = (inputs.technicalDebtPercent / 100) * 2080 * inputs.teamSize;
    const productivityLoss = techDebtHoursPerYear * hourlyRate;

    // Downtime cost (assuming revenue loss + engineering time)
    const monthlyDowntimeHours = inputs.downtimeHours;
    const annualDowntimeHours = monthlyDowntimeHours * 12;
    const downtimeCost = annualDowntimeHours * hourlyRate * inputs.teamSize * 1.5; // 1.5x multiplier for urgency

    // Slow deployment opportunity cost
    const deployMultiplier = inputs.deployFrequency === "monthly" ? 4 :
                             inputs.deployFrequency === "weekly" ? 2 : 1;
    const opportunityCost = deployMultiplier * 15000; // Estimated feature delay cost

    const annualWaste = productivityLoss + downtimeCost + opportunityCost;

    // Potential savings (typically 40-60% improvement)
    const potentialSavings = annualWaste * 0.5;

    setResults({
      annualWaste: Math.round(annualWaste),
      downtimeCost: Math.round(downtimeCost),
      productivityLoss: Math.round(productivityLoss),
      opportunityCost: Math.round(opportunityCost),
      potentialSavings: Math.round(potentialSavings),
    });
  };

  const handleSubmitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    calculateROI();
    setShowResults(true);
    setIsSubmitting(false);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xl">
      {/* Header */}
      <div className="bg-gradient-to-br from-red-600 to-orange-600 px-6 py-8 text-center">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Calculator className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">
          How Much Is Bad Software Costing You?
        </h2>
        <p className="text-red-100">
          Most companies underestimate by 3-5x. Let's find your real number.
        </p>
      </div>

      <div className="p-6">
        {!showResults ? (
          <>
            {/* Step 1: Input Questions */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Users className="w-4 h-4 inline mr-2" />
                    Engineering Team Size
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={inputs.teamSize}
                    onChange={(e) => setInputs({ ...inputs, teamSize: parseInt(e.target.value) })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>1</span>
                    <span className="font-bold text-blue-600">{inputs.teamSize} engineers</span>
                    <span>50+</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Euro className="w-4 h-4 inline mr-2" />
                    Average Developer Salary (EUR/year)
                  </label>
                  <input
                    type="range"
                    min="40000"
                    max="150000"
                    step="5000"
                    value={inputs.avgSalary}
                    onChange={(e) => setInputs({ ...inputs, avgSalary: parseInt(e.target.value) })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>€40K</span>
                    <span className="font-bold text-blue-600">{formatCurrency(inputs.avgSalary)}</span>
                    <span>€150K</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Clock className="w-4 h-4 inline mr-2" />
                    How often do you deploy to production?
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: "daily", label: "Daily" },
                      { value: "weekly", label: "Weekly" },
                      { value: "monthly", label: "Monthly" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setInputs({ ...inputs, deployFrequency: option.value })}
                        className={`p-3 rounded-lg text-sm font-medium transition-all ${
                          inputs.deployFrequency === option.value
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  Continue
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Step 2: More Questions */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <TrendingDown className="w-4 h-4 inline mr-2" />
                    Monthly downtime/incident hours
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="40"
                    value={inputs.downtimeHours}
                    onChange={(e) => setInputs({ ...inputs, downtimeHours: parseInt(e.target.value) })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>0</span>
                    <span className="font-bold text-red-600">{inputs.downtimeHours} hours/month</span>
                    <span>40+</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <AlertTriangle className="w-4 h-4 inline mr-2" />
                    % of time spent on bugs/maintenance vs new features
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="80"
                    value={inputs.technicalDebtPercent}
                    onChange={(e) => setInputs({ ...inputs, technicalDebtPercent: parseInt(e.target.value) })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>10%</span>
                    <span className="font-bold text-orange-600">{inputs.technicalDebtPercent}% on maintenance</span>
                    <span>80%</span>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Industry benchmark:</strong> High-performing teams spend less than 20% on maintenance.
                    The average is 40%.
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    See My Results
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Email Gate */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calculator className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Your Results Are Ready!
                  </h3>
                  <p className="text-gray-600">
                    Enter your email to see your personalized cost analysis
                  </p>
                </div>

                <form onSubmit={handleSubmitEmail}>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none mb-4"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
                  >
                    {isSubmitting ? "Calculating..." : "Reveal My True Cost"}
                  </button>
                </form>

                <p className="text-xs text-gray-500 text-center">
                  We'll also send you a detailed PDF report. No spam, ever.
                </p>
              </div>
            )}
          </>
        ) : (
          /* Results Display */
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Your Annual Software Cost Leak
              </h3>
              <div className="text-5xl font-bold text-red-600 mb-2">
                {formatCurrency(results!.annualWaste)}
              </div>
              <p className="text-gray-600">
                That's {formatCurrency(results!.annualWaste / 12)}/month going down the drain
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                  <span className="text-gray-700">Technical Debt Drag</span>
                </div>
                <span className="font-bold text-gray-900">{formatCurrency(results!.productivityLoss)}</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <TrendingDown className="w-5 h-5 text-red-500" />
                  <span className="text-gray-700">Downtime & Incidents</span>
                </div>
                <span className="font-bold text-gray-900">{formatCurrency(results!.downtimeCost)}</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <span className="text-gray-700">Slow Delivery Cost</span>
                </div>
                <span className="font-bold text-gray-900">{formatCurrency(results!.opportunityCost)}</span>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <div className="flex items-center justify-center gap-2 text-green-700 font-semibold mb-2">
                <CheckCircle className="w-5 h-5" />
                Potential Annual Savings
              </div>
              <div className="text-3xl font-bold text-green-600">
                {formatCurrency(results!.potentialSavings)}
              </div>
              <p className="text-sm text-green-700 mt-2">
                Based on 50% improvement (industry average with proper engineering)
              </p>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <p className="text-center text-gray-600 mb-4">
                Want to know exactly how to capture these savings?
              </p>
              <a
                href="/contact"
                className="block w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-center"
              >
                Get Your Free Recovery Plan
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
