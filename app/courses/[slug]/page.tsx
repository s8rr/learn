import Link from 'next/link'
import { getCourseBySlug } from '@/lib/courses'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function CoursePage({ params }: Props) {
  const { slug } = await params
  const course = getCourseBySlug(slug)

  if (!course) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      {/* Course Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/10 to-transparent border-b border-border">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-primary uppercase tracking-wide px-3 py-1 rounded-full bg-primary/10">
                {course.category}
              </span>
              <span className="text-xs font-semibold text-muted-foreground uppercase px-3 py-1 rounded-full bg-muted capitalize">
                {course.difficulty}
              </span>
            </div>
            <h1 className="text-5xl font-bold">{course.title}</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">{course.description}</p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="text-lg">📚</span>
                <span>{course.lessons.length} lessons</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">⏱️</span>
                <span>{course.estimatedTime} estimated</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lessons List with Sidebar */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold mb-8">Course Lessons</h2>
            <div className="space-y-4">
              {course.lessons.map((lesson, index) => (
                <Link
                  key={lesson.id}
                  href={`/courses/${slug}/lessons/${lesson.id}`}
                  className="group"
                >
                  <div className="p-6 rounded-lg border border-border bg-card hover:border-primary hover:bg-card/50 transition-all duration-300 cursor-pointer">
                    <div className="flex items-start gap-4">
                      {/* Lesson Number */}
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <span className="text-lg font-bold text-primary">{String(index + 1).padStart(2, '0')}</span>
                      </div>

                      {/* Lesson Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold group-hover:text-primary transition-colors mb-2">
                          {lesson.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {lesson.description}
                        </p>
                        <div className="text-xs text-muted-foreground">
                          {lesson.sections.length} sections
                        </div>
                      </div>

                      {/* Arrow */}
                      <div className="flex-shrink-0 text-muted-foreground group-hover:text-primary transition-colors">
                        <span className="text-xl">→</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 rounded-lg border border-border bg-card p-6 space-y-6">
              {/* Course Stats */}
              <div className="space-y-4">
                <div className="pb-4 border-b border-border">
                  <p className="text-xs text-muted-foreground uppercase font-semibold mb-2">Duration</p>
                  <p className="text-2xl font-bold">{course.estimatedTime}</p>
                </div>
                <div className="pb-4 border-b border-border">
                  <p className="text-xs text-muted-foreground uppercase font-semibold mb-2">Total Lessons</p>
                  <p className="text-2xl font-bold">{course.lessons.length}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-semibold mb-2">Difficulty</p>
                  <p className="capitalize font-semibold text-primary">{course.difficulty}</p>
                </div>
              </div>

              {/* Call to Action */}
              <Link
                href={`/courses/${slug}/lessons/${course.lessons[0].id}`}
                className="block w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-center hover:opacity-90 transition-opacity"
              >
                Get Started
              </Link>

              {/* Course Info */}
              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Begin with the first lesson and progress through the course at your own pace. All lessons are free and accessible to everyone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  )
}
