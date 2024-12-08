'use client';
import dynamic from 'next/dynamic';
import { Box, Button, Callout,Text, Container, TextArea, TextField, ThemePanel } from '@radix-ui/themes';
import React, { useState } from 'react';
//import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, SubmitHandler, Controller, Form } from "react-hook-form";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchemas';
import {z} from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';

const SimpleMDE = dynamic(()=>
    import('react-simplemde-editor'),{ssr:false}
)

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
      const[isSubmitting, setSubmitting] = useState(false);

      const onSubmit = handleSubmit(async (data)=> {
            try {
                setSubmitting(true);
                await axios.post('/api/issues',data); 
                router.push('/issues');
            } catch (error) {
                setError('An unexpected error occured!')
                setSubmitting(false);
            }
            
     });
      
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
        <form className='max-w-xl px-5 space-y-3' onSubmit={onSubmit}>
            <TextField.Root {...register("title", { required: true })} placeholder="Search the docs…"></TextField.Root>
            {/* {errors.title && <Text color="red">{errors.title.message}</Text>} */}
            {/* {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>} */}
            <ErrorMessage>{errors.title?.message}</ErrorMessage>

            <Controller
                    name="description"
                    control={control}
                    render={({ field }) => <SimpleMDE {...field}/>}
                />
            <ErrorMessage>{errors.description?.message}</ErrorMessage>
            
            <Button type="submit" disabled={isSubmitting}>Add Issue {isSubmitting && <Spinner />}</Button>
        </form>    
    </div>
    </>
  )
}

export default NewIssuePage