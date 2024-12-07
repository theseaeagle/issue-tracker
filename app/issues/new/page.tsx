'use client';
import { Box, Button, Container, TextArea, TextField, ThemePanel } from '@radix-ui/themes'
import React from 'react'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const NewIssuePage = () => {
  return (
    <>
    <div className='max-w-xl px-5 space-y-3'>
        <TextField.Root placeholder="Search the docs…"></TextField.Root>
        <SimpleMDE />
        <Button>Add Issue</Button>
        
    </div>
    </>
  )
}

export default NewIssuePage