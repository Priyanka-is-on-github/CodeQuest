// ParentForm.tsx
import { useForm, FormProvider } from 'react-hook-form';
import TestCasesForm from './TestCasesForm';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';

const TestCaseParentForm = () => {
  const methods = useForm({
    defaultValues: {
      testCases: [{ input: '', output: '', explanation: '', isPublic: true }]
    }
  });
// const { isSubmitting, isValid } = form.formState;
  const onSubmit = async(data: any) => {
    console.log('data=',data);
  
    // try {
    //   const response = await fetch(
    //     `http://localhost:3001/api/v1/testcase?questionId=${questionId}`,
    //     {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify({ examples: data.examples }),
    //     }
    //   );

    //   if (!response.ok) {
    //     throw new Error("Failed to save examples");
    //   }

    //   const result = await response.json();
    //   console.log('result=',result)
    //   toast.success("Examples saved successfully");
    //   // setIsEditing(false);
  


   
    // } catch (error) {
    //   console.error("Error:", error);
    //   toast.error("Failed to save examples");
    // }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <TestCasesForm />
        <div className="flex justify-end gap-3 pt-4 border-t">
<Button className="bg-blue-600 hover:bg-blue-700">Save Testcase</Button>

</div>
      </form>
    </FormProvider>
  );
};

export default TestCaseParentForm;