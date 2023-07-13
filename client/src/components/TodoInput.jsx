import React, { useState } from "react";

const TodoInput = () => {

 const [description, setDescription] = useState("");

 const onSubmitForm = async (e) => {
   e.preventDefault();
   try {
     const body = { description };
     const response = await fetch("https://full-app-0eu6.onrender.com/todos", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify(body),
     });
     console.log(response);
     //   window.location = "/";
   } catch (err) {
     console.error(err.message);
   }
 };
 return (
   <>
     <h1 className="text-center  mt-5 "> Todo List</h1>
     <form className="d-flex mt-5 " onSubmit={onSubmitForm}>
       <input
         type="text"
         className="form-control form-control-sm mx-1 col-7 mx-auto"
         value={description}
         onChange={(e) => setDescription(e.target.value)}
       />
       <button className="btn btn-primary  col-2 mx-auto">Add</button>
     </form>
   </>
 );
};

export default TodoInput;