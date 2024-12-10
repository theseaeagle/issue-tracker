import { IssueStatusBadge } from '@/app/components'
import { Card,Text, Flex, Heading } from '@radix-ui/themes'
import React from 'react'
import ReactMarkDown from 'react-markdown'
import { Issues } from '@prisma/client'


const IssueDetails = ({issue}:{issue:Issues}) => {
  return (
    <>
        <Heading>{issue.title}</Heading>
        <Flex gap='5'>
            <IssueStatusBadge status={issue.status}></IssueStatusBadge>{issue.status}<Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card className='prose' mt='4'>
            <ReactMarkDown>{issue.description}</ReactMarkDown>
        </Card>
    </>
  )
}

export default IssueDetails