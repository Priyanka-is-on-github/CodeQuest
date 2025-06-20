import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Trash2, PlusCircle, ChevronDown, ChevronUp } from 'lucide-react';
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';

const TestCasesForm = () => {
  const { control, formState } = useFormContext();

   // Provide fallback if form context is missing
  if (!control) {
    return (
      <div className="p-4 border rounded bg-yellow-50 text-yellow-800">
        Warning: This component must be used inside a FormProvider.
      </div>
    );
  }
  const { fields, append, remove, swap } = useFieldArray({
    control,
    name: 'testCases',
  });

  const addTestCase = () => {
    append({ input: '', output: '', explanation: '', isPublic: true });
  };

  const moveTestCase = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === fields.length - 1)
    ) {
      return;
    }
    swap(index, direction === 'up' ? index - 1 : index + 1);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Test Cases</h3>
        <FormDescription>
          Add test cases to validate user submissions. Mark as public to show to users.
        </FormDescription>
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="border rounded-lg p-4 bg-gray-50/50">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-700">
                  Test Case {index + 1}
                </span>
                <FormField
                  control={control}
                  name={`testCases.${index}.isPublic`}
                  render={({ field }) => (
                    <button
                      type="button"
                      onClick={() => field.onChange(!field.value)}
                      className={`text-xs px-2 py-1 rounded ${
                        field.value
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {field.value ? 'Public' : 'Hidden'}
                    </button>
                  )}
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => moveTestCase(index, 'up')}
                  disabled={index === 0}
                  className="text-gray-500 hover:text-gray-700 disabled:opacity-30"
                >
                  <ChevronUp className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => moveTestCase(index, 'down')}
                  disabled={index === fields.length - 1}
                  className="text-gray-500 hover:text-gray-700 disabled:opacity-30"
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  disabled={fields.length <= 1}
                  className="text-red-500 hover:text-red-700 disabled:opacity-30"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
              <FormField
                control={control}
                name={`testCases.${index}.input`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Input
                        </label>
                        <textarea
                          {...field}
                          className="w-full border rounded-md p-2 text-sm min-h-[80px] font-mono"
                          placeholder="Enter test input..."
                        />
                        <FormMessage />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`testCases.${index}.output`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Expected Output
                        </label>
                        <textarea
                          {...field}
                          className="w-full border rounded-md p-2 text-sm min-h-[80px] font-mono"
                          placeholder="Enter expected output..."
                        />
                        <FormMessage />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

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
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full border-dashed gap-2"
        onClick={addTestCase}
      >
        <PlusCircle className="h-4 w-4" />
        Add Test Case
      </Button>
    </div>
  );
};

export default TestCasesForm;