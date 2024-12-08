import React from 'react'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import { Box, Button, Card, Flex, Grid, Heading } from '@radix-ui/themes'
import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import ReactMarkDown from 'react-markdown'
import delay from 'delay'
import { Pencil2Icon	 } from '@radix-ui/react-icons'
import Link from 'next/link'

interface Props{
    params: {id:string}
}

const IssueDetailPage = async ({params}:Props) => {
    //if(typeof params.id !== 'number') notFound();
    const issue = await prisma.issues.findUnique({
        where: {id: parseInt(params.id)}
    });
    await delay(2000);
    if(!issue) notFound();
  return (
    <div>
      <Grid columns={{initial:'1', md:'2'}} gap='5'>
        <Box>
          <Heading>{issue.title}</Heading>
          <Flex gap='5'><IssueStatusBadge status={issue.status}></IssueStatusBadge>{issue.status}{issue.createdAt.toDateString()}</Flex>
          <Card className='prose' mt='4'><ReactMarkDown>{issue.description}</ReactMarkDown></Card>
        </Box>
        <Box>
          <Button>
            <Pencil2Icon />
            <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
          </Button>
        </Box>
      </Grid>

    </div>
  )
}

export default IssueDetailPage