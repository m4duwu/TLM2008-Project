import React from "react";
import { Box, Typography} from "@mui/material";
import FlexBetween from "./FlexBetween";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

const PieChart =  () => {

    return (
      <Box
        gridColumn="span 1"
        height = "600px"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        p="1.25rem 1rem"
        flex="1 1 100%"
        backgroundColor="#efefef"
        borderRadius="0.55rem"
      >
        
        <Doughnut

        options={{
          responsive:true,
          maintainAspectRatio:true,
        }}
          
        />
      </Box>
    )
  }
  
  export default PieChart