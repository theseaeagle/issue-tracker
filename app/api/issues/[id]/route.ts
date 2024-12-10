import { NextRequest, NextResponse } from "next/server";
import {number, string} from 'zod';
import prisma from '@/prisma/client'
import { createIssueSchema } from "@/app/validationSchemas";
import { notFound } from "next/navigation";


export async function PATCH(
    request:NextRequest,
    {params}:{params:{id:string}}
) {
    const body =  await request.json()
    const validation = createIssueSchema.safeParse(body);
    if(!validation.success){
        return NextResponse.json({error:validation.error.format()},{status:400})
    }

    const issue = await prisma.issues.findUnique({
        where:{ id:parseInt(params.id) }
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