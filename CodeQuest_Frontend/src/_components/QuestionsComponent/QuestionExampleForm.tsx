import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { PlusCircle, Trash2, Pencil } from "lucide-react";
import { useState, useEffect } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

interface ExampleType {
  input: string;
  output: string;
  explanation: string;
  _id?: string; // Make optional for new examples
}

type QuestionExampleFormProps = {
  examples: ExampleType[];
  setQuestionDetail: any;
  questionId: string |null;
};

const exampleSchema = z.object({
  input: z.string().min(1, "Input is required"),
  output: z.string().min(1, "Output is required"),
  explanation: z.string().min(6, "Explanation must be at least 6 characters"),
});

const formSchema = z.object({
  examples: z.array(exampleSchema).min(1, "At least one example is required"),
});

export default function QuestionExampleForm({
  examples=[],
  setQuestionDetail,
  questionId,
}: QuestionExampleFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);



  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      examples: examples.length > 0 ? examples : [{ input: "", output: "", explanation: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "examples",
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
   
    try {
      setIsLoading(true);
      
      const response = await fetch(`http://localhost:3001/api/v1/examples?questionId=${questionId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ examples: data.examples }),
      });

      if (!response.ok) {
        throw new Error("Failed to save examples");
      }

      const result = await response.json();
    setQuestionDetail(prev => ({
        ...prev,
        examples: result.examples
      }));
      toast.success("Examples saved successfully");
      setIsEditing(false);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to save examples");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteExample = async (index: number, exampleId?: string) => {
  try {
    let result;
    
    if (exampleId) {
      // Delete existing example from backend
      const response = await fetch(
        `http://localhost:3001/api/v1/examples?questionId=${questionId}&id=${exampleId}`,
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
      setQuestionDetail(prev => ({
        ...prev,
        examples: result.examples
      }));
    }

    toast.success("Example deleted");
  } catch (error) {
    console.error("Error:", error);
    toast.error("Failed to delete example");
  }
};
  const toggleEdit = () => setIsEditing(!isEditing);

  // useEffect(() => {
  //   form.reset({ examples: examples.length > 0 ? examples : [{ input: "", output: "", explanation: "" }] });
  // }, [ form]);

  return (
    <div className="mt-6 border p-4 bg-slate-100 rounded-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">Examples</h3>
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing ? "Cancel" : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Examples
            </>
          )}
        </Button>
      </div>

      <Form {...form}>
        {!isEditing ? (
          <div className="space-y-4">
            {examples.length === 0 ? (
              <p className="text-sm text-slate-500 italic">No examples added yet</p>
            ) : (
              examples.map((example) => (
                <div key={example._id || Math.random()} className="border rounded-lg p-4 bg-white">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium mb-1">Input</h4>
                      <p className="text-sm">{example.input || "-"}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-1">Output</h4>
                      <p className="text-sm">{example.output || "-"}</p>
                    </div>
                    <div className="md:col-span-2">
                      <h4 className="text-sm font-medium mb-1">Explanation</h4>
                      <p className="text-sm">{example.explanation || "-"}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormDescription>
              Add input/output examples to demonstrate how the question should be solved.
            </FormDescription>

            <div className="space-y-4">
              {fields.map((field, index) => (
                <div key={field.id} className="border rounded-lg p-4 bg-white relative">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                    onClick={() => deleteExample(index, examples[index]?._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`examples.${index}.input`}
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
                      name={`examples.${index}.output`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div>
                              <label className="block text-sm font-medium mb-1">Output</label>
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
                        name={`examples.${index}.explanation`}
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
                onClick={() => append({ input: "", output: "", explanation: "" })}
              >
                <PlusCircle className="h-4 w-4" />
                Add Example
              </Button>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="submit"
                disabled={!form.formState.isValid || isLoading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? "Saving..." : "Save Examples"}
              </Button>
            </div>
          </form>
        )}
      </Form>
    </div>
  );
}