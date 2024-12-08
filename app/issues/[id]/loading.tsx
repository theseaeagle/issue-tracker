import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import { Heading, Flex, Card, Box } from '@radix-ui/themes'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const LoadingIssueDetailPage = () => {
  return (
    <Box>
        <Skeleton />
        <Flex gap='5'>
            <Skeleton width='5rem'/>
            <Skeleton width='8rem'/>
        </Flex>
        <Card className='prose' mt='4'>
            <Skeleton count={3} />
        </Card>
    </Box>
  )
}

export default LoadingIssueDetailPage