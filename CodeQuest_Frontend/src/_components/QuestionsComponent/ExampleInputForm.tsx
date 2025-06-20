import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  index: number;
  removeExample: () => void;
};
function ExampleInputForm({ index, removeExample }: Props) {
  const { control } = useFormContext();

  return (
    <div className="flex flex-row item-end gap-2">
      <FormField
        control={control}
        name={`example.${index}.input`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex flex-center gap-1">
              Input <FormMessage />
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Enter Input"
                className="bg-white"
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`example.${index}.output`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex flex-center gap-1">
            Output <FormMessage />
            </FormLabel>
            <FormControl>
              <Input {...field} placeholder="Enter Output" className="bg-white" />
            </FormControl>
          </FormItem>
        )}
      />
      <Button
        className="bg-saffron hover:bg-bgreen h-full py-2.5 self-end"
        type="button"
        onClick={removeExample}
      >
        Remove
      </Button>
    </div>
  );
}

export default ExampleInputForm;