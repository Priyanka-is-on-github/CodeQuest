import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

import toast from "react-hot-toast";
import { Dispatch, SetStateAction, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmModal from "./ConfirmModel";

type NewChapterDetail = {
  title: string;
  description: string;
  videourl: string;
  isfree: string;
  ispublished: boolean;
};


interface QuestionActionProps {
  disabled: boolean;
  ispublished: boolean;
  internshipId:string | null;
  questionId:string |null;
  // setQuestionDetail: string;
}

const QuestionActions = ({
  disabled,
  ispublished,
  internshipId,
  questionId,
  // setQuestionDetail,
}: QuestionActionProps) => {
  const navigate = useNavigate();
  const params = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const onClick = async () => {
    try {
      setIsLoading(true);
      if (ispublished) {
        ispublished = true;
        await fetch(
          `${import.meta.env.VITE_SERVER_URL}/api/v1/courses/chapterdetail?chapterId=${params.chapterid}&ispublish=${ispublished}&courseId=${params.id}`,
          {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
            },
          }
        );
        toast.success("Chapter unpublished");

        // setQuestionDetail((prevState) => {
        //   return { ...prevState, ispublished: false };
        // });
      } else {
        ispublished = true;
        await fetch(
          `${import.meta.env.VITE_SERVER_URL}/api/v1/courses/chapterdetail?chapterId=${params.chapterid}&ispublish=${ispublished}&courseId=${params.id}`,
          {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
            },
          }
        );
        toast.success("Chapter published");

        // setQuestionDetail((prevState) => {
        //   return { ...prevState, ispublished: true };
        // });
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
        `http://localhost:3001/api/v1/question/questiondelete?internshipId=${internshipId}&questionId=${questionId}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
        
        }
      );

      toast.success("Internship deleted");
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
