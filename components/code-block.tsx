'use client'

import { useState } from 'react'

interface CodeBlockProps {
  code: string
  language?: string
  showCopy?: boolean
}

export default function CodeBlock({ code, language = 'javascript', showCopy = true }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-lg overflow-hidden border border-border bg-muted">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card/50">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{language}</span>
        {showCopy && (
          <button
            onClick={copyToClipboard}
            className="text-xs px-2 py-1 rounded bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}
      </div>

      {/* Code */}
      <pre className="p-4 overflow-x-auto text-sm font-mono text-foreground leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  )
}
