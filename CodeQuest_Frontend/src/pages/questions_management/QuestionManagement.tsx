import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/layout/AdminLayout";
import { ArrowLeft } from "lucide-react";

import {  useEffect, useState } from "react";
import { Link, useLocation, useNavigate,  } from "react-router-dom";

import InternshipAction from "@/_components/QuestionsComponent/InternshipAction";

import { useContext } from "react";
import { InternshipContext } from "@/pages/intership_management";

function QuestionManagement() {
  const [updateButton, setUpdateButton] = useState<{difficulty:string, title:string, isPublished:boolean}[]>([]);
const {setInternships} = useContext(InternshipContext)


  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
const navigate = useNavigate()
  const internshipId = queryParams.get("internshipId");
  const isPublished = queryParams.get("isPublished") === 'true';

  

  const request = {
   internshipId,
    title: null,
    description: null,
  };

  const difficultyLevels = [
    { level: 'easy', label: 'Easy', color: 'bg-green-100 text-green-800' },
    { level: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
    { level: 'hard', label: 'Hard', color: 'bg-red-100 text-red-800' }
  ];
  const handleQuestion = async (difficulty: string) => {

    try {
     const response =  await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/question?difficulty=${difficulty}`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(request),
        }
      );

    const  questionId = await response.json()
   
 
     navigate(`/admin/questionmanagement/${difficulty}?internshipId=${internshipId}&questionId=${questionId}`)

    } catch (error) {
      console.log(error);
    }
  };


  const handleEdit =async(difficulty:string)=>{

   
    try {
     

      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/question/questiondetail?difficulty=${difficulty}&internshipId=${internshipId}`
      );

      const questionId = await response.json();

    const id= questionId.response._id;
  
       navigate(`/admin/questionmanagement/${difficulty}?internshipId=${internshipId}&questionId=${id}`)

    } catch (error) {
      console.log(error)
    }

   
  }

  useEffect(() => {
    (async () => {
      try {
         // VerifyinternshipId is a valid 24-character hex string
      if (!internshipId || !/^[0-9a-fA-F]{24}$/.test(internshipId)) {
        console.error('InvalidinternshipId format');
        return;
      }
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/api/v1/question/get?internshipId=${internshipId}`
        );

        const allQuestion = await response.json();
        
        const object = allQuestion.map((question:any) => {
          return {difficulty:question?.questionDificulty,
            title:question?.questionTitle,
            isPublished: question?.isPublished
          };
        });

     

        setUpdateButton(object);

      } catch (error) {
        console.log(error);
      }
    })();
  }, [internshipId]);


  const publish = updateButton.filter((data)=>{

    return (data.isPublished)
  })

const isComplete = ['easy', 'medium', 'hard'].every(difficulty => 
  updateButton.some(item => 
    item.difficulty === difficulty && item.isPublished
  )
);

 
  return (

   
        <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header with back button */}
        <div className="flex items-center justify-between">
          <Link
            to="/recruiter/intershipsmanagement"
            className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Internships
          </Link>
          <h2 className="text-2xl font-bold text-gray-800">Question Management</h2>

          <InternshipAction
                        disabled={!isComplete}
                        
                         internshipId={internshipId}
                          ispublished={isPublished}
                       setInternships={setInternships}
                      />
      
        </div>

        {/* Difficulty cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {difficultyLevels.map(({ level, label, color }) => {
            const question = updateButton.find(item => item.difficulty === level);
            const hasQuestion = updateButton.some(item => item.difficulty === level);

            

            return (
              <div 
                key={level} 
                className={`border rounded-lg overflow-hidden transition-all hover:shadow-md ${
                  hasQuestion ? 'border-gray-200' : 'border-dashed border-gray-300'
                }`}
              >
                <div className="p-6 h-full flex flex-col">
                  {/* Difficulty header */}
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Q{difficultyLevels.findIndex(d => d.level === level) + 1}. {label}
                    </h3>
                    <Badge className={`${color} px-2 py-1 rounded-full text-xs font-medium`}>
                      {label}
                    </Badge>

                    <Badge 
  variant={question?.isPublished ? "default" : "secondary"}
  className="rounded-full px-2 py-1 text-xs font-medium"
>
  {question?.isPublished ? "Published" : "Draft"}
</Badge>
                  </div>

                  {/* Question content */}
                  <div className="flex-1">
                    <p className={`text-sm ${
                      hasQuestion ? 'text-gray-700' : 'text-gray-500 italic'
                    } mb-6`}>
                      {question?.title || `No ${label.toLowerCase()} question added yet`}
                    </p>
                  </div>

                  {/* Action button */}
                  <div className="flex justify-end">
                    <Button
                      onClick={() => hasQuestion ? handleEdit(level) : handleQuestion(level)}
                      className={`mt-2 ${
                        hasQuestion 
                          ? 'bg-gray-100 text-gray-800 hover:bg-gray-200' 
                          : 'bg-sky-600 text-white hover:bg-sky-700'
                      }`}
                    >
                      {hasQuestion ? 'Edit Question' : 'Add Question'}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats and additional info */}
        <div className="mt-8 bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Question Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Total Questions</p>
              <p className="text-2xl font-bold">{publish.length}/3</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Last Updated</p>
              <p className="text-lg font-medium">
                {updateButton.length > 0 
                  ? new Date().toLocaleDateString() 
                  : 'Never'}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Completion</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div 
                  className="bg-green-600 h-2.5 rounded-full" 
                  style={{ width: `${(publish.length / 3) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm mt-1">
                {Math.round((updateButton.length / 3) * 100)}% complete
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
   
  );
}

export default QuestionManagement;
