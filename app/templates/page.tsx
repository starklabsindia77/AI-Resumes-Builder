'use client';

import React, { useState } from 'react';
import Header from '@/app/(home)/_components/common/Header';
import { templateConfigurations } from '@/lib/templates-config';
import { portfolioTemplates } from '@/lib/portfolio-templates-config';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Crown, Sparkles, Filter, Globe, FileText } from 'lucide-react';

type TabType = 'resume' | 'portfolio';

const TemplatesPage = () => {
  const [activeTab, setActiveTab] = useState<TabType>('resume');

  // Resume stats
  const freeCvCount = templateConfigurations.filter(t => !t.isPremium).length;
  const premiumCvCount = templateConfigurations.filter(t => t.isPremium).length;

  // Portfolio stats
  const freePortCount = portfolioTemplates.filter(t => !t.isPremium).length;
  const premiumPortCount = portfolioTemplates.filter(t => t.isPremium).length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Header />

      <main className="pt-32 pb-24">
        {/* Hero Header */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl space-y-6 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 font-medium text-sm border border-emerald-500/20">
            <Sparkles size="16px" />
            <span>Industry-Leading Designs</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white">
            The SmartCraft <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">
              Template Marketplace
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Choose from 50 resume templates and 8 portfolio website designs — all powered by your single resume data.
          </p>

          <div className="flex items-center justify-center gap-4 pt-4">
            <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 font-bold px-8 shadow-xl shadow-emerald-500/20 rounded-full">
              <Link href="/dashboard">
                Start Building
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Tab Toggle */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-4 rounded-3xl glass-card bg-white/60 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 backdrop-blur-md">
            {/* Tab Buttons */}
            <div className="flex items-center gap-2 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800">
              <button
                onClick={() => setActiveTab('resume')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                  activeTab === 'resume'
                    ? 'bg-white dark:bg-slate-700 shadow-md text-slate-900 dark:text-white'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'
                }`}
              >
                <FileText size="16px" />
                Resume PDFs ({templateConfigurations.length})
              </button>
              <button
                onClick={() => setActiveTab('portfolio')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                  activeTab === 'portfolio'
                    ? 'bg-white dark:bg-slate-700 shadow-md text-slate-900 dark:text-white'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'
                }`}
              >
                <Globe size="16px" />
                Portfolio Websites ({portfolioTemplates.length})
              </button>
            </div>

            {/* Stats */}
            <div className="flex gap-3">
              <div className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm font-semibold">
                <span className="text-slate-500">Free: </span>
                {activeTab === 'resume' ? freeCvCount : freePortCount}
              </div>
              <div className="px-4 py-2 rounded-xl bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 text-sm font-semibold flex items-center gap-2">
                <Crown size="14px" />
                <span>Premium: </span>
                {activeTab === 'resume' ? premiumCvCount : premiumPortCount}
              </div>
            </div>
          </div>
        </section>

        {/* Resume Templates Grid */}
        {activeTab === 'resume' && (
          <section id="gallery" className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {templateConfigurations.map((template) => (
                <div key={template.id} className="group flex flex-col glass-card squircle bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-all duration-300 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-1">
                  {/* Template Card Abstract Visual */}
                  <div className="h-64 rounded-t-[20px] bg-slate-50 dark:bg-slate-950 overflow-hidden relative border-b border-slate-100 dark:border-slate-900/50">
                    {template.isPremium && (
                      <div className="absolute top-4 right-4 z-10 bg-amber-500 text-white p-1.5 rounded-full shadow-md">
                        <Crown size="14px" fill="currentColor" />
                      </div>
                    )}

                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-slate-900/60 to-transparent z-10 flex items-end justify-center pb-6">
                      <Button asChild size="sm" className="bg-emerald-500 hover:bg-emerald-600 rounded-full font-bold px-6 shadow-xl">
                        <Link href="/dashboard">Use Template</Link>
                      </Button>
                    </div>

                    <div className="absolute inset-0 flex flex-col"
                         style={{
                           borderTop: template.styles.borders === 'accent-top' ? `6px solid ${template.styles.primaryColor || '#10b981'}` : undefined,
                           backgroundColor: 'white'
                         }}>
                      <div className="w-full h-10 bg-slate-100 border-b flex items-center px-4 gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-400" />
                        <div className="w-2 h-2 rounded-full bg-amber-400" />
                        <div className="w-2 h-2 rounded-full bg-emerald-400" />
                      </div>
                      <div className="flex flex-1">
                        {template.styles.layout === 'split-left' && (
                          <div className="w-[30%] bg-slate-100 border-r p-2 flex flex-col gap-2">
                            <div className="w-8 h-8 rounded-full bg-slate-300 mx-auto" />
                            <div className="w-full h-1 bg-slate-200" />
                            <div className="w-3/4 h-1 bg-slate-200" />
                          </div>
                        )}
                        <div className="flex-1 p-4 flex flex-col gap-2">
                          <div className="w-1/3 h-3 bg-slate-800 rounded" />
                          <div className="w-1/2 h-2 rounded" style={{ backgroundColor: template.styles.primaryColor || '#cbd5e1' }} />
                          <div className="mt-2 w-full h-1 bg-slate-200" />
                          <div className="w-5/6 h-1 bg-slate-200" />
                          <div className="w-full h-1 bg-slate-200" />
                        </div>
                        {template.styles.layout === 'split-right' && (
                          <div className="w-[30%] bg-slate-100 border-l p-2 flex flex-col gap-2">
                            <div className="w-full h-1 bg-slate-200 mt-4" />
                            <div className="w-full h-1 bg-slate-200" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between mb-1.5">
                      <h3 className="font-bold text-base text-slate-900 dark:text-white">{template.name}</h3>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                        {template.category}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">{template.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Portfolio Templates Grid */}
        {activeTab === 'portfolio' && (
          <section className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {portfolioTemplates.map((template) => (
                <div key={template.id} className="group flex flex-col glass-card squircle overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-all duration-300 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-1">

                  {/* Website Preview Mockup */}
                  <div className="h-64 bg-slate-950 relative overflow-hidden border-b border-slate-800">
                    {template.isPremium && (
                      <div className="absolute top-4 right-4 z-20 bg-amber-500 text-white p-1.5 rounded-full shadow-md">
                        <Crown size="14px" fill="currentColor" />
                      </div>
                    )}

                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/70 z-10 flex items-end justify-center pb-6">
                      <Button asChild size="sm" className="bg-emerald-500 hover:bg-emerald-600 rounded-full font-bold px-6 shadow-xl">
                        <Link href="/dashboard">Use Template</Link>
                      </Button>
                    </div>

                    {/* Website browser chrome mockup */}
                    <div className="absolute inset-0 flex flex-col">
                      {/* Browser Bar */}
                      <div className="w-full h-8 bg-slate-800 flex items-center px-3 gap-2 shrink-0">
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                        <div className="w-2 h-2 rounded-full bg-yellow-500" />
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <div className="flex-1 h-4 bg-slate-700 rounded-full mx-2 flex items-center px-2">
                          <span className="text-[8px] text-slate-500">smartcraft.app/portfolio/...</span>
                        </div>
                      </div>

                      {/* NavBar Mockup */}
                      {template.styles.navbar !== 'hidden' && (
                        <div className={`w-full h-8 flex items-center justify-between px-4 text-[8px] font-bold shrink-0 ${
                          template.styles.navbar === 'floating' ? 'bg-transparent text-white' : 'bg-slate-900 border-b border-slate-700 text-slate-300'
                        }`}>
                          <span style={{ color: template.styles.primaryColor }}>JD</span>
                          <span className="opacity-70">Contact</span>
                        </div>
                      )}

                      {/* Hero Mockup */}
                      <div className="flex-1 overflow-hidden relative" style={{
                          background: template.styles.hero === 'gradient'
                            ? `linear-gradient(135deg, ${template.styles.primaryColor || '#10b981'}, #0f172a)`
                            : template.styles.background === 'dots' ? '#111827' : '#0f172a'
                        }}>
                        {template.styles.hero === 'split' ? (
                          <div className="flex h-full">
                            <div className="flex-1 flex flex-col justify-center px-4 gap-1">
                              <div className="w-1/2 h-3 bg-white/90 rounded" />
                              <div className="w-2/3 h-2 rounded mt-1" style={{ backgroundColor: template.styles.primaryColor || '#10b981' }} />
                              <div className="w-full h-1 bg-white/30 mt-2" />
                              <div className="w-5/6 h-1 bg-white/20" />
                            </div>
                            <div className="w-1/3 h-full" style={{ backgroundColor: `${template.styles.primaryColor || '#10b981'}30` }} />
                          </div>
                        ) : template.styles.hero === 'minimal' ? (
                          <div className="flex flex-col justify-center h-full px-4 gap-1">
                            <div className="w-2/3 h-4 bg-white/80 rounded font-light" />
                            <div className="w-1/2 h-3 bg-white/40 rounded mt-1" />
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full gap-1 px-4 text-center">
                            <div className="w-1/2 h-4 bg-white/90 rounded" />
                            <div className="w-1/3 h-2 rounded mt-1" style={{ backgroundColor: template.styles.primaryColor || '#10b981' }} />
                            <div className="w-3/4 h-1 bg-white/30 mt-2" />
                            <div className="w-1/2 h-1 bg-white/20" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between mb-1.5">
                      <h3 className="font-bold text-base text-slate-900 dark:text-white">{template.name}</h3>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded text-white" style={{ backgroundColor: template.styles.primaryColor || '#10b981' }}>
                        {template.category}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-3">{template.description}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      {[template.styles.hero, template.styles.experience, template.styles.background].map((tag) => (
                        <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 font-medium">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default TemplatesPage;
