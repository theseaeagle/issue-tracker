import { Box } from '@radix-ui/themes'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const LoadingNewIssuePage = () => {
  return (
    <Box>
        <Skeleton></Skeleton>
        <Skeleton height={30}></Skeleton>
    </Box>
  )
}

export default LoadingNewIssuePage