import React from 'react'

const MyProfile = () => {

    
  return (
    
    <div className="container">
      <form>
        <div className="mb-3">
           <label for="exampleFormControlInput1" className="form-label">First Name</label>
            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="First Name"/>
        </div>
        <div className="mb-3">
           <label for="exampleFormControlInput1" className="form-label">Last Name</label>
            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Last Name"/>
        </div>
        <div className="mb-3">
           <label for="exampleFormControlInput1" className="form-label">Email Address</label>
            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Email Address"/>
        </div>
        </form>
    </div>
        
  )
};

export default MyProfile
