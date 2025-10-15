"use client"
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { FcGoogle } from "react-icons/fc";
import { IoLogoLinkedin } from "react-icons/io5";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link"

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  first_name: z.string().min(3, { message: "Must be 3 or more characters long" }),
  last_name: z.string().min(3, { message: "Must be 3 or more characters long" }),
  ref_token: z.string().min(6, { message: "Must be 6 or more characters long" }),
  password: z.string().min(12, { message: "Must be 12 or more characters long" }).optional(),
});


const VerifiedEmail = () => {
  
  const router = useRouter();
  const [isSectionVisible, setIsSectionVisible] = useState(false);

  {/*useEffect(() => {
    // Initialize Google Sign-In
    gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: 'YOUR_CLIENT_ID.apps.googleusercontent.com',
      });
    });
  }, []); // Empty dependency array ensures the effect runs only once*/}

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email:"",
      first_name:"",
      last_name: "",
    },
  });

  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (!values.password && !values.ref_token) {
        // Request invite scenario
        console.log("Request invite");
      } else if (values.password) {
        // Login scenario
        console.log("Login");
        // Implement logic to send login confirmation link via email
      } else if (!values.password && values.ref_token) {
        // Create account scenario
        console.log("Create account");
        // Implement logic to send setup confirmation link via email
      }
      // Handle other actions based on the backend response
      console.log(values);
      const response = await axios.post("/api/users/", values);
      const { token } = response.data;
  
      // Store token in local storage
      localStorage.setItem('jwtToken', token);
  
      // Fetch data from backend with JWT token included
      const fetchedDataResponse = await fetch('/api/users/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
  
      const data = await fetchedDataResponse.json();
      console.log(data);
  
      // Redirect to the next page on success
      router.push("/set-up");
    } catch (error) {
      // Handle errors
      console.error("Error creating user:", error);
  
      // Check if the error is due to token expiry
      if (error.response && error.response.status === 401) {
        // Token has expired, redirect user to login page
        router.push("/login");
      } else {
        // Handle other errors
        // Example: display a notification to the user
        toast({
          title: "Error",
          description: "An error occurred. Please try again later.",
        });
      }
    }
  };

  const handleEmailChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value;
    // Make backend request to check email and retrieve additional data
    try {
      const response = await axios.get(`/api/users/${email}`);
      const userData = response.data;
      // Update form fields based on retrieved data
      form.setValue("first_name", userData.first_name);
      form.setValue("last_name", userData.last_name);
      // Show or hide password field based on backend response
      setIsSectionVisible(!!userData.password);
    } catch (error) {
      // Handle error
      console.error("Error retrieving user data:", error);
    }
  };
 
  const GoogleLogin = () => {
    const handleGoogleLogin = async () => {
      try {
        const googleAuth = await gapi.auth2.getAuthInstance();
        const googleUser = await googleAuth.signIn();
  
        const idToken = googleUser.getAuthResponse().id_token;
  
        // Send idToken to backend for verification
        // Example: axios.post('/auth/google', { idToken });
  
      } catch (error) {
        console.error("Error signing in with Google:", error);
      }
    };
  
    return (
      <div className="border rounded-3xl bg-muted/5 flex p-2 justify-center cursor-pointer" onClick={handleGoogleLogin}>
        <p className="flex items-center text-base font-medium">
          Continue with <FcGoogle className="w-6 h-6 ml-2 mr-1"/> Google
        </p>
      </div>
    );
  };
  
  const { handleSubmit, formState: { errors }, watch } = useForm();
  const isValidEmail = form.formState.dirtyFields.email && !form.formState.errors.email;
  const refToken = watch("ref_token");
  const password = watch("password");

  return (
    <Form {...form}>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 text-muted w-full"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <section className=" flex flex-col gap-2">

                <FormLabel className="text-sm font-medium">Email address</FormLabel>
                <FormControl>
                  <Input placeholder="youremail@gmail.com" {...field} />
                </FormControl>
              </section>
            </FormItem>
          )}
        />
        {(password || refToken) && (
        <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
             <section className="w-[13.5rem] flex flex-col gap-2">
            <FormLabel className="text-sm font-semibold">Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" {...field} />
              </FormControl>
              </section>
          </FormItem>
        )}
        />
      )}
 {refToken && (
        <main className="flex flex-col gap-6">

       <section className="flex gap-4">
       <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                   <section className="w-[13.5rem] flex flex-col gap-2">
                  <FormLabel className="text-sm font-semibold">First name</FormLabel>
                    <FormControl>
                      <Input placeholder="First name" {...field} />
                    </FormControl>
                    </section>
                </FormItem>
              )}
              />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                                     <section className="w-[13.5rem] flex flex-col gap-2">

                  <FormLabel className="text-sm font-semibold">Last name</FormLabel>
                    <FormControl>
                      <Input placeholder="Last name" {...field} />
                    </FormControl>
                    </section>
                </FormItem>
              )}
              />
              </section>

            <FormField
              control={form.control}
              name="ref_token"
              render={({ field }) => (
                <FormItem>
                  <section className="w-[28rem] flex flex-col gap-2">
                    <FormLabel className="text-sm font-semibold">Invitation code</FormLabel>
                    <FormControl>
                      <Input className="border-none pl-0 py-2 text-base font-medium text-gray/60" disabled  {...field}/>
                    </FormControl>
                  </section>
                </FormItem>
              )}
              />
  
              </main>
      )}

        {(!password && refToken) && (
          <>
                <Button type="submit" className="text-xl rounded-full font-medium w-[28rem]">
          Create account
          </Button>
          </>
        )}
        {(!password && !refToken) && (
          <>
<Link href="https://www.clous.app/contact" className="text-xl rounded-full flex items-center justify-center bg-primary text-secondary py-2 font-medium w-[28rem]">
  Request invite
          </Link>          </>
        )}
        {password && (
          <>
<Button type="submit" className="text-xl rounded-full font-medium w-[28rem]">
  Sign on
          </Button>           </>
        )}
      <div className="w-full flex items-center">
        <div className="w-full h-[1px] bg-border"></div>
        <p className="text-border text-sm font-medium mx-1">OR</p>
        <div className="w-full h-[1px] bg-border"></div>

      </div>
      <div className="border rounded-3xl bg-muted/5 flex p-2 justify-center cursor-not-allowed " onClick={GoogleLogin}>
        <p className="flex items-center text-base font-medium">
Continue with <FcGoogle className="w-6 h-6  ml-2 mr-1" /> Google
        </p>

      </div>
      <div className="border rounded-3xl bg-muted/5 flex p-2 justify-center cursor-not-allowed">
        <p className="flex items-center text-base font-medium">
Continue with <IoLogoLinkedin className="w-6 h-6 text-[#0A66C2] ml-2 mr-1"/> Linkedin
        </p>

      </div>
    

      </form>
    </Form>
  );
}

 
export default VerifiedEmail;

