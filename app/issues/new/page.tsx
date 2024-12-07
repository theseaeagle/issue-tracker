'use client';
import { Box, Button, Callout,Text, Container, TextArea, TextField, ThemePanel } from '@radix-ui/themes';
import React, { useState } from 'react';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, SubmitHandler, Controller, Form } from "react-hook-form";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchemas';
import {z} from 'zod';



const NewIssuePage = () => {
    const router = useRouter();
    // type Inputs = {
    //     title: string
    //     description: string
    //   }

    type IssueForm = z.infer<typeof createIssueSchema>

    const {
        register,
        control,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm<IssueForm>({resolver:zodResolver(createIssueSchema)})

      const [error,setError] = useState('');
  return (
    <>
    <div>
        {error &&
            <div className='max-w-xl px-5 space-y-3 my-5'>
                <Callout.Root color="red" >
                    <Callout.Icon>
                        <InfoCircledIcon />
                    </Callout.Icon>
                    <Callout.Text>
                        {errors.title?.message}
                    </Callout.Text>
                </Callout.Root>
            </div>
        }
        <form className='max-w-xl px-5 space-y-3' onSubmit={handleSubmit(async (data)=> {
            try {
                await axios.post('/api/issues',data); 
                router.push('/issues');
            } catch (error) {
                setError('An unexpected error occured!')
            }
            
            })}>
                
            <TextField.Root {...register("title", { required: true })} placeholder="Search the docs…"></TextField.Root>
            {errors.title && <Text color="red">{errors.title.message}</Text>}

            <Controller
                    name="description"
                    control={control}
                    render={({ field }) => <SimpleMDE {...field}/>}
                />
            {errors.description && <Text color="red" as="p">{errors.description.message}</Text>}
            <Button type="submit">Add Issue</Button>
        </form>    
    </div>
    </>
  )
}

export default NewIssuePage