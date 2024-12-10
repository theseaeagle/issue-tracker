import { Status } from '@prisma/client';
import { Badge, Flex } from '@radix-ui/themes';
import React from 'react'
//import { PropsWithChildren } from 'react'

const statusMap : Record<Status, {label:string,color:'red'|'violet'|'green'}> = {
    OPEN : {label: 'Open', color: 'red'},
    IN_PROGRESS : {label: 'In Progress', color: 'violet'},
    CLOSED : {label: 'Closed', color:'green'},
}
const IssueStatusBadge = ({status}:{status:Status}) => {
//if(!status) return null;
  return (
    <Flex gap="2">
        <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
    </Flex>
  )
}

export default IssueStatusBadge