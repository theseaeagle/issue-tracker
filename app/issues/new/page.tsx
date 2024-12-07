import { Box, Button, Container, TextArea, TextField } from '@radix-ui/themes'
import React from 'react'

const NewIssuePage = () => {
  return (
    <>
    <div className='max-w-xl px-5 space-y-3'>
        <TextField.Root placeholder="Search the docs…"></TextField.Root>
        <TextArea placeholder="Reply to comment…" />
        <Button>Add Issue</Button>
    </div>
    </>
  )
}

export default NewIssuePage