import React,{Fragment} from 'react'
import './about.css';

const AboutUs = () => {
  return(
    <Fragment>
      <div className="image">
    
        {/* <img src="./images/about-img.jpg" alt=""/> */}
        <h1>About Us</h1>
        <h5 className="about-content">Number one leading brand for home made numkeens. It's an organisation,
          which provides the most unique and healthy flavours in the unhealthy 
          world. 
          It's a Shop where we sell varities of namkeens in a reasonable price.
          It is located in Bhopal, Madhya Pradesh, started by the group of 
          four friends who started this business for the benefit of students 
          living away from there families for higher studies and jobs.
          Therefore our namkeens provided them the taste of homemade spices 
          and home made food.                                                                                  
                                                  
          It's a Shop where we sell varities of namkeens in a reasonable price.
          It is located in Bhopal, Madhya Pradesh, started by the group of 
          four friends who started this business for the benefit of students 
          living away from there families for higher studies and jobs.
          Therefore our namkeens provided them the taste of homemade spices 
          and home made food. 
          </h5>
        <h1 className="motive">Vission</h1>
        <h5 className="motive-content">To provide the homely taste and feeling away from home.
        And to make People aware about the varity of flavours originated from various places of India.</h5>  
      
        <h1 className="founder">Founders </h1>
        <div className="f1">
          <h1>Darshana Jain</h1>
        </div>
        <div className="f2">
          <h1>Shivam Chaudhary</h1>
        </div>
        <div className="f3">
          <h1 className="f31">Ashi </h1>
          <h1 className="f32">seth</h1>
        </div>
        <div className="f4">
          <h1>Yash Awadh</h1>
        </div>
        

      
      </div>

    </Fragment>
  )
}

export default AboutUs;