import React from 'react'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import { Card, Flex, Heading } from '@radix-ui/themes'
import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import ReactMarkDown from 'react-markdown'

interface Props{
    params: {id:string}
}

const IssueDetailPage = async ({params}:Props) => {
    //if(typeof params.id !== 'number') notFound();
    const issue = await prisma.issues.findUnique({
        where: {id: parseInt(params.id)}
    });
    if(!issue) notFound();
  return (
    <div>
        <Heading>{issue.title}</Heading>
        <Flex gap='5'><IssueStatusBadge status={issue.status}></IssueStatusBadge>{issue.status}{issue.createdAt.toDateString()}</Flex>
        <Card className='prose' mt='4'><ReactMarkDown>{issue.description}</ReactMarkDown></Card>

    </div>
  )
}

export default IssueDetailPage