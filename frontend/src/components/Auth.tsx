// import { ChangeEvent, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { SignupInput } from "@dishasingh077/medium-again";
// import axios from "axios";
// import { BACKEND_URL } from "../config";

// export const Auth = ({ type }: { type: "signup" | "signin" }) => {

//     const navigate = useNavigate();
//     const [postInputs, setPostInputs] = useState<SignupInput>({
//         name: "",
//         username: "",
//         password: ""
//     });

//     async function sendRequest() {
//         try {
//             const response = await axios.post(`${BACKEND_URL}api/v1/user/${type === "signup" ? 'signup' : 'signin'}`, postInputs);

//             const {  jwt } = response.data; // Assuming the response has a property "token"
//             console.log('JWT received:', jwt); // Log the received JWT
//             localStorage.setItem("token", jwt);
//             console.log('JWT stored in localStorage'); // Log after storing JWT
//             navigate("/blogs");
//         } catch (err) {
//             console.error('Request failed:', err); // Log the error
//             alert('Request failed');
//         }
//     }

//     return (
//         <div className="h-screen flex justify-center flex-col">
//             <div className="flex justify-center">
//                 <div>


//                     <div className="px-10">
//                         <div className="text-3xl font-extrabold">
//                             Create an account
//                         </div>



//                         <div className="text-slate-400">
//                             {type === "signin" ? "Don't have an account?" : "Already have an account?"}

//                             <Link className="underline" to={type === "signin" ? "/signup" : "/signin"}>{type === "signin" ? "Sign Up" : "Sign In"}</Link>
//                         </div>
//                     </div>




//                     <div className="pt-8">
//                         {type === "signup" ? <LabelledInput label="Name" placeholder="Disha Singh" onChange={(e) => {
//                             setPostInputs({
//                                 ...postInputs,
//                                 name: (e.target.value)
//                             })
//                         }} /> : null}




//                         <LabelledInput label="Username" placeholder="dishumau@gmail.com" onChange={(e) => {
//                             setPostInputs({
//                                 ...postInputs,
//                                 username: (e.target.value)
//                             })
//                         }} />




//                         <LabelledInput label="Password" type={"password"} placeholder="w3746w387" onChange={(e) => {
//                             setPostInputs({
//                                 ...postInputs,
//                                 password: e.target.value
//                             })
//                         }} />


//                         <button onClick={sendRequest} type="button" className="my-4 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
//                             {type === "signup" ? "Sign Up" : "Sign In"}
//                         </button>

//                     </div>
//                 </div>

//             </div>


//         </div>
//     );
// };



// interface LabelledInputType {
//     label: string;
//     placeholder: string;
//     onChange: (e: ChangeEvent<HTMLInputElement>) => void;
//     type?: string
// }






// function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
//     return <div>
//         <label className="block mb-2 text-sm font-medium text-black pt-2">{label}</label>
//         <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
//     </div>
// }










import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupInput } from "@dishasingh077/medium-again";

import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        username: "",
        password: ""
    });

    // async function sendRequest() {
    //     try {
    //         const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);

    //         console.log('Response data:', response.data);  // Log the response data

    //         // const { token } = response.data;  // Corrected destructuring
    //         const token = response.data.split(" ")[1]; // Extract token after "Bearer"

    //         console.log('Received token:', token);  // Log the received token

    //         if (token) {
    //             localStorage.setItem("token", token);
    //             console.log('Token stored in localStorage:', localStorage.getItem("token"));  // Verify token storage
    //             navigate("/blogs");
    //         } else {
    //             console.error('JWT token not found in response');
    //         }
    //     } catch (e) {
    //         console.error('Error during signup/signin:', e);  // Log the error
    //         alert("Error while signing up");
    //     }
    // }



    // async function sendRequest() {
    //     try {
    //         const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);

    //         console.log('Response data:', response.data);  // Log the response data

    //         // const token = response.data.token;// Corrected to access 'jwt' instead of 'token'
    //         const token = response.data.jwt;// Corrected to access 'jwt' instead of 'token'

    //         // token for signup, jwt for signin

    //         console.log('Received token:', token);  // Log the received token

    //         if (token) {
    //             localStorage.setItem("token", token);
    //             console.log('Token stored in localStorage:', localStorage.getItem("token"));  // Verify token storage
    //             navigate("/blogs");
    //         } else {
    //             console.error('JWT token not found in response');
    //         }
    //     } catch (e) {
    //         console.error('Error during signup/signin:', e);  // Log the error
    //         alert("Error while signing up");
    //     }
    // }

    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);

            console.log('Response data:', response.data);  // Log the response data

            let token;
            if (type === "signup") {
                token = response.data.token;  // For signup
            } else {
                token = response.data.jwt;    // For signin
            }

            console.log('Received token:', token);  // Log the received token

            if (token) {
                localStorage.setItem("token", token);
                console.log('Token stored in localStorage:', localStorage.getItem("token"));  // Verify token storage
                navigate("/blogs");
            } else {
                console.error('JWT token not found in response');
            }
        } catch (e) {
            console.error('Error during signup/signin:', e);  // Log the error
            alert("Error while signing up");
        }
    }










    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>
                <div className="px-10">
                    <div className="text-3xl font-extrabold">
                        {type === "signin" ? "Sign In to your account" : "Create your account"}
                    </div>

                    <div className="text-slate-500">
                        {type === "signin" ? "Don't have an account?" : "Already have an account?"}
                        <Link className="pl-2 underline" to={type === "signin" ? "/signup" : "/signin"}>
                            {type === "signin" ? "Sign up" : "Sign in"}
                        </Link>
                    </div>
                </div>

                <div className="space-y-4">
                    {type === "signup" ? <LabelledInput label="Name" placeholder="name" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            name: e.target.value
                        })
                    }} /> : null}
                    <LabelledInput label="Email" placeholder="email" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            username: e.target.value
                        })
                    }} />
                    <LabelledInput label="Password" type={"password"} placeholder="password" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            password: e.target.value
                        })
                    }} />
                    <button onClick={sendRequest} type="button" className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup" ? "Sign up" : "Sign in"}</button>
                </div>
            </div>
        </div>
    </div>
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
    return <div>
        <label className="block mb-2 text-sm text-black font-semibold pt-4">{label}</label>
        <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
    </div>
}