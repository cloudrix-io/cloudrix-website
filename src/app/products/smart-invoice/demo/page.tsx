"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface ExtractedField {
  label: string;
  value: string;
  confidence: number;
}

interface LineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  confidence: number;
}

const sampleInvoice = {
  vendor: { label: "Vendor", value: "TechSupply International B.V.", confidence: 98 },
  invoiceNumber: { label: "Invoice Number", value: "INV-2026-00847", confidence: 99 },
  date: { label: "Invoice Date", value: "June 15, 2026", confidence: 97 },
  dueDate: { label: "Due Date", value: "July 15, 2026", confidence: 96 },
  poNumber: { label: "PO Number", value: "PO-2026-1234", confidence: 94 },
  currency: { label: "Currency", value: "EUR", confidence: 99 },
  subtotal: { label: "Subtotal", value: "\u20ac12,450.00", confidence: 98 },
  tax: { label: "VAT (21%)", value: "\u20ac2,614.50", confidence: 97 },
  total: { label: "Total", value: "\u20ac15,064.50", confidence: 99 },
  paymentTerms: { label: "Payment Terms", value: "Net 30", confidence: 92 },
  bankAccount: { label: "Bank Account", value: "NL91 ABNA 0417 1643 00", confidence: 95 },
};

const lineItems: LineItem[] = [
  { description: "Cloud Server Hosting - Enterprise (Monthly)", quantity: 12, unitPrice: 450.00, total: 5400.00, confidence: 97 },
  { description: "SSL Certificate - Wildcard (Annual)", quantity: 3, unitPrice: 250.00, total: 750.00, confidence: 96 },
  { description: "Managed Database Service - PostgreSQL", quantity: 6, unitPrice: 350.00, total: 2100.00, confidence: 98 },
  { description: "CDN Bandwidth - 10TB Package", quantity: 2, unitPrice: 800.00, total: 1600.00, confidence: 95 },
  { description: "Technical Support - Premium (Monthly)", quantity: 12, unitPrice: 200.00, total: 2400.00, confidence: 97 },
  { description: "Domain Registration (Annual)", quantity: 5, unitPrice: 40.00, total: 200.00, confidence: 99 },
];

function ConfidenceBadge({ score }: { score: number }) {
  const color = score >= 95 ? "bg-green-100 text-green-700" : score >= 85 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700";
  return <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${color}`}>{score}%</span>;
}

export default function SmartInvoiceDemo() {
  const [stage, setStage] = useState<"upload" | "processing" | "result">("upload");
  const [processStep, setProcessStep] = useState(0);
  const [exported, setExported] = useState<string | null>(null);

  const steps = [
    "Scanning document...",
    "Detecting text regions...",
    "Extracting vendor information...",
    "Reading line items...",
    "Calculating totals...",
    "Validating data...",
    "Complete!",
  ];

  const handleProcess = () => {
    setStage("processing");
    setProcessStep(0);
  };

  useEffect(() => {
    if (stage === "processing" && processStep < steps.length - 1) {
      const timer = setTimeout(() => setProcessStep((s) => s + 1), 600);
      return () => clearTimeout(timer);
    }
    if (stage === "processing" && processStep === steps.length - 1) {
      const timer = setTimeout(() => setStage("result"), 500);
      return () => clearTimeout(timer);
    }
  }, [stage, processStep, steps.length]);

  const handleExport = (format: "json" | "csv") => {
    if (format === "json") {
      const jsonData = {
        vendor: sampleInvoice.vendor.value,
        invoiceNumber: sampleInvoice.invoiceNumber.value,
        date: sampleInvoice.date.value,
        dueDate: sampleInvoice.dueDate.value,
        subtotal: sampleInvoice.subtotal.value,
        tax: sampleInvoice.tax.value,
        total: sampleInvoice.total.value,
        lineItems: lineItems.map((li) => ({
          description: li.description,
          quantity: li.quantity,
          unitPrice: li.unitPrice,
          total: li.total,
        })),
      };
      navigator.clipboard.writeText(JSON.stringify(jsonData, null, 2));
    } else {
      const csv = [
        "Description,Quantity,Unit Price,Total",
        ...lineItems.map((li) => `"${li.description}",${li.quantity},${li.unitPrice.toFixed(2)},${li.total.toFixed(2)}`),
      ].join("\n");
      navigator.clipboard.writeText(csv);
    }
    setExported(format.toUpperCase());
    setTimeout(() => setExported(null), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-r from-teal-600 to-emerald-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/products/smart-invoice" className="text-teal-200 hover:text-white text-sm mb-2 inline-block">&larr; Back to InvoiceAI</Link>
          <h1 className="text-3xl font-bold">InvoiceAI Processing Demo</h1>
          <p className="text-teal-100 mt-1">Automated invoice data extraction with AI confidence scoring</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Upload Stage */}
        {stage === "upload" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
              <h2 className="text-lg font-semibold text-slate-800 mb-6 text-center">Sample Invoice</h2>
              {/* Simulated Invoice Card */}
              <div className="max-w-lg mx-auto bg-slate-50 border border-slate-200 rounded-xl p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-lg mb-2">TS</div>
                    <p className="text-sm font-semibold text-slate-800">TechSupply International B.V.</p>
                    <p className="text-xs text-slate-500">Keizersgracht 123, Amsterdam</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-slate-800">INVOICE</p>
                    <p className="text-sm text-slate-500">INV-2026-00847</p>
                    <p className="text-xs text-slate-400">June 15, 2026</p>
                  </div>
                </div>
                <div className="border-t border-slate-200 pt-4 mb-4">
                  <div className="grid grid-cols-3 text-xs font-medium text-slate-500 mb-2">
                    <span>Description</span>
                    <span className="text-center">Qty</span>
                    <span className="text-right">Amount</span>
                  </div>
                  {lineItems.slice(0, 4).map((li, i) => (
                    <div key={i} className="grid grid-cols-3 text-xs text-slate-700 py-1">
                      <span className="truncate pr-2">{li.description}</span>
                      <span className="text-center">{li.quantity}</span>
                      <span className="text-right">{"\u20ac"}{li.total.toLocaleString("en", { minimumFractionDigits: 2 })}</span>
                    </div>
                  ))}
                  <p className="text-xs text-slate-400 py-1">... and {lineItems.length - 4} more items</p>
                </div>
                <div className="border-t border-slate-200 pt-3 space-y-1 text-right">
                  <p className="text-xs text-slate-500">Subtotal: {"\u20ac"}12,450.00</p>
                  <p className="text-xs text-slate-500">VAT (21%): {"\u20ac"}2,614.50</p>
                  <p className="text-lg font-bold text-slate-800">Total: {"\u20ac"}15,064.50</p>
                </div>
              </div>

              <div className="text-center mt-8">
                <button
                  onClick={handleProcess}
                  className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-semibold px-10 py-3 rounded-xl hover:from-teal-700 hover:to-emerald-700 transition-all shadow-lg shadow-teal-200"
                >
                  Process Invoice
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Processing Stage */}
        {stage === "processing" && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <h2 className="text-lg font-semibold text-slate-800 mb-6 text-center">Processing Invoice...</h2>
            <div className="max-w-md mx-auto space-y-3">
              {steps.map((step, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300 ${
                    i < processStep ? "bg-green-500 text-white" :
                    i === processStep ? "bg-teal-500 text-white animate-pulse" :
                    "bg-slate-200 text-slate-400"
                  }`}>
                    {i < processStep ? "\u2713" : i + 1}
                  </div>
                  <span className={`text-sm transition-colors ${
                    i <= processStep ? "text-slate-800" : "text-slate-400"
                  }`}>{step}</span>
                </div>
              ))}
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 mt-8">
              <div
                className="bg-gradient-to-r from-teal-500 to-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${((processStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Result Stage */}
        {stage === "result" && (
          <div className="space-y-6">
            {/* Extracted Fields */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-slate-800">Extracted Invoice Data</h2>
                <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">Avg Confidence: 96.7%</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.values(sampleInvoice).map((field) => (
                  <div key={field.label} className="bg-slate-50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-slate-500">{field.label}</span>
                      <ConfidenceBadge score={field.confidence} />
                    </div>
                    <p className="text-sm font-medium text-slate-800">{field.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Line Items */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 pb-3">
                <h2 className="text-lg font-semibold text-slate-800">Line Items</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50 border-y border-slate-200">
                      <th className="text-left px-6 py-3 text-xs font-medium text-slate-500">Description</th>
                      <th className="text-center px-4 py-3 text-xs font-medium text-slate-500">Qty</th>
                      <th className="text-right px-4 py-3 text-xs font-medium text-slate-500">Unit Price</th>
                      <th className="text-right px-4 py-3 text-xs font-medium text-slate-500">Total</th>
                      <th className="text-center px-4 py-3 text-xs font-medium text-slate-500">Confidence</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lineItems.map((li, i) => (
                      <tr key={i} className="border-b border-slate-100">
                        <td className="px-6 py-3 text-sm text-slate-700">{li.description}</td>
                        <td className="px-4 py-3 text-sm text-slate-700 text-center">{li.quantity}</td>
                        <td className="px-4 py-3 text-sm text-slate-700 text-right">{"\u20ac"}{li.unitPrice.toFixed(2)}</td>
                        <td className="px-4 py-3 text-sm font-medium text-slate-800 text-right">{"\u20ac"}{li.total.toLocaleString("en", { minimumFractionDigits: 2 })}</td>
                        <td className="px-4 py-3 text-center"><ConfidenceBadge score={li.confidence} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Export */}
            <div className="flex items-center justify-between bg-white rounded-xl shadow-sm border border-slate-200 p-4">
              <span className="text-sm text-slate-600">Export extracted data:</span>
              <div className="flex gap-3">
                <button
                  onClick={() => handleExport("json")}
                  className="text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  {exported === "JSON" ? "Copied!" : "Copy as JSON"}
                </button>
                <button
                  onClick={() => handleExport("csv")}
                  className="text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  {exported === "CSV" ? "Copied!" : "Copy as CSV"}
                </button>
                <button
                  onClick={() => { setStage("upload"); setExported(null); }}
                  className="text-sm bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Process Another
                </button>
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="bg-gradient-to-r from-teal-600 to-emerald-700 rounded-2xl p-8 text-center text-white mt-8">
          <h2 className="text-2xl font-bold mb-2">Automate invoice processing</h2>
          <p className="text-teal-100 mb-6">Process thousands of invoices per hour with 99%+ accuracy. Integrate with your ERP, accounting software, and AP workflow.</p>
          <Link href="/contact" className="inline-block bg-white text-teal-700 font-semibold px-8 py-3 rounded-lg hover:bg-teal-50 transition-colors">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
