import { useEffect }from 'react'
import { Box, Typography} from "@mui/material";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import StatBox from '../components/StatBox'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut, Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const {workouts, dispatch} = useWorkoutsContext()
  const {user} = useAuthContext()

  //get data from mongo db
  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/workouts', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_WORKOUTS', payload: json})
      }
    }

    if (user) {
      fetchWorkouts()
    }
  }, [dispatch, user])

  //get total amount per month
  function getTotal(workouts) {
    let total = 0;
    workouts.forEach((workout) => {
      total = total + workout.amount;
    });
    return total;
  }

  //get avg amount per
  function getAvg(workouts) {
    let total = 0;
    let i = 0
    workouts.forEach((workout) => {
      total = total + workout.amount;
      i++
    });
    total = Math.round(total/i);
    return total;
  }

  //Get highest category spent
  function getHighest(workouts) {
    let living = 0;
    let clothing = 0;
    let groceries = 0;
    let misc = 0;
    let health = 0;
    let eating = 0;
    let fun = 0;
    
    //get individual amount spent for each category
    workouts.map((workout) => {
      if(workout.category === "Clothing")
      clothing = clothing + workout.amount;
      if(workout.category === "Groceries")
      groceries = groceries + workout.amount;
      if(workout.category === "Misc.")
      misc = misc + workout.amount;
      if(workout.category === "Health")
      health = health + workout.amount;
      if(workout.category === "Living")
      living = living + workout.amount;
      if(workout.category === "Eating Out")
      eating = eating + workout.amount;
      if(workout.category === "Fun")
      fun = fun + workout.amount;
    });

    //appending to an array
    const data = 
    [
      {amount: clothing, category: "Clothing"},
      {amount: groceries, category: "Groceries"},
      {amount: misc, category: "Misc"},
      {amount: living, category: "Living"},
      {amount: fun, category: "Fun"},
      {amount: eating, category: "Eating Out"},
    ];
    console.log("🚀 ~ file: dashboard.js:77 ~ getHighest ~ data:", data)

    
    var res = Math.max(...data.map(o => o.amount))
    var obj = data.find(function(o){return o.amount===res;})
    const Highest = obj.category
   
    return Highest;
  }

//same concept as getHighest except return an array
function getSeries(workouts){
  let living = 0;
    let clothing = 0;
    let groceries = 0;
    let misc = 0;
    let health = 0;
    let eating = 0;
    let fun = 0;
    

    workouts.map((workout) => {
      if(workout.category === "Clothing")
      clothing = clothing + workout.amount;
      if(workout.category === "Groceries")
      groceries = groceries + workout.amount;
      if(workout.category === "Misc.")
      misc = misc + workout.amount;
      if(workout.category === "Health")
      health = health + workout.amount;
      if(workout.category === "Living")
      living = living + workout.amount;
      if(workout.category === "Eating Out")
      eating = eating + workout.amount;
      if(workout.category === "Fun")
      fun = fun + workout.amount;
    });

    
    const data = 
    [
      {amount: clothing, category: "Clothing"},
      {amount: groceries, category: "Groceries"},
      {amount: misc, category: "Misc"},
      {amount: living, category: "Living"},
      {amount: fun, category: "Fun"},
      {amount: eating, category: "Eating Out"},
    ];
    console.log("🚀 ~ file: dashboard.js:137 ~ getSeries ~ data:", data)
    return data
  }
  var data = getSeries(workouts)

  //same as getSeries but for Importance 
  function getImportance(workouts){
      let essential = 0;
      let have = 0;
      let nice = 0;
      let shouldnt = 0;
  
      workouts.map((workout) => {
        if(workout.importance === "Essential")
        essential = essential + workout.amount;
        if(workout.importance === "Have to Have")
        have = have + workout.amount;
        if(workout.importance === "Nice to Have")
        nice = nice + workout.amount;
        if(workout.importance === "Shouldn't Have")
        shouldnt = shouldnt + workout.amount;
      });  
      const data = 
      [
        {amount: essential, category: "Essential"},
        {amount: have, category: "Have to Have"},
        {amount: nice, category: "Nice to Have"},
        {amount: shouldnt, category: "Shouldn't Have"},
      ];
      console.log("🚀 ~ file: dashboard.js:137 ~ getSeries ~ data:", data)
      return data
    }
    var data1 = getImportance(workouts)

  const getData = {
    labels: data.map(row => row.category),
  datasets: [
    {
      label: "Amount Spend",
      data: data.map(row => row.amount),
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
  }

  const getData1 = {
    labels: data1.map(row => row.category),
  datasets: [
    {
      label: "Amount Spend",
      data: data1.map(row => row.amount),
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
  }


  return (
    <div>
    <div className="dashboard">
     <StatBox
     title="Total"
     value={"$"+getTotal(workouts)}
     description="March 2023"/>
     <StatBox
     title="Average"
     value={"$"+getAvg(workouts)}
     description="March 2023"/>
     <StatBox
     title="Highest Category Spent"
     value={getHighest(workouts)}
     description="March 2023"/>
    </div>

     <div className='pie'>
     <Box
        gridColumn="span 1"
        height = "800px"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignContent="center"
        p="1.25rem 1rem"
        flex="1 1 100%"
        backgroundColor="#efefef"
        borderRadius="0.55rem"
      > <Typography variant="h6">
      Expenses by Category
    </Typography><Pie data = {getData}
      options={{
        responsive:true,
        maintainAspectRatio:true,
      }} /></Box>
        <Box
        gridColumn="span 1"
        height = "800px"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        p="1.25rem 1rem"
        flex="1 1 100%"
        backgroundColor="#efefef"
        borderRadius="0.55rem"
      ><Typography variant="h6">
      Expenses by Importance
    </Typography><Pie data = {getData1}
      options={{
        responsive:true,
        maintainAspectRatio:true,
      }}
      
       /></Box>
     
    </div>
    </div>
  )
}

export default Dashboard