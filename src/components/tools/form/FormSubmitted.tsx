import { ArrowLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export default function FormSubmitted() {
  return (
    <Card className="max-w-xl">
      <CardHeader>
        <CardTitle className="text-2xl">Thank you!</CardTitle>
      </CardHeader>
      <CardContent>
        We’ll be in touch soon.
      </CardContent>
      <Separator />
      <CardContent>
        <Button asChild>
          <a href="/" className="flex items-center gap-2">
            <ArrowLeft />
            Back to home page
          </a>
        </Button>
      </CardContent>
    </Card>
  )
}
