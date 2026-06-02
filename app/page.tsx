'use client'

import Link from 'next/link'
import { courses } from '@/lib/courses'

export default function Page() {
  const featuredCourses = courses.slice(0, 3)

  return (
    <div>
      {/* Hero Section */}
      <section className="min-h-[600px] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl font-bold text-balance leading-tight">
              Learn <span className="text-primary">Development</span> Fundamentals
            </h1>
            <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto leading-relaxed">
              Free and open learning platform. Master Git, HTML, CSS, JavaScript, CI/CD, and more. Start your coding journey today.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link 
              href="/courses" 
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
            >
              Explore Courses
            </Link>
            <a 
              href="#featured" 
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg border border-border text-foreground hover:bg-muted transition-colors"
            >
              Learn More
            </a>
          </div>

          <div className="pt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <span>✓</span>
            <span>100% Free</span>
            <span className="text-border">•</span>
            <span>✓</span>
            <span>Open Source</span>
            <span className="text-border">•</span>
            <span>✓</span>
            <span>No Sign-up Required</span>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section id="featured" className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold">Featured Courses</h2>
            <p className="text-muted-foreground text-lg">Start learning with our most popular courses</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.map(course => (
              <Link
                key={course.id}
                href={`/courses/${course.slug}`}
                className="group"
              >
                <div className="h-full rounded-lg border border-border bg-card hover:border-primary transition-all duration-300 overflow-hidden hover:shadow-lg hover:shadow-primary/10">
                  <div className="h-32 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <div className="text-6xl opacity-20">{course.title.charAt(0)}</div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-primary uppercase tracking-wide">{course.category}</p>
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{course.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <span className="text-xs font-semibold text-muted-foreground uppercase">
                        {course.difficulty}
                      </span>
                      <span className="text-xs text-muted-foreground">{course.estimatedTime}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/courses" 
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all"
            >
              View All Courses →
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <p className="text-4xl font-bold text-primary">{courses.length}</p>
              <p className="text-muted-foreground">Courses Available</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-primary">{courses.reduce((sum, c) => sum + c.lessons.length, 0)}</p>
              <p className="text-muted-foreground">Total Lessons</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-primary">100%</p>
              <p className="text-muted-foreground">Free Forever</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
