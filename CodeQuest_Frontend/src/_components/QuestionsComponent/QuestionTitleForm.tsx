import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react';
import  { useEffect, useState } from 'react'
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"; 
import {useForm} from 'react-hook-form'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import toast from 'react-hot-toast';
import { Input } from '@/components/ui/input';
import { useLocation, useParams } from 'react-router-dom';
import { cn } from '@/lib/utils';


type QuestionTitleFormProps= { 
  title:string;
  setQuestionDetail: any;
internshipId:string | null,
}

const formSchema = z.object({
  title: z.string().min(1),
});


function QuestionTitleForm({ title, setQuestionDetail, internshipId}: QuestionTitleFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { pathname } = useLocation();
   const dificulty = pathname.split('/')[3]


  const form = useForm<z.infer<typeof formSchema>>({  
    resolver: zodResolver(formSchema),

    defaultValues: {
      title: title,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {

   
   
    const request = {  
     
      internshipId: internshipId,
     title: values.title,
     description: null,
   
    
   }
 
     try {
       const response = await fetch(
        `http://localhost:3001/api/v1/question/questiondetail?dificulty=${dificulty}`,
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
        prev=>({
          ...prev,  questionTitle:result.questionTitle
        })
        
        );
    
 
       toast.success("Title updated");
       toggleEdit();
     } catch (error) {
       toast.error("Something went wrong");
     }
   };


  const toggleEdit = () => {
    setIsEditing((prevState) => !prevState);
  };

  useEffect(() => {
    if (!title) {
      return;
    }

    form.reset({ title: title });
  }, [form, title]);

  return (
    <div className="mt-6 border p-4 bg-slate-100">
    <div className=" flex justify-between ">
    <span>Question Title</span>
      <Button variant="ghost" onClick={toggleEdit}>
        {!isEditing ? (
          <>
            <Pencil className="h-4 w-4 mr-2" />
            Edit title
          </>
        ) : (
          <>Cancel</>
        )}
      </Button>
    </div>

    {!isEditing && <div className={cn(
                "text-sm mt-2",
                !title && "text-slate-500 italic"
              )}>
      {!title && "No title"}
      {
            title && <p> {title}</p>
          }
      </div>}
    
    {isEditing && (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 mt-4"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="e.g. enter a question title..."
                    {...field}
                  />
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
  )
}

export default QuestionTitleForm