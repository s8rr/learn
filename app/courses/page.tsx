'use client'

import Link from 'next/link'
import { useState } from 'react'
import { courses } from '@/lib/courses'

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null)

  // Get unique categories and difficulties
  const categories = Array.from(new Set(courses.map(c => c.category)))
  const difficulties = Array.from(new Set(courses.map(c => c.difficulty)))

  // Filter courses
  const filteredCourses = courses.filter(course => {
    const matchesCategory = !selectedCategory || course.category === selectedCategory
    const matchesDifficulty = !selectedDifficulty || course.difficulty === selectedDifficulty
    return matchesCategory && matchesDifficulty
  })

  return (
    <div className="min-h-screen">
      {/* Banner */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/20 via-primary/10 to-background border-b border-primary/20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl translate-y-1/2"></div>
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <h1 className="text-5xl sm:text-6xl font-bold mb-4 text-balance">All Courses</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'} available to help you master development fundamentals.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-8 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="sticky top-20 space-y-6">
            {/* Category Filter */}
            <div className="space-y-3">
              <h3 className="font-semibold text-sm uppercase tracking-wide">Category</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedCategory === null
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                >
                  All Categories
                </button>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedCategory === cat
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Filter */}
            <div className="space-y-3 border-t border-border pt-6">
              <h3 className="font-semibold text-sm uppercase tracking-wide">Difficulty</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedDifficulty(null)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedDifficulty === null
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                >
                  All Levels
                </button>
                {difficulties.map(diff => (
                  <button
                    key={diff}
                    onClick={() => setSelectedDifficulty(diff)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors capitalize ${
                      selectedDifficulty === diff
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Courses Grid */}
        <div className="flex-1">
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCourses.map(course => (
                <Link
                  key={course.id}
                  href={`/courses/${course.slug}`}
                  className="group"
                >
                  <div className="h-full rounded-lg border border-border bg-card hover:border-primary transition-all duration-300 overflow-hidden hover:shadow-lg hover:shadow-primary/10 flex flex-col">
                    {/* Course Image/Header */}
                    <div className="h-40 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center relative overflow-hidden">
                      <div className="text-8xl opacity-20 group-hover:scale-110 transition-transform duration-300">
                        {course.title.charAt(0)}
                      </div>
                    </div>

                    {/* Course Info */}
                    <div className="p-6 flex-1 flex flex-col space-y-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-xs font-semibold text-primary uppercase tracking-wide">
                            {course.category}
                          </p>
                          <span className="text-xs font-semibold text-muted-foreground uppercase px-2 py-1 rounded bg-muted capitalize">
                            {course.difficulty}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                          {course.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {course.description}
                        </p>
                      </div>

                      {/* Course Meta */}
                      <div className="flex items-center justify-between pt-4 border-t border-border text-xs text-muted-foreground">
                        <span>{course.lessons.length} lessons</span>
                        <span>{course.estimatedTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No courses match your filters. Try adjusting your selection.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
