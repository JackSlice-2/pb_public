"use client"

import { useState } from "react";
import { useForm } from "react-hook-form"
import pb from "./../components/pocketbase"

const Auth = () => {
    const [ isLoading, setLoading ] = useState(false)
    const { register, handleSubmit, reset } = useForm();
    const isLoggedIn = pb.authStore.isValid;
    const[logoutDummy, setLogoutDummy] = useState(0);

    async function Login(data) {
        setLoading(true);
      try{
          const authData = await pb.collection('users')
          .authWithPassword(data.email, data.password);
            console.log(pb.authStore.isValid); 
            console.log(pb.authStore.token);   
            console.log(pb.authStore.model.id);
            } catch (e) {
           prompt(e);
      }
        setLoading(false);
        reset();
    }

    function Logout() {
        pb.authStore.clear();
        setLogoutDummy(Math.random())
    }

if (isLoggedIn)
    return(
        <>
        <h1>Logged in: {pb.authStore.model.email}</h1>
        <button onClick={Logout}>Log Out</button>
        </>
        );

  return (
    <>
        {isLoading && <p>Loading...</p>}
        <h1>Log In:</h1>

        <form onSubmit={handleSubmit(Login)}>
             <input type="text" 
             placeholder="email"
             {...register('email',{ required: 'email' })} />
             
             <input type="password" 
             placeholder="password" 
             {...register('password',{ required: 'password' })}/>

            <button type="submit" 
            disabled={isLoading}>
                {isLoading ? "Loading" : "Login"}</button>
        </form>
    </>
    );
}

export default Auth;