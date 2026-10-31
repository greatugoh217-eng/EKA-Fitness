/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, Globe, CheckCircle, ExternalLink, Sparkles, AlertCircle, RefreshCw, Newspaper, ShieldAlert } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface Source {
  title: string;
  url: string;
}

interface AgentResponse {
  text: string;
  sources: Source[];
  searchQueries: string[];
  timestamp: string;
}

export const SearchAgentSection: React.FC = () => {
  const { currentTheme } = useTheme();
  const [prompt, setPrompt] = useState('');
  const [mode, setMode] = useState<'fact_check' | 'current_events' | 'fitness_science'>('fact_check');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<AgentResponse | null>({
    text: `### Fact-Check Analysis: Lifting Heavy Weights & Growth Stunting

**Verdict: [DEBUNKED / FALSE]**

Multiple comprehensive clinical reviews and athletic organizations (including the **American Academy of Pediatrics** and the **National Strength and Conditioning Association**) have confirmed that structured resistance training does **not** stunt growth or damage growth plates in children or teenagers when properly supervised.

#### Key Scientific Findings:
- **Growth Plate Integrity:** Epiphyseal plate fractures occur predominantly in uncontrolled collision sports or unsupervised accidents, not during regulated barbell or dumbbell training with proper technique.
- **Bone Mineral Density:** Youth resistance training significantly enhances bone mineral density, strengthens tendon elasticity, and reduces injury rates in high-impact sports.
- **EKA Fitness Protocol:** At EKA Fitness Gym in Egbe, beginners and youth lifters always learn strict biomechanics, machine pacing, and core control before progressing weights.`,
    sources: [
      {
        title: "National Strength and Conditioning Association (NSCA) - Youth Resistance Training Guidelines",
        url: "https://www.nsca.com"
      },
      {
        title: "Mayo Clinic - Strength training: OK for kids?",
        url: "https://www.mayoclinic.org"
      },
      {
        title: "American Academy of Pediatrics - Strength Training by Children and Adolescents",
        url: "https://publications.aap.org"
      }
    ],
    searchQueries: [
      "does lifting weights stunt growth teenagers medical evidence",
      "nsca position statement youth resistance training"
    ],
    timestamp: new Date().toISOString(),
  });

  const handleSearch = async (queryToRun?: string) => {
    const query = queryToRun || prompt;
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/agent/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: query,
          mode,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with status ${res.status}`);
      }

      const data = await res.json();
      setResponse(data);
    } catch (err: any) {
      console.error('Agent query error:', err);
      setError(err?.message || 'Failed to connect to Google Search Grounded Agent. Please verify your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handlePresetClick = (presetPrompt: string, presetMode: 'fact_check' | 'current_events' | 'fitness_science') => {
    setPrompt(presetPrompt);
    setMode(presetMode);
    handleSearch(presetPrompt);
  };

  return (
    <section id="intel-agent" className="py-24 bg-[#090909] border-b border-[#1f1f1f] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#181818] border text-xs text-neutral-200 mb-3 shadow-md"
            style={{
              borderColor: `${currentTheme.accent}40`,
            }}
          >
            <Globe className="w-4 h-4" style={{ color: currentTheme.accent }} />
            <span className="font-semibold">Powered by Real-Time Google Search Grounding</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-white mb-4">
            REAL-TIME INTEL &{' '}
            <span
              className={`text-transparent bg-clip-text bg-gradient-to-r ${currentTheme.textGradient}`}
            >
              FACT-CHECK AGENT
            </span>
          </h2>

          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
            Discuss current news, verify athletic and fitness claims, or fact-check trending events with live Google Search citations.
          </p>
        </div>

        {/* Interactive Console Card */}
        <div
          className="bg-[#121212] border rounded-2xl p-6 sm:p-8 shadow-2xl transition-all"
          style={{
            borderColor: `${currentTheme.accent}30`,
            boxShadow: `0 0 25px ${currentTheme.glowColor}`,
          }}
        >
          
          {/* Mode Selector */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-[#222222] mb-6">
            <span className="text-xs font-mono uppercase text-neutral-300 font-bold">
              Select Agent Intelligence Mode:
            </span>

            <div className="flex items-center gap-1.5 bg-[#181818] p-1 rounded-xl border border-[#2b2b2b]">
              <button
                type="button"
                onClick={() => setMode('fact_check')}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
                  mode === 'fact_check' ? 'text-black shadow-md' : 'text-neutral-400 hover:text-white'
                }`}
                style={{
                  backgroundColor: mode === 'fact_check' ? currentTheme.accent : undefined,
                }}
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Fact-Check Mode</span>
              </button>

              <button
                type="button"
                onClick={() => setMode('current_events')}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
                  mode === 'current_events' ? 'text-black shadow-md' : 'text-neutral-400 hover:text-white'
                }`}
                style={{
                  backgroundColor: mode === 'current_events' ? currentTheme.accent : undefined,
                }}
              >
                <Newspaper className="w-3.5 h-3.5" />
                <span>Current Events</span>
              </button>

              <button
                type="button"
                onClick={() => setMode('fitness_science')}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
                  mode === 'fitness_science' ? 'text-black shadow-md' : 'text-neutral-400 hover:text-white'
                }`}
                style={{
                  backgroundColor: mode === 'fitness_science' ? currentTheme.accent : undefined,
                }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Sports & Health Science</span>
              </button>
            </div>
          </div>

          {/* Prompt Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="flex flex-col sm:flex-row gap-3 mb-6"
          >
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-neutral-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={
                  mode === 'fact_check'
                    ? "Enter any claim to fact-check against live web search..."
                    : mode === 'current_events'
                    ? "Ask about latest breaking news, sports tournaments, or Lagos events..."
                    : "Ask about exercise science, supplements, or workout research..."
                }
                className="w-full pl-12 pr-4 py-3.5 bg-[#181818] border border-[#2e2e2e] rounded-xl text-white text-sm focus:border-white focus:outline-none transition-colors font-sans"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !prompt.trim()}
              className={`px-7 py-3.5 disabled:opacity-50 text-black font-bold uppercase tracking-wider text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 shrink-0 cursor-pointer ${currentTheme.buttonGradient}`}
              style={{
                boxShadow: `0 0 20px ${currentTheme.glowColor}`,
              }}
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Searching Google...</span>
                </>
              ) : (
                <>
                  <Globe className="w-4 h-4" />
                  <span>Search & Verify</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Preset Prompts */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <span className="text-[11px] font-mono uppercase text-neutral-400 mr-1 font-semibold">Quick Prompts:</span>
            
            <button
              type="button"
              onClick={() => handlePresetClick("Fact-check: Does drinking water while lifting weights cause stomach cramps?", "fitness_science")}
              className="text-xs bg-[#191919] hover:bg-[#222222] border border-[#282828] text-neutral-300 hover:text-white px-3 py-1.5 rounded-lg transition-colors text-left cursor-pointer"
            >
              Drinking water while lifting?
            </button>

            <button
              type="button"
              onClick={() => handlePresetClick("What are the latest Nigerian sports news and fitness marathons in Lagos?", "current_events")}
              className="text-xs bg-[#191919] hover:bg-[#222222] border border-[#282828] text-neutral-300 hover:text-white px-3 py-1.5 rounded-lg transition-colors text-left cursor-pointer"
            >
              Lagos sports & marathon news
            </button>

            <button
              type="button"
              onClick={() => handlePresetClick("Fact-check: Does sauna use burn body fat directly or just water weight?", "fact_check")}
              className="text-xs bg-[#191919] hover:bg-[#222222] border border-[#282828] text-neutral-300 hover:text-white px-3 py-1.5 rounded-lg transition-colors text-left cursor-pointer"
            >
              Does sauna burn fat or water?
            </button>

            <button
              type="button"
              onClick={() => handlePresetClick("What is the latest world breaking news right now?", "current_events")}
              className="text-xs bg-[#191919] hover:bg-[#222222] border border-[#282828] text-neutral-300 hover:text-white px-3 py-1.5 rounded-lg transition-colors text-left cursor-pointer"
            >
              Latest global breaking news
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 rounded-xl bg-red-950/40 border border-red-800/60 text-red-300 text-xs flex items-start gap-3 mb-6">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-semibold">Verification Notice</strong>
                <span>{error}</span>
              </div>
            </div>
          )}

          {/* Output Display */}
          {response && (
            <div className="bg-[#171717] border border-[#292929] rounded-xl p-6 sm:p-7 space-y-6">
              
              {/* Top Meta Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#242424] text-xs">
                <div className="flex items-center gap-2 font-mono" style={{ color: currentTheme.accent }}>
                  <CheckCircle className="w-4 h-4" />
                  <span className="font-bold uppercase tracking-wide">
                    Live Google Search Grounded Intelligence
                  </span>
                </div>
                <div className="text-neutral-400 font-mono text-[11px]">
                  Verified: {new Date(response.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>

              {/* Formatted Text Content */}
              <div className="prose prose-invert max-w-none text-neutral-200 text-sm sm:text-base leading-relaxed space-y-3 whitespace-pre-line">
                {response.text}
              </div>

              {/* Search Queries Used */}
              {response.searchQueries && response.searchQueries.length > 0 && (
                <div className="pt-4 border-t border-[#242424]">
                  <span className="text-[11px] font-mono uppercase text-neutral-400 block mb-2 font-semibold">
                    Google Search Grounding Queries Executed:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {response.searchQueries.map((q, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded bg-[#202020] text-neutral-300 text-xs font-mono border border-[#303030]"
                      >
                        "{q}"
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Citations / Sources */}
              {response.sources && response.sources.length > 0 && (
                <div className="pt-4 border-t border-[#242424]">
                  <span
                    className="text-[11px] font-mono uppercase block mb-3 font-bold tracking-wider"
                    style={{ color: currentTheme.accent }}
                  >
                    Grounding Sources & Real-Time Citations ({response.sources.length}):
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {response.sources.map((source, idx) => (
                      <a
                        key={idx}
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3.5 rounded-xl bg-[#1f1f1f] hover:bg-[#282828] border border-[#2e2e2e] transition-colors flex items-start justify-between gap-2 group cursor-pointer"
                        style={{
                          borderColor: `${currentTheme.accent}25`,
                        }}
                      >
                        <div className="min-w-0">
                          <div
                            className="text-xs font-semibold text-white group-hover:brightness-110 transition-colors truncate"
                          >
                            {source.title}
                          </div>
                          <div className="text-[11px] text-neutral-400 truncate mt-0.5 font-mono">
                            {(() => {
                              try {
                                return new URL(source.url).hostname;
                              } catch {
                                return source.url;
                              }
                            })()}
                          </div>
                        </div>
                        <ExternalLink
                          className="w-3.5 h-3.5 shrink-0 mt-0.5"
                          style={{ color: currentTheme.accent }}
                        />
                      </a>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

      </div>
    </section>
  );
};
