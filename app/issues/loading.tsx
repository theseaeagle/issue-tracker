import { Table } from '@radix-ui/themes'
import React from 'react'
import IssueStatusBadge from '../components/IssueStatusBadge'
import prisma from '@/prisma/client'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import IssuesActions from './issuesAction'

const LoadingIssuesPage = async () => {
  //const issues= await prisma.issues.findMany()
  const issues=[1,2,3,4]
  return (
    <>
    <IssuesActions />
    <Table.Root variant='surface'>
      <Table.Header>
        <Table.Row>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Description</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Created At</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map(issue =>( 
          <Table.Row key={issue}>
            <Table.Cell><Skeleton /><div className='block md:hidden'><Skeleton /></div></Table.Cell>
            <Table.Cell className='hidden md:table-cell'><Skeleton /></Table.Cell>
            <Table.Cell className='hidden md:table-cell'><Skeleton /></Table.Cell>
            <Table.Cell className='hidden md:table-cell'><Skeleton /></Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
    </>
  )
}

export default LoadingIssuesPage