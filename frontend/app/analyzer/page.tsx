'use client'

import { useState } from 'react'
import axios from 'axios'

interface AnalyzeResult {
  severity: string
  problem: string
  recommendation: string
}

export default function AnalyzerPage() {

  const [log, setLog] = useState('')
  const [result, setResult] = useState<AnalyzeResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'

  async function analyze() {

    if (!log.trim()) {
      setError('Please paste logs first.')
      return
    }

    setLoading(true)
    setError('')
    setResult(null)
    setNotice('')

    try {

      const response = await axios.post(
        `${apiBaseUrl}/analyzer/analyze`,
        {
          content: log
        },
        { timeout: 30000 }
      )

      setResult(response.data)

    } catch (err: any) {

      console.error(err)

      setError(
        err?.response?.data?.detail ||
        'Analyzer request failed.'
      )

    } finally {
      setLoading(false)
    }
  }

  function saveReport() {
    if (!result) return
    localStorage.setItem('analyzer:last-report', JSON.stringify({ createdAt: new Date().toISOString(), log, result }))
    setNotice('Report saved locally in your browser.')
  }

  function exportJson() {
    if (!result) return
    const blob = new Blob([JSON.stringify({ log, result }, null, 2)], { type: 'application/json' })
    const href = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = href
    a.download = `analyzer-report-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(href)
    setNotice('JSON exported successfully.')
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="mb-12">

          <div className="inline-flex items-center border border-green-500 text-green-400 rounded-full px-4 py-2 text-sm mb-6">
            AI DIAGNOSTICS
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            AI Log Analyzer
          </h1>

          <p className="text-zinc-400 text-lg max-w-3xl">
            Analyze Linux, Docker, Proxmox and infrastructure logs in seconds.
            Detect failures, understand errors and receive remediation steps.
          </p>
        </div>

        {/* CONTENT */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

          {/* INPUT */}

          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6">

            <div className="flex items-center justify-between mb-4">

              <div>
                <h2 className="text-2xl font-bold">
                  Input Logs
                </h2>

                <p className="text-zinc-500 text-sm mt-1">
                  Paste logs, errors or diagnostics output.
                </p>
              </div>

              <div className="text-zinc-600 text-sm">
                {log.length} chars
              </div>
            </div>

            <textarea
              value={log}
              onChange={(e) => setLog(e.target.value)}
              placeholder={`Example:

kernel: I/O error, dev sda
ZFS pool degraded
docker exited with code 137
Proxmox task failed
SMART failure predicted
`}
              className="
                w-full
                h-[500px]
                bg-black
                border
                border-zinc-800
                rounded-2xl
                p-5
                resize-none
                text-sm
                font-mono
                outline-none
                focus:border-zinc-600
              "
            />

            {error && (
              <div className="mt-4 border border-red-900 bg-red-950/30 text-red-400 rounded-xl p-4">
                {error}
              </div>
            )}

            {notice && (
              <div className="mt-4 border border-emerald-900 bg-emerald-950/30 text-emerald-400 rounded-xl p-4">
                {notice}
              </div>
            )}

            <div className="mt-6 flex gap-4">

              <button
                onClick={analyze}
                disabled={loading}
                className="
                  bg-white
                  text-black
                  px-8
                  py-4
                  rounded-xl
                  font-semibold
                  hover:opacity-90
                  transition
                  disabled:opacity-50
                "
              >
                {loading
                  ? 'Analyzing...'
                  : 'Analyze Logs'}
              </button>

              <button
                onClick={() => {
                  setLog('')
                  setResult(null)
                  setError('')
                  setNotice('')
                }}
                className="
                  border
                  border-zinc-700
                  px-8
                  py-4
                  rounded-xl
                  hover:bg-zinc-900
                  transition
                "
              >
                Clear
              </button>
            </div>
          </div>

          {/* RESULT */}

          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6">

            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">
                Analysis Result
              </h2>

              <p className="text-zinc-500 text-sm">
                AI-generated diagnostics and recommendations.
              </p>
            </div>

            {!result && !loading && (
              <div className="
                h-[500px]
                border
                border-dashed
                border-zinc-800
                rounded-2xl
                flex
                items-center
                justify-center
                text-zinc-600
              ">
                Waiting for analysis...
              </div>
            )}

            {loading && (
              <div className="
                h-[500px]
                flex
                items-center
                justify-center
              ">
                <div className="text-zinc-400 text-lg">
                  Processing logs...
                </div>
              </div>
            )}

            {result && (
              <div className="space-y-8">

                {/* Severity */}

                <div>

                  <div className="text-zinc-500 mb-2">
                    Severity
                  </div>

                  <div className={`
                    inline-flex
                    px-4
                    py-2
                    rounded-xl
                    text-lg
                    font-bold
                    ${
                      result.severity === 'high'
                        ? 'bg-red-950 text-red-400 border border-red-900'
                        : result.severity === 'medium'
                        ? 'bg-yellow-950 text-yellow-400 border border-yellow-900'
                        : 'bg-green-950 text-green-400 border border-green-900'
                    }
                  `}>
                    {result.severity.toUpperCase()}
                  </div>
                </div>

                {/* Problem */}

                <div>

                  <div className="text-zinc-500 mb-2">
                    Problem
                  </div>

                  <div className="
                    bg-black
                    border
                    border-zinc-800
                    rounded-2xl
                    p-5
                    text-lg
                    leading-relaxed
                  ">
                    {result.problem}
                  </div>
                </div>

                {/* Recommendation */}

                <div>

                  <div className="text-zinc-500 mb-2">
                    Recommendation
                  </div>

                  <div className="
                    bg-black
                    border
                    border-zinc-800
                    rounded-2xl
                    p-5
                    leading-relaxed
                    text-zinc-300
                  ">
                    {result.recommendation}
                  </div>
                </div>

                {/* Actions */}

                <div className="pt-4 border-t border-zinc-800">

                  <div className="flex gap-4">

                    <button className="
                      bg-white
                      text-black
                      px-6
                      py-3
                      rounded-xl
                      font-semibold
                    " onClick={saveReport}>
                      Save Report
                    </button>

                    <button className="
                      border
                      border-zinc-700
                      px-6
                      py-3
                      rounded-xl
                    " onClick={exportJson}>
                      Export JSON
                    </button>
                  </div>
                </div>

              </div>
            )}

          </div>
        </div>
      </div>
    </main>
  )
}
