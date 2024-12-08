import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

const IssuesActions = () => {
  return (
    <div className='mb-5'>
    <Button><Link href="/issues/new"></Link>New Issue</Button>
  </div>
  )
}

export default IssuesActions