import { NextRequest, NextResponse } from "next/server";
//import {number, string} from 'zod';
import prisma from '../../../prisma/client'
import { createIssueSchema } from "../../validationSchemas";

export async function POST(request:NextRequest) {
    const body =  await request.json()
    const validation = createIssueSchema.safeParse(body);
    if(!validation.success){
        return NextResponse.json({error:validation.error.format()},{status:400})
    }
    
    const newIssue = await prisma.issues.create({
            data:{title:body.title,description:body.description}
        });
    return NextResponse.json(newIssue,{status:201})

}