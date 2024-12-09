import React from 'react'
import IssueForm from '../../_components/IssueForm'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'

interface Props{
 params:{id:string}
}
const IssueEditPage = async ({params}: Props) => {
    const issue = await prisma.issues.findUnique({
        where:{id:  parseInt(params.id)}
    });
    if(!issue) notFound();
  return (
   <IssueForm issue={issue}></IssueForm>
  )
}

export default IssueEditPage