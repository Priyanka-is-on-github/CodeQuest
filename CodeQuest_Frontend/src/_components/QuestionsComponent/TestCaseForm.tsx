// ParentForm.tsx
import { useForm,  useFieldArray } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from 'react';
import { Pencil, PlusCircle, Trash2 } from 'lucide-react';


interface TestcaseType {
  input: string;
  expected_output: string;
  explanation: string;
  _id?: string; // Make optional for new examples
}

type QuestionTestCaseFormProps = {
  testcases: TestcaseType[];
  setQuestionDetail: any;
  questionId: string |null;
};

const testcaseSchema = z.object({
  input: z.string().min(1, "Input is required"),
  expected_output: z.string().min(1, "Output is required"),
  explanation: z.string().min(6, "Explanation must be at least 6 characters"),
});

const formSchema = z.object({
  testcases: z.array(testcaseSchema).min(1, "At least one testcases is required"),
});



const TestCaseForm = ({
  testcases=[],
  setQuestionDetail,
  questionId,
}: QuestionTestCaseFormProps) => {


    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


  const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        testcases: testcases.length > 0 ? testcases : [{ input: "", expected_output: "", explanation: "" }],
      },
    });
  
    const { fields, append, remove } = useFieldArray({
      control: form.control,
      name: "testcases",
    });



   const onSubmit = async (data: z.infer<typeof formSchema>) => {
    
    
     try {
       setIsLoading(true);
       
       const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/testcases?questionId=${questionId}`, {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ testcases: data.testcases }),
       });
 
       if (!response.ok) {
         throw new Error("Failed to save testcases");
       }
 
       const result = await response.json();
     setQuestionDetail((prev : any) => ({
         ...prev,
         testcases: result.testcases
       }));
       toast.success("Testcases saved successfully");
       setIsEditing(false);
     } catch (error) {
       console.error("Error:", error);
       toast.error("Failed to save testcases");
     } finally {
       setIsLoading(false);
     }
   };


     const deleteTestcase = async (index: number, testcaseId?: string) => {
     try {
       let result;
       
       if (testcaseId) {
         
         const response = await fetch(
           `${import.meta.env.VITE_SERVER_URL}/api/v1/testcases?questionId=${questionId}&id=${testcaseId}`,
           {
             method: "DELETE",
           }
         );
   
         if (!response.ok) {
           throw new Error("Failed to delete example");
         }
   
         result = await response.json();
       }
   

       // Remove from UI
       remove(index);
   
       // Update state if we got a response from the server
       if (result) {
         setQuestionDetail((prev:any) => ({
           ...prev,
           testcases: result.testcases
         }));
       }
   
       toast.success("Example deleted");
     } catch (error) {
       console.error("Error:", error);
       toast.error("Failed to delete example");
     }
   };


  const toggleEdit = () => setIsEditing(!isEditing);

   useEffect(() => {
      if (!testcases) {
        return;
      }
  
      form.reset({ testcases: testcases });
    }, [form, testcases]);

  return (

    <div className="mt-6 border p-4 bg-slate-100 rounded-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Testcases</h3>
            <Button variant="ghost" onClick={toggleEdit}>
              {isEditing ? "Cancel" : (
                <>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit Testcases
                </>
              )}
            </Button>
    </div>
 

      <Form {...form}>
        {!isEditing ? (
          <div className="space-y-4">
            {testcases.length === 0 ? (
              <p className="text-sm text-slate-500 italic">No testcases added yet</p>
            ) : (
              testcases.map((testcase) => (
                <div key={testcase._id || Math.random()} className="border rounded-lg p-4 bg-white">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium mb-1">Input</h4>
                      <p className="text-sm">{testcase.input || "-"}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-1">Output</h4>
                      <p className="text-sm">{testcase.expected_output || "-"}</p>
                    </div>
                    <div className="md:col-span-2">
                      <h4 className="text-sm font-medium mb-1">Explanation</h4>
                      <p className="text-sm">{testcase.explanation || "-"}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormDescription>
              Add input/output testcases to demonstrate how the question should be solved.
            </FormDescription>

            <div className="space-y-4">
              {fields.map((field, index) => (
                <div key={field.id} className="border rounded-lg p-4 bg-white relative">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                    onClick={() => deleteTestcase(index, testcases[index]?._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`testcases.${index}.input`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div>
                              <label className="block text-sm font-medium mb-1">Input</label>
                              <textarea {...field} className="w-full border rounded-md p-2 text-sm min-h-[80px]" />
                              <FormMessage />
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`testcases.${index}.expected_output`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div>
                              <label className="block text-sm font-medium mb-1">Expected Output</label>
                              <textarea {...field} className="w-full border rounded-md p-2 text-sm min-h-[80px]" />
                              <FormMessage />
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <div className="md:col-span-2">
                      <FormField
                        control={form.control}
                        name={`testcases.${index}.explanation`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div>
                                <label className="block text-sm font-medium mb-1">Explanation</label>
                                <textarea {...field} className="w-full border rounded-md p-2 text-sm min-h-[60px]" />
                                <FormMessage />
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                className="w-full border-dashed gap-2"
                onClick={() => append({ input: "", expected_output: "", explanation: "" })}
              >
                <PlusCircle className="h-4 w-4" />
                Add Testcases
              </Button>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="submit"
                disabled={!form.formState.isValid || isLoading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? "Saving..." : "Save testcases"}
              </Button>
            </div>
          </form>
        )}
      </Form>

  

    </div>
  );
};

export default TestCaseForm;