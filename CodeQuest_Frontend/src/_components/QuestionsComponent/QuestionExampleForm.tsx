import { useFormContext, useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { PlusCircle, Trash2 } from 'lucide-react';

export default function QuestionExampleForm({ form }: { form: any }) {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "examples", // Changed from "example" to "examples" for better semantics
  });

  const { isSubmitting, isValid } = form.formState;

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg border shadow-sm">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-gray-900">Examples</h2>
        <FormDescription className="text-gray-600">
          Add input/output examples to demonstrate how the question should be solved.
          Include at least 2-3 examples covering different scenarios.
        </FormDescription>
      </div>

      <div className="space-y-4">
        <FormField
          control={form.control}
          name="examples"
          render={() => (
            <FormItem className="space-y-4">
              {fields.map((field, index) => (
                <div 
                  key={field.id} 
                  className="border rounded-lg p-4 bg-gray-50/50 relative group"
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-sm font-medium text-gray-700">
                      Example {index + 1}
                    </span>
                    {fields.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700 absolute top-3 right-3"
                        onClick={() => remove(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={control}
                      name={`examples.${index}.input`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Input
                              </label>
                              <textarea
                                {...field}
                                className="w-full border rounded-md p-2 text-sm min-h-[80px]"
                                placeholder="Enter input values..."
                              />
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={control}
                      name={`examples.${index}.output`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Expected Output
                              </label>
                              <textarea
                                {...field}
                                className="w-full border rounded-md p-2 text-sm min-h-[80px]"
                                placeholder="Enter expected output..."
                              />
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                                  control={control}
                                  name={`testCases.${index}.explanation`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Explanation (Optional)
                                          </label>
                                          <textarea
                                            {...field}
                                            className="w-full border rounded-md p-2 text-sm min-h-[60px]"
                                            placeholder="Explain what this test case validates..."
                                          />
                                          <FormMessage />
                                        </div>
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                  </div>
                </div>
              ))}
            </FormItem>
          )}
        />

        <Button
          type="button"
          variant="outline"
          className="w-full border-dashed gap-2"
          onClick={() => append({ input: "", output: "" })}
        >
          <PlusCircle className="h-4 w-4" />
          Add Example
        </Button>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button
          type="submit"
          disabled={!isValid || isSubmitting}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isSubmitting ? 'Saving...' : 'Save Examples'}
        </Button>
      </div>
    </div>
  );
}


