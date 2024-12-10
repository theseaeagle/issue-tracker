import React from "react";
import IssueForm from "../../_components/IssueForm";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

// type Params = Promise<{
//   id: string
// }>

// const IssueEditPage = async (params: Params) => {
//     const { id } = await params
//     console.log('id is ' + id)
//     const issue = await prisma.issues.findUnique({
//         where:{id:  parseInt(id)}
//     });
//     if(!issue) notFound();
//   return (
//    <IssueForm issue={issue}></IssueForm>
//   )
// }

async function IssueEditPage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const issue = await prisma.issues.findUnique({
    where: { id: parseInt(id) },
  });
  if (!issue) notFound();
  return <IssueForm issue={issue}></IssueForm>;
}

export default IssueEditPage;
