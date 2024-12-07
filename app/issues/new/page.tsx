'use client';
import { Box, Button, Callout, Container, TextArea, TextField, ThemePanel } from '@radix-ui/themes';
import React, { useState } from 'react';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { InfoCircledIcon } from '@radix-ui/react-icons';



const NewIssuePage = () => {
    const router = useRouter();
    type Inputs = {
        title: string
        description: string
      }

    const {
        register,
        control,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm<Inputs>()

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
                        {error}
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
            <Controller 
            name = 'description'
            control = {control}
            render = {({field})=><SimpleMDE {...field}/>}
            ></Controller>
            <Button type="submit">Add Issue</Button>
        </form>    
    </div>
    </>
  )
}

export default NewIssuePage