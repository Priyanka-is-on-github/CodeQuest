import QuestionDescriptionForm from "@/_components/QuestionsComponent/QuestionDescriptionForm";
import QuestionTitleForm from "@/_components/QuestionsComponent/QuestionTitleForm";

import { IconBadge } from "@/components/ui/icon-badge";
import QuestionLayout from "@/layout/QuestionsLayout";
import { ArrowLeft, BookOpenText, FileQuestion } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import QuestionActions from "@/_components/QuestionsComponent/QuestionActions";
import QuestionExampleForm from "@/_components/QuestionsComponent/QuestionExampleForm";

import { useEffect, useState } from "react";

import TestCaseForm from "@/_components/QuestionsComponent/TestCaseForm";

interface ExampleType {
  input: string;
  output: string;
  explanation: string;
  _id: string;
}

interface TestCaseType {
  input: string;
  expected_output: string;
  explanation: string;
  _id: string;
}

interface QuestionDetail {
  _id: string;
  internshipId: string;
  questionTitle: string;
  questionDescription: string;
  questionDifficulty: string;
  examples: ExampleType[];
  testcases: TestCaseType[];
  isPublished:boolean;
  createdAt: string;
  updatedAt: string;
}

function Question() {
  const [questionDetail, setQuestionDetail] = useState<QuestionDetail>({
    _id: "",
    internshipId: "",
    questionTitle: "",
    questionDescription: "",
    questionDifficulty: "",
    examples: [],
    testcases: [],
    isPublished:false,
    createdAt: "",
    updatedAt: "",
  });

  console.log("updated=", questionDetail);
 

  const { pathname } = useLocation();
  const difficulty = pathname.split("/")[3];

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const internshipId = queryParams.get("internshipId");
  const questionId = queryParams.get("questionId");

const requiredFields = [
  questionDetail.questionTitle.trim() != '',
  questionDetail.questionDescription.trim() != '',
 
  questionDetail.examples.length > 0,
  questionDetail.testcases.length > 0,

]


  const completedFields = requiredFields.filter(Boolean).length;

const completionPercentage = ((completedFields/4)*100)



  const isComplete = requiredFields.every(Boolean)

  useEffect(() => {
    const fetchQuestionDetail = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/api/v1/question/questiondetail?difficulty=${difficulty}&internshipId=${internshipId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch question details");
        }

        const data = await response.json();

        if (!data.response || !data.examples || !data.testcases) {
          throw new Error("Invalid response format");
        }

        setQuestionDetail((prev) => ({
          ...prev,
          _id: data.response._id || "",
          internshipId: data.response.internshipId || "",
          questionTitle: data.response.questionTitle || "",
          questionDescription: data.response.questionDescription || "",
          questionDifficulty: data.response.questionDifficulty || "",
          examples: data.examples || [],
          isPublished: data.response.isPublished,
          testcases: data.testcases || [],
          createdAt: data.response.createdAt || "",
          updatedAt: data.response.updatedAt || "",
        }));
      } catch (error) {
        console.error("Error fetching question details:", error);
       
      }
    };

    fetchQuestionDetail();
  }, []); 

  return (
    <QuestionLayout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <Link
            to={`/admin/questionmanagement?internshipId=${internshipId}`}
            className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to question management
          </Link>

          <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {questionDetail?.questionTitle || "New Question Creation"}
              </h1>
              <div className="flex items-center mt-2">
                <span className="text-sm font-medium text-gray-600">
                  Difficulty:{" "}
                  <span className="text-green-600">{difficulty}</span>
                </span>
                <span className="mx-2 text-gray-400">•</span>
                <span className="text-sm text-gray-600">
                  Completed {completedFields} of 4 fields
                </span>
              </div>
            </div>

            <QuestionActions
              disabled={!isComplete}
              ispublished={Boolean(questionDetail.isPublished)}
              internshipId={internshipId}
            
              difficulty={difficulty}
              setQuestionDetail={setQuestionDetail}
            />
          </div>

          {/* Progress Bar */}
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Left Column - Question Details */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center gap-3 mb-6">
              <IconBadge icon={FileQuestion} />
              <h2 className="text-xl font-semibold text-gray-800">
                Question Details
              </h2>
            </div>

            <div className="space-y-6">
              <QuestionTitleForm
                title={questionDetail?.questionTitle}
                setQuestionDetail={setQuestionDetail}
                internshipId={internshipId}
              />

              <QuestionDescriptionForm
                description={questionDetail?.questionDescription}
                setQuestionDetail={setQuestionDetail}
                internshipId={internshipId}
              />

              <div className="border-t pt-6 ">
                <QuestionExampleForm
                  examples={questionDetail?.examples}
                  setQuestionDetail={setQuestionDetail}
                  questionId={questionId}
                />
              </div>
            </div>
          </div>

          {/* Right Column - Test Cases */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center gap-3 mb-6">
              <IconBadge icon={BookOpenText} />
              <h2 className="text-xl font-semibold text-gray-800">
                Test Cases
              </h2>
            </div>

            <TestCaseForm
            testcases={questionDetail?.testcases}
            setQuestionDetail={setQuestionDetail}
            questionId={questionId}
            
            
            />
          </div>
        </div>

     
      </div>
    </QuestionLayout>
  );
}

export default Question;
