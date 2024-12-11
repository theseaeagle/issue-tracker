import { NextRequest, NextResponse } from "next/server";
//import {number, string} from 'zod';
import prisma from '@/prisma/client'
import { createIssueSchema } from "@/app/validationSchemas";


// After
// type Params = Promise<{ slug: string }>
 
// export async function generateMetadata({ params }: { params: Params }) {
//   const { slug } = await params
// }
type Params = Promise<{ 
    id: string
 }>

export async function PATCH(
    request:NextRequest,
    {params}:{params:Params}
) {
    const { id } = await params
    const body =  await request.json()
    const validation = createIssueSchema.safeParse(body);
    if(!validation.success){
        return NextResponse.json({error:validation.error.format()},{status:400})
    }

    const issue = await prisma.issues.findUnique({
        where:{ id:parseInt(id) }
    })

    if(!issue) {
        return NextResponse.json({error:'Issue not found'},{status:400});
    }
    
    const newIssue = await prisma.issues.update({
            where:{id:issue.id},
            data:{title:body.title,description:body.description}
        });
    return NextResponse.json(newIssue,{status:201})
}

export async function DELETE(request:NextRequest,{params}:{params:Params}){
    const {id} = await params;
    const issue = await prisma.issues.findUnique({
        where:{id: parseInt(id)}
    })
    if(!issue) return NextResponse.json({error:'Invalid Issue'},{status:404})
    const deleteIssue = await prisma.issues.delete({
        where:{id:issue.id}
    });
    return NextResponse.json({success: 'Issue Deleted'})
}