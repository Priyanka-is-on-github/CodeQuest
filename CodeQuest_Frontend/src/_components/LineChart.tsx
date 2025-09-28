
import {Line} from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  

function LineChart() {

    const labels = ['q1', 'q2', 'q3']
    const chartData = {
        labels,
        datasets: [
          {
            label: "You",
            data: [3, 5, 7, 9],
            borderColor: "#111184",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderWidth: 2,
            tension: 0.4,
            fill: true,
          },
          {
            label: "Other Students",
            data: [4, 6, 5, 8], // Example comparison data
        borderColor: "#8B0000",
        backgroundColor: "rgba(255, 99, 132, 0.2)", // Light red
        borderWidth: 2,
        tension: 0.4,
        fill: true, // Background fill
          },
        ],
      };

    const options = {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: "top" as const,
          },
          title: {
            display: true,
            text: "Cmp of Test Cases",
          },
        },
        scales: {
          y: {
            title: {
              display: true,
              text: "No. of Test Cases Passed",
            },
            beginAtZero: true,
          },
          x: {
            title: {
              display: true,
              text: "Questions",
            },
          },
        },
    };



  return (
   <>
   
   <div className='flex-1  w-14  border-r-2 border-slate-400  bg-[#fb71853d] rounded-md'>
 <Line options={options} data={chartData} />

   </div>
   <div className='flex-1 w-14 border-r-2 border-slate-400 bg-[#818cf891] rounded-md'>
 <Line options={options} data={chartData}/>

   </div>
   <div className='flex-1 w-14 bg-[#fde68a87] rounded-md'>
 <Line options={options} data={chartData}/>

   </div>
   </>
  )
}

export default LineChart