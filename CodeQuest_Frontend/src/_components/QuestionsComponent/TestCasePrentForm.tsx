// ParentForm.tsx
import { useForm, FormProvider } from 'react-hook-form';
import TestCasesForm from './TestCasesForm';
import { Button } from '@/components/ui/button';

const TestCaseParentForm = () => {
  const methods = useForm({
    defaultValues: {
      testCases: [{ input: '', output: '', explanation: '', isPublic: true }]
    }
  });

  const onSubmit = (data: any) => console.log(data);

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