"use client";

import { useState } from "react";
import Link from "next/link";

type Language = "en" | "nl" | "de" | "fr" | "es" | "ar" | "ja" | "zh";

const languageNames: Record<Language, string> = {
  en: "English",
  nl: "Dutch",
  de: "German",
  fr: "French",
  es: "Spanish",
  ar: "Arabic",
  ja: "Japanese",
  zh: "Chinese",
};

const sampleTexts: Record<string, Record<Language, string>> = {
  business: {
    en: "We are pleased to announce our new partnership with leading technology companies across Europe. This collaboration will enable us to deliver innovative solutions to our global customer base. Our team is committed to providing the highest quality service and support.",
    nl: "Wij zijn verheugd ons nieuwe partnerschap met toonaangevende technologiebedrijven in heel Europa aan te kondigen. Deze samenwerking stelt ons in staat innovatieve oplossingen te leveren aan ons wereldwijde klantenbestand. Ons team zet zich in voor het bieden van service en ondersteuning van de hoogste kwaliteit.",
    de: "Wir freuen uns, unsere neue Partnerschaft mit f\u00fchrenden Technologieunternehmen in ganz Europa bekannt zu geben. Diese Zusammenarbeit wird es uns erm\u00f6glichen, innovative L\u00f6sungen f\u00fcr unseren globalen Kundenstamm bereitzustellen. Unser Team ist bestrebt, Service und Support h\u00f6chster Qualit\u00e4t zu bieten.",
    fr: "Nous sommes heureux d\u2019annoncer notre nouveau partenariat avec des entreprises technologiques de premier plan \u00e0 travers l\u2019Europe. Cette collaboration nous permettra de fournir des solutions innovantes \u00e0 notre client\u00e8le mondiale. Notre \u00e9quipe s\u2019engage \u00e0 offrir un service et un support de la plus haute qualit\u00e9.",
    es: "Nos complace anunciar nuestra nueva asociaci\u00f3n con empresas tecnol\u00f3gicas l\u00edderes en toda Europa. Esta colaboraci\u00f3n nos permitir\u00e1 ofrecer soluciones innovadoras a nuestra base de clientes global. Nuestro equipo est\u00e1 comprometido a proporcionar el servicio y soporte de la m\u00e1s alta calidad.",
    ar: "\u064a\u0633\u0631\u0651\u0646\u0627 \u0627\u0644\u0625\u0639\u0644\u0627\u0646 \u0639\u0646 \u0634\u0631\u0627\u0643\u062a\u0646\u0627 \u0627\u0644\u062c\u062f\u064a\u062f\u0629 \u0645\u0639 \u0634\u0631\u0643\u0627\u062a \u0627\u0644\u062a\u0643\u0646\u0648\u0644\u0648\u062c\u064a\u0627 \u0627\u0644\u0631\u0627\u0626\u062f\u0629 \u0641\u064a \u062c\u0645\u064a\u0639 \u0623\u0646\u062d\u0627\u0621 \u0623\u0648\u0631\u0648\u0628\u0627. \u0633\u062a\u0645\u0643\u0651\u0646\u0646\u0627 \u0647\u0630\u0647 \u0627\u0644\u062a\u0639\u0627\u0648\u0646 \u0645\u0646 \u062a\u0642\u062f\u064a\u0645 \u062d\u0644\u0648\u0644 \u0645\u0628\u062a\u0643\u0631\u0629 \u0644\u0642\u0627\u0639\u062f\u0629 \u0639\u0645\u0644\u0627\u0626\u0646\u0627 \u0627\u0644\u0639\u0627\u0644\u0645\u064a\u0629. \u0641\u0631\u064a\u0642\u0646\u0627 \u0645\u0644\u062a\u0632\u0645 \u0628\u062a\u0642\u062f\u064a\u0645 \u0623\u0639\u0644\u0649 \u0645\u0633\u062a\u0648\u064a\u0627\u062a \u0627\u0644\u062c\u0648\u062f\u0629 \u0641\u064a \u0627\u0644\u062e\u062f\u0645\u0629 \u0648\u0627\u0644\u062f\u0639\u0645.",
    ja: "\u30e8\u30fc\u30ed\u30c3\u30d1\u5168\u57df\u306e\u4e3b\u8981\u30c6\u30af\u30ce\u30ed\u30b8\u30fc\u4f01\u696d\u3068\u306e\u65b0\u305f\u306a\u30d1\u30fc\u30c8\u30ca\u30fc\u30b7\u30c3\u30d7\u3092\u767a\u8868\u3067\u304d\u308b\u3053\u3068\u3092\u5b09\u3057\u304f\u601d\u3044\u307e\u3059\u3002\u3053\u306e\u5354\u529b\u306b\u3088\u308a\u3001\u30b0\u30ed\u30fc\u30d0\u30eb\u306a\u304a\u5ba2\u69d8\u306b\u9769\u65b0\u7684\u306a\u30bd\u30ea\u30e5\u30fc\u30b7\u30e7\u30f3\u3092\u63d0\u4f9b\u3067\u304d\u308b\u3088\u3046\u306b\u306a\u308a\u307e\u3059\u3002\u79c1\u305f\u3061\u306e\u30c1\u30fc\u30e0\u306f\u3001\u6700\u9ad8\u54c1\u8cea\u306e\u30b5\u30fc\u30d3\u30b9\u3068\u30b5\u30dd\u30fc\u30c8\u306e\u63d0\u4f9b\u306b\u5c3d\u529b\u3057\u3066\u307e\u3044\u308a\u307e\u3059\u3002",
    zh: "\u6211\u4eec\u5f88\u9ad8\u5174\u5ba3\u5e03\u4e0e\u6b27\u6d32\u9886\u5148\u7684\u79d1\u6280\u516c\u53f8\u5efa\u7acb\u65b0\u7684\u5408\u4f5c\u4f19\u4f34\u5173\u7cfb\u3002\u8fd9\u9879\u5408\u4f5c\u5c06\u4f7f\u6211\u4eec\u80fd\u591f\u4e3a\u5168\u7403\u5ba2\u6237\u7fa4\u63d0\u4f9b\u521b\u65b0\u89e3\u51b3\u65b9\u6848\u3002\u6211\u4eec\u7684\u56e2\u961f\u81f4\u529b\u4e8e\u63d0\u4f9b\u6700\u9ad8\u8d28\u91cf\u7684\u670d\u52a1\u548c\u652f\u6301\u3002",
  },
  technical: {
    en: "The application uses a microservices architecture deployed on Kubernetes. Each service communicates through REST APIs and message queues. The database layer consists of PostgreSQL for relational data and Redis for caching. All services are monitored using Prometheus and Grafana dashboards.",
    nl: "De applicatie maakt gebruik van een microservices-architectuur die op Kubernetes is ge\u00efmplementeerd. Elke service communiceert via REST API's en berichtenwachtrijen. De databaselaag bestaat uit PostgreSQL voor relationele gegevens en Redis voor caching. Alle services worden gemonitord met Prometheus en Grafana-dashboards.",
    de: "Die Anwendung verwendet eine Microservices-Architektur, die auf Kubernetes bereitgestellt wird. Jeder Dienst kommuniziert \u00fcber REST-APIs und Nachrichtenwarteschlangen. Die Datenbankschicht besteht aus PostgreSQL f\u00fcr relationale Daten und Redis f\u00fcr Caching. Alle Dienste werden mit Prometheus und Grafana-Dashboards \u00fcberwacht.",
    fr: "L\u2019application utilise une architecture microservices d\u00e9ploy\u00e9e sur Kubernetes. Chaque service communique via des API REST et des files de messages. La couche base de donn\u00e9es se compose de PostgreSQL pour les donn\u00e9es relationnelles et de Redis pour la mise en cache. Tous les services sont surveill\u00e9s \u00e0 l\u2019aide de tableaux de bord Prometheus et Grafana.",
    es: "La aplicaci\u00f3n utiliza una arquitectura de microservicios desplegada en Kubernetes. Cada servicio se comunica a trav\u00e9s de APIs REST y colas de mensajes. La capa de base de datos consiste en PostgreSQL para datos relacionales y Redis para cach\u00e9. Todos los servicios se monitorizan utilizando paneles de Prometheus y Grafana.",
    ar: "\u064a\u0633\u062a\u062e\u062f\u0645 \u0627\u0644\u062a\u0637\u0628\u064a\u0642 \u0628\u0646\u064a\u0629 \u0627\u0644\u062e\u062f\u0645\u0627\u062a \u0627\u0644\u0645\u0635\u063a\u0631\u0629 \u0627\u0644\u0645\u0646\u0634\u0648\u0631\u0629 \u0639\u0644\u0649 Kubernetes. \u064a\u062a\u0648\u0627\u0635\u0644 \u0643\u0644 \u0633\u064a\u0631\u0641\u064a\u0633 \u0639\u0628\u0631 \u0648\u0627\u062c\u0647\u0627\u062a REST API \u0648\u0637\u0648\u0627\u0628\u064a\u0631 \u0627\u0644\u0631\u0633\u0627\u0626\u0644. \u062a\u062a\u0643\u0648\u0646 \u0637\u0628\u0642\u0629 \u0642\u0627\u0639\u062f\u0629 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u0645\u0646 PostgreSQL \u0644\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u0627\u0644\u0639\u0644\u0627\u0626\u0642\u064a\u0629 \u0648Redis \u0644\u0644\u062a\u062e\u0632\u064a\u0646 \u0627\u0644\u0645\u0624\u0642\u062a. \u062a\u062a\u0645 \u0645\u0631\u0627\u0642\u0628\u0629 \u062c\u0645\u064a\u0639 \u0627\u0644\u062e\u062f\u0645\u0627\u062a \u0628\u0627\u0633\u062a\u062e\u062f\u0627\u0645 \u0644\u0648\u062d\u0627\u062a Prometheus \u0648Grafana.",
    ja: "\u3053\u306e\u30a2\u30d7\u30ea\u30b1\u30fc\u30b7\u30e7\u30f3\u306fKubernetes\u4e0a\u306b\u30c7\u30d7\u30ed\u30a4\u3055\u308c\u305f\u30de\u30a4\u30af\u30ed\u30b5\u30fc\u30d3\u30b9\u30a2\u30fc\u30ad\u30c6\u30af\u30c1\u30e3\u3092\u4f7f\u7528\u3057\u3066\u3044\u307e\u3059\u3002\u5404\u30b5\u30fc\u30d3\u30b9\u306fREST API\u3068\u30e1\u30c3\u30bb\u30fc\u30b8\u30ad\u30e5\u30fc\u3092\u901a\u3058\u3066\u901a\u4fe1\u3057\u307e\u3059\u3002\u30c7\u30fc\u30bf\u30d9\u30fc\u30b9\u5c64\u306f\u3001\u30ea\u30ec\u30fc\u30b7\u30e7\u30ca\u30eb\u30c7\u30fc\u30bf\u7528\u306ePostgreSQL\u3068\u30ad\u30e3\u30c3\u30b7\u30e5\u7528\u306eRedis\u3067\u69cb\u6210\u3055\u308c\u3066\u3044\u307e\u3059\u3002\u3059\u3079\u3066\u306e\u30b5\u30fc\u30d3\u30b9\u306fPrometheus\u3068Grafana\u30c0\u30c3\u30b7\u30e5\u30dc\u30fc\u30c9\u3067\u76e3\u8996\u3055\u308c\u3066\u3044\u307e\u3059\u3002",
    zh: "\u8be5\u5e94\u7528\u7a0b\u5e8f\u4f7f\u7528\u90e8\u7f72\u5728Kubernetes\u4e0a\u7684\u5fae\u670d\u52a1\u67b6\u6784\u3002\u6bcf\u4e2a\u670d\u52a1\u901a\u8fc7REST API\u548c\u6d88\u606f\u961f\u5217\u8fdb\u884c\u901a\u4fe1\u3002\u6570\u636e\u5e93\u5c42\u7531\u7528\u4e8e\u5173\u7cfb\u6570\u636e\u7684PostgreSQL\u548c\u7528\u4e8e\u7f13\u5b58\u7684Redis\u7ec4\u6210\u3002\u6240\u6709\u670d\u52a1\u5747\u4f7f\u7528Prometheus\u548cGrafana\u4eea\u8868\u677f\u8fdb\u884c\u76d1\u63a7\u3002",
  },
};

function getConfidence(source: Language, target: Language): number {
  const highPairs = new Set(["en-nl", "en-de", "en-fr", "en-es", "nl-de", "fr-es"]);
  const key = `${source}-${target}`;
  const rev = `${target}-${source}`;
  if (source === target) return 100;
  if (highPairs.has(key) || highPairs.has(rev)) return Math.floor(Math.random() * 5) + 95;
  return Math.floor(Math.random() * 10) + 85;
}

export default function TranslateAIDemo() {
  const [sourceText, setSourceText] = useState(sampleTexts.business.en);
  const [sourceLang, setSourceLang] = useState<Language>("en");
  const [targetLang, setTargetLang] = useState<Language>("nl");
  const [translatedText, setTranslatedText] = useState("");
  const [translating, setTranslating] = useState(false);
  const [confidence, setConfidence] = useState(0);
  const [activePreset, setActivePreset] = useState<string>("business");

  const handleTranslate = () => {
    if (!sourceText.trim()) return;
    setTranslating(true);
    setTranslatedText("");
    setTimeout(() => {
      const preset = Object.entries(sampleTexts).find(([, texts]) =>
        Object.values(texts).some((t) => sourceText.includes(t.substring(0, 50)))
      );
      if (preset) {
        setTranslatedText(preset[1][targetLang] || sampleTexts.business[targetLang]);
      } else {
        setTranslatedText(sampleTexts.business[targetLang]);
      }
      setConfidence(getConfidence(sourceLang, targetLang));
      setTranslating(false);
    }, 1500);
  };

  const loadPreset = (key: string) => {
    setActivePreset(key);
    setSourceText(sampleTexts[key][sourceLang] || sampleTexts[key].en);
    setTranslatedText("");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/products/ai-translation" className="text-cyan-200 hover:text-white text-sm mb-2 inline-block">&larr; Back to TranslateAI</Link>
          <h1 className="text-3xl font-bold">TranslateAI Demo</h1>
          <p className="text-cyan-100 mt-1">Professional-grade AI translation across 8 languages</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Presets */}
        <div className="flex gap-2 mb-6 flex-wrap">
          <span className="text-sm text-slate-500 py-2">Sample texts:</span>
          {[
            { key: "business", label: "Business" },
            { key: "technical", label: "Technical" },
          ].map((p) => (
            <button
              key={p.key}
              onClick={() => loadPreset(p.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activePreset === p.key ? "bg-cyan-600 text-white" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Language Selectors */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1">
            <select
              value={sourceLang}
              onChange={(e) => {
                setSourceLang(e.target.value as Language);
                setSourceText(sampleTexts[activePreset]?.[e.target.value as Language] || sampleTexts[activePreset]?.en || "");
                setTranslatedText("");
              }}
              className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-sm bg-white font-medium"
            >
              {Object.entries(languageNames).map(([code, name]) => (
                <option key={code} value={code}>{name}</option>
              ))}
            </select>
          </div>
          <button
            onClick={() => {
              const tmp = sourceLang;
              setSourceLang(targetLang);
              setTargetLang(tmp);
              if (translatedText) {
                setSourceText(translatedText);
                setTranslatedText("");
              }
            }}
            className="p-2 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors"
            title="Swap languages"
          >
            <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
          </button>
          <div className="flex-1">
            <select
              value={targetLang}
              onChange={(e) => { setTargetLang(e.target.value as Language); setTranslatedText(""); }}
              className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-sm bg-white font-medium"
            >
              {Object.entries(languageNames).map(([code, name]) => (
                <option key={code} value={code}>{name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <div>
            <textarea
              value={sourceText}
              onChange={(e) => { setSourceText(e.target.value); setTranslatedText(""); }}
              rows={10}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-sm resize-none bg-white"
              placeholder="Enter text to translate..."
              dir={sourceLang === "ar" ? "rtl" : "ltr"}
            />
            <p className="text-xs text-slate-400 mt-1">{sourceText.split(/\s+/).filter(Boolean).length} words</p>
          </div>
          <div className="relative">
            <div
              className={`w-full h-full min-h-[260px] px-4 py-3 border border-slate-200 rounded-xl text-sm bg-slate-50 overflow-y-auto ${
                translating ? "animate-pulse" : ""
              }`}
              dir={targetLang === "ar" ? "rtl" : "ltr"}
            >
              {translating ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <svg className="animate-spin h-8 w-8 text-cyan-600 mx-auto mb-2" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                    <p className="text-slate-500">Translating...</p>
                  </div>
                </div>
              ) : translatedText ? (
                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{translatedText}</p>
              ) : (
                <p className="text-slate-400">Translation will appear here...</p>
              )}
            </div>
            {translatedText && (
              <p className="text-xs text-slate-400 mt-1">{translatedText.split(/\s+/).filter(Boolean).length} words</p>
            )}
          </div>
        </div>

        {/* Translate Button */}
        <div className="text-center mb-6">
          <button
            onClick={handleTranslate}
            disabled={translating || !sourceText.trim() || sourceLang === targetLang}
            className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold px-10 py-3 rounded-xl hover:from-cyan-700 hover:to-blue-700 transition-all disabled:opacity-50 shadow-lg shadow-cyan-200"
          >
            {translating ? "Translating..." : "Translate"}
          </button>
        </div>

        {/* Confidence */}
        {translatedText && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
            <h3 className="text-sm font-semibold text-slate-800 mb-3">Translation Quality</h3>
            <div className="flex items-center gap-4">
              <div className="flex-1 bg-slate-100 rounded-full h-3">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    confidence >= 90 ? "bg-green-500" : confidence >= 75 ? "bg-yellow-500" : "bg-red-500"
                  }`}
                  style={{ width: `${confidence}%` }}
                />
              </div>
              <span className={`text-lg font-bold ${
                confidence >= 90 ? "text-green-600" : confidence >= 75 ? "text-yellow-600" : "text-red-600"
              }`}>{confidence}%</span>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              {confidence >= 90 ? "High confidence — suitable for professional use with minimal review." :
               confidence >= 75 ? "Good confidence — recommended for review by a native speaker." :
               "Moderate confidence — professional review recommended before use."}
            </p>
          </div>
        )}

        {/* CTA */}
        <div className="bg-gradient-to-r from-cyan-600 to-blue-700 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-2">Need production translation?</h2>
          <p className="text-cyan-100 mb-6">Get API access for batch translation, custom glossaries, translation memory, and support for 100+ languages.</p>
          <Link href="/contact" className="inline-block bg-white text-cyan-700 font-semibold px-8 py-3 rounded-lg hover:bg-cyan-50 transition-colors">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
