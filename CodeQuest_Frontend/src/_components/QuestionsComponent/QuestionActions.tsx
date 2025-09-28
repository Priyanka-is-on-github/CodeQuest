import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "./ConfirmModel";



interface QuestionActionProps {
  disabled: boolean;
  ispublished: boolean;
  internshipId:string | null;
  difficulty:string | null;
  setQuestionDetail: any;
}

const QuestionActions = ({
  disabled,
  ispublished,
  internshipId,
 difficulty,
  setQuestionDetail,
}: QuestionActionProps) => {
  
 const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const onClick = async () => {
    try {
      setIsLoading(true);
      if (ispublished) {
    

          const request = {  
     
      internshipId: internshipId,
     title: null,
     description: null,
     isPublished:false
   }
      const response =  await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/question/questiondetail?difficulty=${difficulty}`,
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body:JSON.stringify(request)
          }
        );
      
          const result = await response.json();
      
     
        setQuestionDetail(
        (prev: any)=>({
          ...prev,  isPublished:result.isPublished
        })
        
        
        );

         toast.success(`${difficulty} Question Unpublished`);
      } else {
      

        const request = {  
     
      internshipId: internshipId,
     title: null,
     description: null,
     isPublished:true
   }
      const response =  await fetch(
          `${import.meta.env.VITE_SERVER_URL}/api/v1/question/questiondetail?difficulty=${difficulty}`,
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(request)
          }
        );

        const result = await response.json();
      
     
        setQuestionDetail(
        (prev: any)=>({
          ...prev,  isPublished:result.isPublished
        })
        
        );
       
 toast.success(`${difficulty} Question published`);
        
       

        
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/question/questiondelete?internshipId=${internshipId}&difficulty=${difficulty}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
        
        }
      );

      toast.success(`${difficulty} Question deleted`);

      navigate(`/admin/questionmanagement?internshipId=${internshipId}`);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="flex items-center gap-x-2 ">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
      >
        {ispublished ? "Unpublish" : "Publish"}
      </Button>

      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading} className="bg-black text-white" >
          <Trash className="h-4 w-4 " />
        </Button>
      </ConfirmModal>
    </div>
  );
};
export default QuestionActions;
