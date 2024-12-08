import React from 'react'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import { Box, Button, Card, Flex, Grid, Heading } from '@radix-ui/themes'
import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import ReactMarkDown from 'react-markdown'
import delay from 'delay'
import { Pencil2Icon	 } from '@radix-ui/react-icons'
import Link from 'next/link'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'

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
         <IssueDetails issue={issue} />
        </Box>
        <Box>
            <EditIssueButton issueId={issue.id} />
        </Box>
      </Grid>

    </div>
  )
}

export default IssueDetailPage