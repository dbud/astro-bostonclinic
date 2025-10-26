import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Join } from '@/components/ui/join'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { splitAt } from '@/lib/split-at'
import { type Page } from '@/types/form'

import RenderSection from './RenderSection'
import { Invalid } from './Required'
import useFormState from './useFormState'

function PageContent({ page }: { page: Page }) {
  const { pages, currentPage } = useFormState()
  const progress = (currentPage + 1) / pages * 100
  return (
    <>
      <CardHeader>
        <div className="flex items-center gap-4 opacity-40 text-sm mb-4">
          <span className="flex-shrink-0">
            {currentPage + 1}
            {' '}
            /
            {' '}
            {pages}
          </span>
          <Progress value={progress} />
        </div>
        <CardTitle className="text-2xl">{page.page}</CardTitle>
        {page.description && (
          <CardDescription>{page.description}</CardDescription>
        )}
      </CardHeader>
      <Separator />
      <Join
        items={splitAt(
          page.sections,
          section => section.type === 'separator',
        ).map(sections => (
          <CardContent className="flex flex-col gap-2">
            {sections.map((section, i) => (
              <RenderSection section={section} first={i === 0} key={i} />
            ))}
          </CardContent>
        ))}
        separator={<Separator />}
      />
    </>
  )
}

type PageProps = {
  page: Page
  onBack?: () => void
  onNext?: () => void
  onSubmit?: () => void
  submitPlaceholder?: React.ReactNode
  submitting: boolean
}

export default function Page({ page, onBack, onNext, onSubmit, submitPlaceholder, submitting }: PageProps) {
  const { validate } = useFormState()

  const valid = page.sections
    .filter(section => section.type === 'fields')
    .flatMap(section => section.fields)
    .every(validate)
    || true /* TODO: REMOVE THIS */

  return (
    <Card className="max-w-xl">
      <PageContent page={page} />
      <Separator />
      {!valid
        && (
          <CardFooter className="flex justify-end">
            <Invalid><span className="text-sm">Questions marked with asterisk are required</span></Invalid>
          </CardFooter>
        )}
      <CardFooter className="flex justify-between">
        {onBack && (
          <Button variant="secondary" onClick={onBack}>
            <ArrowLeftIcon />
            {' '}
            Back
          </Button>
        )}
        {onNext && (
          <Button className="ml-auto" onClick={onNext} disabled={!valid} variant={valid ? 'default' : 'outline'}>
            Next
            {' '}
            <ArrowRightIcon />
          </Button>
        )}
        {submitPlaceholder}
        {onSubmit && (
          <Button onClick={onSubmit} disabled={!valid || submitting} variant={valid ? 'default' : 'outline'}>
            {submitting && <Loader2 className="animate-spin" />}
            Submit
            {' '}
            <CheckIcon />
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
