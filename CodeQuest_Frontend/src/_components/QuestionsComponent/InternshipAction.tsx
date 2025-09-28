import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";
import ConfirmModal from "./ConfirmModel";
import {  useState } from "react";
import { Internship } from "@/pages/intership_management";




interface InternshipActionProps {
  disabled: boolean;
  ispublished: boolean;
  internshipId:string | null;
setInternships: React.Dispatch<React.SetStateAction<Internship[]>>;

}

const InternshipAction = ({
  disabled,
  ispublished,
  internshipId,
setInternships
  
}: InternshipActionProps) => {
  


 const navigate = useNavigate();
// const { internships, setInternships } = useContext(InternshipContext);

console.log('ispub=',ispublished)
  const [isLoading, setIsLoading] = useState(false);

   const onClick = async () => {
    try {
      setIsLoading(true);
      if (ispublished) {
    

          const request = {  
     
      internshipId: internshipId,
    
     isPublished:false
   }
      const response =  await fetch(
        `http://localhost:3001/api/v1/internships/putispublished`,
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body:JSON.stringify(request)
          }
        );
      
           const result = await response.json();
      
     
        setInternships(prevInternships => 
        prevInternships.map(internship => 
          internship._id === internshipId 
            ? { ...internship, isPublished: (!result.isPublished) } 
            : internship
        )
      );
       
 toast.success(` Internship Unpublished`);
        
      } else {
      

        const request = {  
     
      internshipId: internshipId,
   
     isPublished:true
   }
      const response =  await fetch(
          `http://localhost:3001/api/v1/internships/putispublished`,
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(request)
          }
        );

const result = await response.json();
      
    
       setInternships(prevInternships => 
        prevInternships.map(internship => 
          internship._id === internshipId 
            ? { ...internship, isPublished: (!result.isPublished) } 
            : internship
        )
      );

 toast.success(`Internship published`);

      
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
        `http://localhost:3001/api/v1/internships/deleteinternship?internshipId=${internshipId}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
        
        }
      );

      toast.success(`Internship deleted`);

      navigate(`/recruiter/intershipsmanagement`);
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
export default InternshipAction;
