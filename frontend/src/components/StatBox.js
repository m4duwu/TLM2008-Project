import React from "react";
import { Box, Typography } from "@mui/material";
import FlexBetween from "./FlexBetween";


const StatBox =  ({ title, value, increase, icon, description }) => {

  return (
    <Box
      gridColumn="span 1"
      height = "200px"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      p="1.25rem 1rem"
      flex="1 1 100%"
      backgroundColor="#efefef"
      borderRadius="0.55rem"
    >
  <FlexBetween>
        <Typography variant="h6">
          {title}
        </Typography>
        {icon}
      </FlexBetween>

      <Typography
        variant="h3"
        fontWeight="600"
        
      >
        {value}
      </Typography>
      <FlexBetween gap="1rem">
        <Typography
          variant="h5"
          fontStyle="italic"
         
        >
          {increase}
        </Typography>
        <Typography>{description}</Typography>
      </FlexBetween>
    </Box>
  )
}

export default StatBox