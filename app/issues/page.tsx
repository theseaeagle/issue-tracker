import { Button, Table } from '@radix-ui/themes'
import React from 'react'
import prisma  from '@/prisma/client'
import { NextResponse } from 'next/server'
import Link from 'next/link'
import IssueStatusBadge from '../components/IssueStatusBadge'
import delay from 'delay' //simulate slow server
import IssuesActions from './issuesAction'

const  IssuesPage = async() => {
  const issues= await prisma.issues.findMany()
  await delay(2000);
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
          <Table.Row key={issue.id}>
            <Table.Cell><Link href={`/issues/${issue.id}`}>{issue.title}</Link><div className='block md:hidden'><IssueStatusBadge status={issue.status}></IssueStatusBadge></div></Table.Cell>
            <Table.Cell className='hidden md:table-cell'><IssueStatusBadge status={issue.status}></IssueStatusBadge></Table.Cell>
            <Table.Cell className='hidden md:table-cell'>{issue.description}</Table.Cell>
            <Table.Cell className='hidden md:table-cell'>{issue.createdAt.toDateString()}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
   </>
  )
}

export default IssuesPage