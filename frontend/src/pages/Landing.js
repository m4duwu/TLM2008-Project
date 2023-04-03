import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Box, Typography} from "@mui/material";

//renquan
const Landing = () => {
  const form = useRef();

  //to send form to emailJs
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service', 'template', form.current, 'user key')
      .then((result) => {
          console.log(result.text);
          window.confirm("Email sent")
      }, (error) => {
          console.log(error.text);
          window.confirm("Could not send email at this moment. Please try again later.")
      });
  };

  return (
    <div>
      
      <div>
      <Box
        gridColumn="span 1"
        height = "600px"
        display="flex"
        flexDirection="column"
        alignContent="center"
        p="1.25rem 1rem"
        flex="1 1 100%"
        
        borderRadius="0.55rem"
      >
        <div>
          <div className="landhead">
          <img src="./bg.gif" className="data-logo2" alt="logo" />
          </div>

        </div>

      </Box>
      </div>
    <div className="landing">
        <Box
        gridColumn="span 1"
        height = "300px"
        display="flex"
        flexDirection="column"
        alignContent="center"
        p="1.25rem 1rem"
        flex="1 1 100%"
        backgroundColor="#efefef"
        borderRadius="0.55rem"
      >

      <div className='services' >
      <Typography variant="h4">
      Our Services
    </Typography>
    <div className='services2'>
    <Box
        gridColumn="span 1"
        height = "200px"
        display="flex"
        flexDirection="column"
        alignContent="center"
        p="1.25rem 1rem"
        flex="1 1 100%"
        backgroundColor="#bfbfbf"
        borderRadius="0.55rem"
      >Data visualization<img src="./dataviz2.png" className="data-logo" alt="logo" width="130px"/></Box>
  <Box
        gridColumn="span 1"
        height = "200px"
        display="flex"
        flexDirection="column"
        alignContent="center"
        p="1.25rem 1rem"
        flex="1 1 100%"
        backgroundColor="#bfbfbf"
        borderRadius="0.55rem"
      >Manage finances<img src="./dataviz.png" className="data-logo" alt="logo" height="200px"width="150px"/></Box>
       <Box
        gridColumn="span 1"
        height = "200px"
        display="flex"
        flexDirection="column"
        alignContent="center"
        p="1.25rem 1rem"
        flex="1 1 100%"
        backgroundColor="#bfbfbf"
        borderRadius="0.55rem"
      >Manage Data<img src="./dataviz3.png" className="data-logo" alt="logo" width="130px"/></Box>
    
      </div>
      </div>
     </Box>
    <Box
        gridColumn="span 1"
        height = "300px"
        display="flex"
        flexDirection="column"
        alignContent="center"
        p="1.25rem 1rem"
        flex="1 1 100%"
        backgroundColor="#efefef"
        borderRadius="0.55rem"  
      ><Typography variant="h4">About us
      </Typography>
      <Typography variant="h6">
        
        We are a team committed to helping you to have a holistic view of your spending habits and to provide you a platform to make significant changes to your spending lifestyle
        </Typography>
   

      </Box>
 
   </div>
   <div className='landing2'>
   <Box
        gridColumn="span 1"
        height = "500px"
        display="flex"
        flexDirection="column"
        alignContent="center"
        p="1.25rem 1rem"
        flex="1 1 100%"
        backgroundColor="#efefef"
        borderRadius="0.55rem"
      >
        <div className='contact'>
        <Typography variant="h4">
      Contact us
    </Typography>
    {/* for email */}
    <form className="contact" ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="user_name" />
      <label>Email</label>
      <input type="email" name="user_email" />
      <label>Message</label><br></br>
      <textarea name="message" />
      <button onSubmit={sendEmail}>submit</button>
      {/* <input type="submit" value="Send" /> */}
    </form>
    </div>
      </Box>
      <Box
        gridColumn="span 1"
        height = "500px"
        display="flex"
        flexDirection="column"
        alignContent="center"
        p="1.25rem 1rem"
        flex="1 1 100%"
        backgroundColor="#efefef"
        borderRadius="0.55rem"
      ><Typography variant="h4">
      Our Team
      </Typography> 
      <Typography variant="h6">
        <br></br>
      Jay Yap  <br></br><br></br>
      Haziqshah  <br></br><br></br>
      Renquan  <br></br><br></br>
      Shao Cai  <br></br><br></br>
      Mervyn  <br></br><br></br>
      </Typography> 

      </Box>
 
   </div>
   
 
   </div>
  )
}

export default Landing