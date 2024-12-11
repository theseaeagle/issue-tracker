import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { Box, Flex, Grid } from "@radix-ui/themes";
import delay from "delay";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";

// interface Props{
//     params: {id:string}
// }

// const IssueDetailPage = async ({params}:Props) => {
//     await params
//     //if(typeof params.id !== 'number') notFound();
//     const issue = await prisma.issues.findUnique({
//         where: {id: parseInt(params.id)}
//     });
//     await delay(2000);
//     if(!issue) notFound();
//   return (
//     <div>
//       <Grid columns={{initial:'1', md:'2'}} gap='5'>
//         <Box>
//          <IssueDetails issue={issue} />
//         </Box>
//         <Box>
//             <EditIssueButton issueId={issue.id} />
//         </Box>
//       </Grid>

//     </div>
//   )
// }

const IssueDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;
  const issue = await prisma.issues.findUnique({
    where: { id: parseInt(id) },
  });
  await delay(2000);
  if (!issue) notFound();
  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <Flex direction="column" gap="2">
          <EditIssueButton issueId={issue.id} />
          <DeleteIssueButton issueid={issue.id} />
        </Flex>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
