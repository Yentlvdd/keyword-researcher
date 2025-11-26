'use client';

import { useState } from 'react';

interface KeywordData {
  keyword: string;
  matchType: string;
  funnelStage: string;
  volumePotential?: string;
}

interface AnalysisResult {
  url: string;
  keywords: KeywordData[];
  negativeKeywords: string[];
  status: 'success' | 'failed';
  error?: string;
}

// Simple Icons
const Icons = {
  Dashboard: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" /><rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" /></svg>
  ),
  History: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 12" /><path d="M3 3v9h9" /><path d="M12 7v5l4 2" /></svg>
  ),
  Settings: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>
  ),
  Copy: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
  ),
  Check: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
  ),
  Download: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>
  ),
  Search: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
  ),
  Plus: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
  ),
  Trash: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
  ),
  Filter: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>
  ),
  Info: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="16" y2="12" /><line x1="12" x2="12.01" y1="8" y2="8" /></svg>
  )
};

export default function Home() {
  const [urls, setUrls] = useState('');
  const [focus, setFocus] = useState('');
  const [audience, setAudience] = useState('');
  const [region, setRegion] = useState('');
  const [timeframe, setTimeframe] = useState('');
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [matchType, setMatchType] = useState<'broad' | 'phrase' | 'exact'>('broad');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [funnelFilter, setFunnelFilter] = useState<string>('all');
  const [removedKeywords, setRemovedKeywords] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<'dashboard' | 'info'>('dashboard');

  const formatKeyword = (keyword: string, type: 'broad' | 'phrase' | 'exact') => {
    switch (type) {
      case 'phrase':
        return `"${keyword}"`;
      case 'exact':
        return `[${keyword}]`;
      default:
        return keyword;
    }
  };

  const handleAnalyze = async () => {
    setError('');
    setResults([]);

    if (!urls.trim()) {
      setError('Please enter at least one URL');
      return;
    }

    const urlList = urls
      .split('\n')
      .map(url => url.trim())
      .filter(url => url.length > 0);

    if (urlList.length === 0) {
      setError('Please enter at least one valid URL');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          urls: urlList,
          focus: focus.trim(),
          audience: audience.trim(),
          region: region.trim(),
          timeframe: timeframe.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'An error occurred during analysis');
        setLoading(false);
        return;
      }

      setResults(data.results);
    } catch (err) {
      setError('Failed to connect to the server. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (keywords: KeywordData[], index: number) => {
    // Filter out removed keywords and apply funnel filter
    const filteredKeywords = keywords.filter(k => {
      const keywordId = `${index}-${k.keyword}`;
      if (removedKeywords.has(keywordId)) return false;
      if (funnelFilter === 'all') return true;
      return k.funnelStage.toLowerCase().includes(funnelFilter.toLowerCase());
    });

    // Format with newlines for Google Ads (one keyword per line)
    const text = filteredKeywords.map(k => formatKeyword(k.keyword, matchType)).join('\n');
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleRemoveKeyword = (resultIndex: number, keyword: string) => {
    const keywordId = `${resultIndex}-${keyword}`;
    setRemovedKeywords(prev => new Set([...prev, keywordId]));
  };

  const getFilteredKeywords = (keywords: KeywordData[], resultIndex: number) => {
    return keywords.filter(k => {
      const keywordId = `${resultIndex}-${k.keyword}`;
      if (removedKeywords.has(keywordId)) return false;
      if (funnelFilter === 'all') return true;
      return k.funnelStage.toLowerCase().includes(funnelFilter.toLowerCase());
    });
  };

  const handleDownloadCSV = () => {
    if (results.length === 0) return;

    const headers = ['Source URL', 'Keyword', 'Match Type', 'Funnel Stage', 'Negative Keywords'];
    const rows: string[][] = [];

    results.forEach(result => {
      if (result.status === 'success') {
        const negativeKeywordsString = result.negativeKeywords.join('; ');
        result.keywords.forEach(k => {
          rows.push([
            result.url,
            formatKeyword(k.keyword, matchType),
            k.matchType,
            k.funnelStage,
            negativeKeywordsString
          ]);
        });
      } else {
        rows.push([result.url, 'Failed', '', '', result.error || '']);
      }
    });

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `keyword-analysis-${matchType}-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col fixed h-full z-10">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-2 text-blue-600">
            <Icons.Search />
            <span className="font-bold text-lg text-slate-900">KeywordAgent</span>
          </div>
        </div>

        <nav className="space-y-2 p-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'dashboard'
                ? 'bg-blue-50 text-blue-600'
                : 'text-slate-600 hover:bg-slate-50'
              }`}
          >
            <Icons.Dashboard />
            Keyword Discovery
          </button>
          <button
            onClick={() => setActiveTab('info')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'info'
                ? 'bg-blue-50 text-blue-600'
                : 'text-slate-600 hover:bg-slate-50'
              }`}
          >
            <Icons.Info />
            Info & Guide
          </button>
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="text-xs text-slate-400">v1.0.0</div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        {activeTab === 'info' ? (
          <div className="max-w-3xl mx-auto space-y-8">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 mb-2">How to use KeywordAgent</h1>
              <p className="text-slate-500">A simple guide to getting the best results.</p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm space-y-8">
              <section className="space-y-4">
                <div className="flex items-center gap-3 text-blue-600 mb-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center font-bold">1</div>
                  <h2 className="text-lg font-bold text-slate-900">Analyze Your Content</h2>
                </div>
                <p className="text-slate-600 ml-11">
                  Paste your landing page URLs into the input box. You can add optional context like your
                  <strong> Campaign Focus</strong>, <strong>Target Audience</strong>, <strong>Region</strong>, and <strong>Season</strong> to get more relevant results.
                </p>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-3 text-blue-600 mb-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center font-bold">2</div>
                  <h2 className="text-lg font-bold text-slate-900">Refine & Filter</h2>
                </div>
                <p className="text-slate-600 ml-11">
                  Use the <strong>Funnel Stage</strong> filters (Awareness, Consideration, Conversion) to find keywords for specific parts of the buyer's journey.
                  Remove any irrelevant keywords using the <span className="inline-flex items-center gap-1 text-red-400"><Icons.Trash /></span> icon.
                </p>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-3 text-blue-600 mb-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center font-bold">3</div>
                  <h2 className="text-lg font-bold text-slate-900">Export for Google Ads</h2>
                </div>
                <p className="text-slate-600 ml-11">
                  Select your desired <strong>Match Type</strong> (Broad, "Phrase", [Exact]). Click <strong>Copy Keywords</strong> to get a clean, newline-separated list ready to paste directly into Google Ads Editor.
                </p>
              </section>
            </div>

            <div className="bg-amber-50 rounded-xl border border-amber-200 p-6 flex gap-4">
              <div className="text-amber-600 shrink-0 mt-1">
                <Icons.Info />
              </div>
              <div>
                <h3 className="font-bold text-amber-900 mb-1">Important Note on Search Volumes</h3>
                <p className="text-amber-800 text-sm leading-relaxed">
                  The "Est. Volume" shown in this tool is an AI-generated estimate of potential (High/Medium/Low) based on general popularity.
                  <strong> AI cannot access real-time search volume data.</strong>
                </p>
                <p className="text-amber-800 text-sm leading-relaxed mt-2">
                  For accurate, real-time search volume numbers and cost-per-click estimates, please copy your generated keyword list and paste it into the
                  <a href="https://ads.google.com/home/tools/keyword-planner/" target="_blank" rel="noopener noreferrer" className="font-bold underline hover:text-amber-950 ml-1">
                    Google Ads Keyword Planner
                  </a>.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex justify-between items-start mb-10">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 mb-1">Overview & Selection</h1>
                <p className="text-slate-500">Manage your keyword discovery campaigns and sources.</p>
              </div>

              <div className="flex gap-3">
                <div className="flex bg-white border border-slate-200 rounded-lg p-1">
                  <button
                    onClick={() => setMatchType('broad')}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${matchType === 'broad'
                      ? 'bg-blue-50 text-blue-600 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                      }`}
                  >
                    Broad
                  </button>
                  <button
                    onClick={() => setMatchType('phrase')}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${matchType === 'phrase'
                      ? 'bg-blue-50 text-blue-600 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                      }`}
                  >
                    "Phrase"
                  </button>
                  <button
                    onClick={() => setMatchType('exact')}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${matchType === 'exact'
                      ? 'bg-blue-50 text-blue-600 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                      }`}
                  >
                    [Exact]
                  </button>
                </div>
                <button
                  onClick={handleDownloadCSV}
                  disabled={results.length === 0}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Icons.Download />
                  CSV
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-sm transition-colors">
                  <Icons.Plus />
                  New Campaign
                </button>
              </div>
            </div>

            {/* Configuration Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Campaign Focus</label>
                    <input
                      type="text"
                      value={focus}
                      onChange={(e) => setFocus(e.target.value)}
                      placeholder="e.g. Sell Winter Jackets"
                      className="w-full p-2 rounded border border-slate-200 text-sm focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Target Audience</label>
                    <input
                      type="text"
                      value={audience}
                      onChange={(e) => setAudience(e.target.value)}
                      placeholder="e.g. Outdoor enthusiasts"
                      className="w-full p-2 rounded border border-slate-200 text-sm focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Target Region</label>
                      <input
                        type="text"
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        placeholder="e.g. UK, USA, Global"
                        className="w-full p-2 rounded border border-slate-200 text-sm focus:border-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Timeframe/Season</label>
                      <input
                        type="text"
                        value={timeframe}
                        onChange={(e) => setTimeframe(e.target.value)}
                        placeholder="e.g. Q4, Christmas"
                        className="w-full p-2 rounded border border-slate-200 text-sm focus:border-blue-500 outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={handleAnalyze}
                disabled={loading || !urls.trim()}
                className={`w-full py-3 px-4 rounded-lg font-bold text-white shadow-lg shadow-blue-500/20 transition-all
                ${loading || !urls.trim()
                    ? 'bg-slate-300 cursor-not-allowed shadow-none'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-blue-500/40 active:scale-[0.98]'
                  }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing...
                  </span>
                ) : (
                  'Analyze Sources'
                )}
              </button>
            </div>

            {/* Input & Results Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Input Column */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm h-full flex flex-col">
                  <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="font-bold text-slate-900">Input Sources</h3>
                    <span className="text-xs font-medium text-blue-600 cursor-pointer hover:text-blue-700">Clear All</span>
                  </div>
                  <div className="p-4 flex-1">
                    <textarea
                      value={urls}
                      onChange={(e) => setUrls(e.target.value)}
                      placeholder="Paste URLs here (one per line)..."
                      className="w-full h-full min-h-[300px] p-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none resize-none text-sm font-mono text-slate-600"
                    />
                  </div>
                  {error && (
                    <div className="p-4 bg-red-50 border-t border-red-100 text-red-600 text-sm">
                      {error}
                    </div>
                  )}
                </div>
              </div>

              {/* Results Columns */}
              <div className="lg:col-span-2 space-y-6">
                {results.length > 0 ? (
                  <section className="space-y-6">
                    {/* Filter Buttons */}
                    <div className="flex items-center gap-2 bg-white rounded-lg border border-slate-200 p-2 shadow-sm">
                      <Icons.Filter />
                      <span className="text-sm font-medium text-slate-600">Filter by stage:</span>
                      <div className="flex gap-1">
                        <button
                          onClick={() => setFunnelFilter('all')}
                          className={`px-3 py-1 text-xs font-medium rounded transition-all ${funnelFilter === 'all'
                            ? 'bg-slate-900 text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                        >
                          All
                        </button>
                        <button
                          onClick={() => setFunnelFilter('awareness')}
                          className={`px-3 py-1 text-xs font-medium rounded transition-all ${funnelFilter === 'awareness'
                            ? 'bg-blue-600 text-white'
                            : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                            }`}
                        >
                          Awareness
                        </button>
                        <button
                          onClick={() => setFunnelFilter('consideration')}
                          className={`px-3 py-1 text-xs font-medium rounded transition-all ${funnelFilter === 'consideration'
                            ? 'bg-purple-600 text-white'
                            : 'bg-purple-50 text-purple-600 hover:bg-purple-100'
                            }`}
                        >
                          Consideration
                        </button>
                        <button
                          onClick={() => setFunnelFilter('conversion')}
                          className={`px-3 py-1 text-xs font-medium rounded transition-all ${funnelFilter === 'conversion'
                            ? 'bg-green-600 text-white'
                            : 'bg-green-50 text-green-600 hover:bg-green-100'
                            }`}
                        >
                          Conversion
                        </button>
                      </div>
                    </div>

                    {results.map((result, index) => (
                      <div key={index} className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
                        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                          <h3 className="font-bold text-slate-900 truncate max-w-[300px]" title={result.url}>
                            {result.url.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]}
                          </h3>
                          <button
                            onClick={() => result.status === 'success' && handleCopy(result.keywords, index)}
                            className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
                          >
                            {copiedIndex === index ? (
                              <>
                                <Icons.Check /> Copied
                              </>
                            ) : (
                              'Copy Keywords'
                            )}
                          </button>
                        </div>

                        <div className="p-0">
                          {result.status === 'success' ? (
                            <div>
                              {/* Keywords Table */}
                              <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                  <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
                                    <tr>
                                      <th className="px-4 py-3 font-medium">Keyword</th>
                                      <th className="px-4 py-3 font-medium">Match Type</th>
                                      <th className="px-4 py-3 font-medium">Funnel Stage</th>
                                      <th className="px-4 py-3 font-medium">Est. Volume</th>
                                      <th className="px-4 py-3 font-medium w-16"></th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-slate-100">
                                    {getFilteredKeywords(result.keywords, index).map((k, i) => (
                                      <tr key={i} className="hover:bg-slate-50/50">
                                        <td className="px-4 py-2 font-medium text-slate-900">
                                          {formatKeyword(k.keyword, matchType)}
                                        </td>
                                        <td className="px-4 py-2 text-slate-500">
                                          {matchType.charAt(0).toUpperCase() + matchType.slice(1)}
                                        </td>
                                        <td className="px-4 py-2">
                                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${k.funnelStage.toLowerCase().includes('awareness') ? 'bg-blue-100 text-blue-700' :
                                            k.funnelStage.toLowerCase().includes('consideration') ? 'bg-purple-100 text-purple-700' :
                                              'bg-green-100 text-green-700'
                                            }`}>
                                            {k.funnelStage}
                                          </span>
                                        </td>
                                        <td className="px-4 py-2">
                                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${k.volumePotential?.toLowerCase() === 'high' ? 'bg-emerald-100 text-emerald-700' :
                                            k.volumePotential?.toLowerCase() === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                              'bg-slate-100 text-slate-600'
                                            }`}>
                                            {k.volumePotential || 'N/A'}
                                          </span>
                                        </td>
                                        <td className="px-4 py-2">
                                          <button
                                            onClick={() => handleRemoveKeyword(index, k.keyword)}
                                            className="text-red-400 hover:text-red-600 transition-colors"
                                            title="Remove keyword"
                                          >
                                            <Icons.Trash />
                                          </button>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>

                              {/* Negative Keywords Section */}
                              {result.negativeKeywords.length > 0 && (
                                <div className="p-4 border-t border-slate-100 bg-red-50/10">
                                  <h4 className="text-xs font-bold text-red-600 uppercase mb-2">Negative Keywords (Exclusions)</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {result.negativeKeywords.map((nk, i) => (
                                      <span key={i} className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-red-50 text-red-600 border border-red-100">
                                        {nk}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center h-32 text-red-500 text-sm text-center p-4">
                              <span className="font-medium">Analysis Failed</span>
                              <span className="text-xs text-red-400 mt-1">{result.error}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </section>
                ) : (
                  <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                    <Icons.Search />
                    <p className="mt-2 text-sm font-medium">No results yet</p>
                    <p className="text-xs">Enter URLs and click Analyze to see keywords</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
