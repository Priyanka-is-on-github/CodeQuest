import QuestionDescriptionForm from "@/_components/QuestionsComponent/QuestionDescriptionForm";
import QuestionTitleForm from "@/_components/QuestionsComponent/QuestionTitleForm";
import TestCasesForm from "@/_components/QuestionsComponent/TestCasesForm";
import { IconBadge } from "@/components/ui/icon-badge";
import QuestionLayout from "@/layout/QuestionsLayout";
import { ArrowLeft, BookOpenText, Eye, FileQuestion } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import QuestionActions from "@/_components/QuestionsComponent/QuestionActions";
import QuestionExampleForm from "@/_components/QuestionsComponent/QuestionExampleForm";
import { Form, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import TestCaseParentForm from "@/_components/QuestionsComponent/TestCasePrentForm";

function Question() {

  const [questionDetail, setQuestionDetail] = useState({
    _id: "",
    testId: "",
    questionTitle: "",
    questionDescription: "",
    questionDificulty: "",
    createdAt: "",
    updatedAt: "",
    _v: 0,
  });
 

  const form = useForm({
    defaultValues: {
      example: [{ input: "", output: "" }], // Define default structure
    },
  });

  const { pathname } = useLocation();
  const dificulty = pathname.split("/")[3];

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const testId = queryParams.get("testId");
  const questionId = queryParams.get("questionId");


  // Sample progress calculation (replace with your actual logic)
  const completionPercentage = 40; // 2/5 fields = 40%
  const completedFields = 2;
  const totalFields = 5;
  const onSubmit = async (data: any) => {
    console.log("Form Data:", data); 
   

    const response = await fetch(`http://localhost:3001/api/v1/example?questionId=${questionId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log("Server Response:", result);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/v1/question/questiondetail?dificulty=${dificulty}&testId=${testId}`
        );

        const updatedQuestion = await response.json();

        setQuestionDetail(updatedQuestion);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
  <QuestionLayout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <Link
            to={`/admin/questionmanagement?testId=${testId}`}
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
                  Difficulty: <span className="text-green-600">Easy</span>
                </span>
                <span className="mx-2 text-gray-400">•</span>
                <span className="text-sm text-gray-600">
                  Completed {completedFields} of {totalFields} fields
                </span>
              </div>
            </div>

            <QuestionActions
              disabled={false}
              ispublished={false}
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
              <IconBadge icon={FileQuestion} variant="blue" />
              <h2 className="text-xl font-semibold text-gray-800">Question Details</h2>
            </div>

            <div className="space-y-6">
              <QuestionTitleForm
                title={questionDetail?.questionTitle}
                setQuestionDetail={setQuestionDetail}
              />

              <QuestionDescriptionForm
                description={questionDetail?.questionDescription}
                setChapterDetail={setQuestionDetail}
              />

              <div className="border-t pt-6 ">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <QuestionExampleForm form={form} />
                  </form>
                </Form>
              </div>
            </div>
          </div>

          {/* Right Column - Test Cases */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center gap-3 mb-6">
              <IconBadge icon={BookOpenText} variant="green" />
              <h2 className="text-xl font-semibold text-gray-800">Test Cases</h2>
            </div>

            <TestCaseParentForm />

            
          </div>
        </div>

        {/* Floating Action Buttons */}
        {/* <div className="fixed bottom-6 right-6 flex gap-3">
          <button
            type="button"
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Save Draft
          </button>
          <button
            type="submit"
            form="question-form" // Add this ID to your form
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Publish Question
          </button>
        </div> */}
      </div>
    </QuestionLayout>
  );
}

export default Question;
