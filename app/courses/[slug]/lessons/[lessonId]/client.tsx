'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Course, Lesson } from '@/lib/courses'
import CodeBlock from '@/components/code-block'

interface LessonClientContentProps {
  slug: string
  lessonId: string
  course: Course
  lesson: Lesson
  previousLesson: Lesson | null
  nextLesson: Lesson | null
}

export default function LessonClientContent({
  slug,
  lessonId,
  course,
  lesson,
  previousLesson,
  nextLesson
}: LessonClientContentProps) {
  return (
    <div className="flex gap-0 min-h-screen bg-background">
      {/* Sidebar */}
      <LessonSidebar course={course} currentLessonId={lessonId} slug={slug} />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Lesson Header */}
          <div className="mb-12 space-y-4">
            <Link 
              href={`/courses/${slug}`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to {course.title}
            </Link>
            <h1 className="text-4xl font-bold">{lesson.title}</h1>
            <p className="text-lg text-muted-foreground">{lesson.description}</p>
          </div>

          {/* Lesson Content */}
          <div className="space-y-12 mb-16">
            {lesson.sections.map((section, index) => (
              <div key={section.id} className="space-y-4">
                {section.type !== 'code' && section.type !== 'exercise' && (
                  <h2 className="text-2xl font-bold flex items-center gap-3">
                    <span className="text-primary">#{index + 1}</span>
                    {section.title}
                  </h2>
                )}

                {section.type === 'text' && (
                  <div className="text-muted-foreground leading-relaxed space-y-4">
                    {section.content.split('\n\n').map((paragraph, idx) => (
                      <p key={idx} className="text-base">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}

                {section.type === 'code' && (
                  <div className="my-6">
                    <CodeBlock code={section.content} language="bash" />
                  </div>
                )}

                {section.type === 'exercise' && (
                  <ExerciseComponent content={section.content} />
                )}
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="border-t border-border pt-8 flex items-center justify-between">
            {previousLesson ? (
              <Link
                href={`/courses/${slug}/lessons/${previousLesson.id}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:border-primary hover:text-primary transition-colors"
              >
                ← {previousLesson.title}
              </Link>
            ) : (
              <div />
            )}

            {nextLesson ? (
              <Link
                href={`/courses/${slug}/lessons/${nextLesson.id}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-primary bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
              >
                {nextLesson.title} →
              </Link>
            ) : (
              <Link
                href={`/courses/${slug}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-primary bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
              >
                Back to Course
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

interface SidebarProps {
  course: Course
  currentLessonId: string
  slug: string
}

function LessonSidebar({ course, currentLessonId, slug }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-20 left-4 z-40 p-2 rounded-lg bg-primary text-primary-foreground"
        aria-label="Toggle sidebar"
      >
        ≡
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static left-0 top-16 w-64 h-[calc(100vh-4rem)] border-r border-border bg-card/50 overflow-y-auto transition-all duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } z-30`}
      >
        <div className="p-6 space-y-6">
          {/* Course Header */}
          <div>
            <Link href={`/courses/${slug}`} className="text-sm font-semibold hover:text-primary transition-colors">
              {course.title}
            </Link>
            <p className="text-xs text-muted-foreground mt-1">{course.lessons.length} lessons</p>
          </div>

          {/* Lessons */}
          <nav className="space-y-2">
            {course.lessons.map((lesson, index: number) => (
              <Link
                key={lesson.id}
                href={`/courses/${slug}/lessons/${lesson.id}`}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                  currentLessonId === lesson.id
                    ? 'bg-primary text-primary-foreground font-semibold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <span className="font-semibold">{String(index + 1).padStart(2, '0')}.</span> {lesson.title}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}

function ExerciseComponent({ content }: { content: string }) {
  const [code, setCode] = useState(content)
  const [result, setResult] = useState('')
  const [isExecuting, setIsExecuting] = useState(false)
  const [hasError, setHasError] = useState(false)

  const runCode = () => {
    setIsExecuting(true)
    setHasError(false)
    try {
      // Simple code execution using console log capture
      const logs: string[] = []
      const originalLog = console.log
      const originalError = console.error

      console.log = (...args: any[]) => {
        logs.push(args.join(' '))
      }

      console.error = (...args: any[]) => {
        logs.push('ERROR: ' + args.join(' '))
        setHasError(true)
      }

      // Evaluate the code
      ;(0, eval)(code)

      console.log = originalLog
      console.error = originalError

      if (logs.length === 0) {
        setResult('✓ Code executed successfully!')
      } else {
        setResult(logs.join('\n'))
      }
    } catch (error: any) {
      setHasError(true)
      setResult(`✗ Error: ${error.message}`)
    }
    setIsExecuting(false)
  }

  const resetCode = () => {
    setCode(content)
    setResult('')
    setHasError(false)
  }

  return (
    <div className="space-y-4 my-6 bg-card/30 p-6 rounded-lg border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">Interactive Exercise</h3>
        <button
          onClick={resetCode}
          className="text-xs px-3 py-1 rounded bg-muted text-muted-foreground hover:text-foreground transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold">Your Code:</label>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-48 p-4 rounded-lg bg-muted border border-border text-foreground font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Write your code here..."
          spellCheck="false"
        />
      </div>

      <button
        onClick={runCode}
        disabled={isExecuting}
        className="w-full px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {isExecuting ? (
          <>
            <span className="inline-block animate-spin">⟳</span>
            Running...
          </>
        ) : (
          '▶ Run Code'
        )}
      </button>

      {result && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <label className="text-sm font-semibold">Output:</label>
            {hasError ? (
              <span className="text-xs px-2 py-1 rounded bg-red-900/20 text-red-400">Error</span>
            ) : (
              <span className="text-xs px-2 py-1 rounded bg-green-900/20 text-green-400">Success</span>
            )}
          </div>
          <div className={`p-4 rounded-lg border text-foreground font-mono text-sm min-h-12 max-h-32 overflow-y-auto whitespace-pre-wrap break-words ${
            hasError 
              ? 'bg-red-900/10 border-red-900/30' 
              : 'bg-green-900/10 border-green-900/30'
          }`}>
            {result}
          </div>
        </div>
      )}
    </div>
  )
}
