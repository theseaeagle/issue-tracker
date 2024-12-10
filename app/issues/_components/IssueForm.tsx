"use client";
import dynamic from "next/dynamic";
import { Button, Callout, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
//import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchemas";
import { z } from "zod";
// import ErrorMessage from '@/app/components/ErrorMessage';
// import Spinner from '@/app/components/Spinner';
import { ErrorMessage, Spinner } from "@/app/components/index";
import { Issues } from "@prisma/client";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

const IssueForm = ({ issue }: { issue?: Issues }) => {
  const router = useRouter();
  // type Inputs = {
  //     title: string
  //     description: string
  //   }

  type IssueFormData = z.infer<typeof createIssueSchema>;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({ resolver: zodResolver(createIssueSchema) });

  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      if (issue) {
        axios.patch("/api/issues/" + issue.id, data);
      } else {
        await axios.post("/api/issues", data);
      }
      router.refresh();
      router.push("/issues");
    } catch (error) {
      setError("An unexpected error occured! " + error);
      setSubmitting(false);
    }
  });

  return (
    <>
      <div>
        {error && (
          <div className="max-w-xl px-5 space-y-3 my-5">
            <Callout.Root color="red">
              <Callout.Icon>
                <InfoCircledIcon />
              </Callout.Icon>
              <Callout.Text>{errors.title?.message}</Callout.Text>
            </Callout.Root>
          </div>
        )}
        <form className="max-w-xl px-5 space-y-3" onSubmit={onSubmit}>
          <TextField.Root
            defaultValue={issue?.title}
            {...register("title", { required: true })}
            placeholder="Search the docs…"
          ></TextField.Root>
          {/* {errors.title && <Text color="red">{errors.title.message}</Text>} */}
          {/* {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>} */}
          <ErrorMessage>{errors.title?.message}</ErrorMessage>

          <Controller
            name="description"
            defaultValue={issue?.description}
            control={control}
            render={({ field }) => <SimpleMDE {...field} />}
          />
          <ErrorMessage>{errors.description?.message}</ErrorMessage>

          <Button type="submit" disabled={isSubmitting}>
            {issue ? "Update Issue" : "Add Issue"}
            {}
            {isSubmitting && <Spinner />}
          </Button>
        </form>
      </div>
    </>
  );
};

export default IssueForm;
