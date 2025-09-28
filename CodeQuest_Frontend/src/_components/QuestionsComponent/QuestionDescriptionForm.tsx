/* eslint-disable @typescript-eslint/no-explicit-any */
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";


import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import Editor from './Editor'
import Preview from'./Preview'

interface QuestionDescriptionFormProps {
  description: string;
  setQuestionDetail: any;
  internshipId:string | null,
}

const formSchema = z.object({
  description: z.string().min(1),
});

const QuestionDescriptionForm = ({
  description,
  setQuestionDetail,
 internshipId

}: QuestionDescriptionFormProps) => {
  const [isEditing, setIsEditing] = useState(false);


 const { pathname } = useLocation();
   const difficulty = pathname.split('/')[3]

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      description: description,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
 

     const request = {  
      internshipId: internshipId,
      title:null,
      description:values.description,
      isPublished:false,
     
    }

    
    
    try {
      const response = await fetch(
        `http://localhost:3001/api/v1/question/questiondetail?difficulty=${difficulty}`,
         {
           method: "POST",
           headers: {
             "Content-type": "application/json",
           },
           body: JSON.stringify(request),
         }
       );
       const result = await response.json();
      
    
      

      setQuestionDetail(
        
       (prev:any)=>({
          ...prev, questionDescription: result.questionDescription
        })
       );
   

      toast.success("Description updated");
      toggleEdit();
    } catch (error) {
      toast.error("Something went wrong");
  
    }
  };

  const toggleEdit = () => {
    setIsEditing((prevState) => !prevState);
  };

  useEffect(() => {
    if (!description) {
      return;
    }

    form.reset({ description: description });
  }, [form, description]);



  return (
    <div className="mt-6 border p-4 bg-slate-100"> 
      <div className="flex justify-between">
        <span>Question description </span>
        <Button variant="ghost" onClick={toggleEdit}>
          {!isEditing ? (
            <>
              <Pencil className="h-4 w-4 mr-2 " />
              Edit description
            </>
          ) : (
            <>Cancel</>
          )}
        </Button>
      </div>

      {!isEditing && (
        <div
          className={cn(
            "text-sm mt-2",
            !description && "text-slate-500 italic"
          )}
        >
          {!description && "No description"}
          {
            description && (<Preview value={description}/>) 
          }
        </div>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                  <Editor {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex item-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
export default QuestionDescriptionForm;
