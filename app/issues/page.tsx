import { Button, Table } from '@radix-ui/themes'
import React from 'react'
import prisma  from '@/prisma/client'
import { NextResponse } from 'next/server'
import Link from 'next/link'
const  IssuesPage = async() => {
  const issues= await prisma.issues.findMany()
  return (
    <>
    <div className='mb-5'>
      <Button><Link href="/issues/new"></Link>New Issue</Button>
    </div>
    <Table.Root variant='surface'>
      <Table.Header>
        <Table.Row>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Description</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Created At</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map(issue =>( 
          <Table.Row key={issue.id}>
            <Table.Cell>{issue.title}<div className='block md:hidden'>{issue.status}</div></Table.Cell>
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