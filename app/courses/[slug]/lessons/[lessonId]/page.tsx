import Link from 'next/link'
import { getCourseBySlug, getLessonById } from '@/lib/courses'
import { notFound } from 'next/navigation'
import LessonClientContent from './client'

interface Props {
  params: Promise<{ slug: string; lessonId: string }>
}

export default async function LessonPage({ params }: Props) {
  const { slug, lessonId } = await params
  const course = getCourseBySlug(slug)
  const lesson = getLessonById(slug, lessonId)

  if (!course || !lesson) {
    notFound()
  }

  const lessonIndex = course.lessons.findIndex(l => l.id === lessonId)
  const previousLesson = lessonIndex > 0 ? course.lessons[lessonIndex - 1] : null
  const nextLesson = lessonIndex < course.lessons.length - 1 ? course.lessons[lessonIndex + 1] : null

  return (
    <LessonClientContent 
      slug={slug}
      lessonId={lessonId}
      course={course}
      lesson={lesson}
      previousLesson={previousLesson}
      nextLesson={nextLesson}
    />
  )
}
