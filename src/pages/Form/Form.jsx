import React, { useState } from 'react';
import CodeEditor from '../../components/CodeEditor/CodeEditor';
import axios from "axios"
import { toast } from 'sonner';



const Form = () => {
    // Define state variables to store form field values
    const [allValues, setAllValues] = useState({
        username: '',
        codeLanguage: '',
        stdin: '',
        sourceCode: ''
    });

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { username, codeLanguage, stdin, sourceCode } = allValues
        if (!username || !codeLanguage || !stdin || !sourceCode) {
            toast.warning("Please fill all the required feild")
            return;
        }
        console.log('All Values Data:', allValues);
        setLoading(true);
        const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/submit`, allValues);
        setLoading(false);
        console.log(res);
        if (res.data.success) {
            toast.success(res.data.message);
        } else {
            toast.warning(res.data.message)
        }
    };
    const handleChange = (event) => {
        const { name, value } = event.target;
        setAllValues({
            ...allValues,
            [name]: value
        });
    };

    return (
        <>
            <div className='h-full'>
                
                <div className='border-green-500 mt-6  h-[20rem]'>
                    <form onSubmit={handleSubmit} className='flex flex-col lg:flex-row gap-4 border-2 border-[#252525] rounded-t-xl p-4 w-full min-h-[85vh] max-h-fit'>
                        <div className='flex flex-col w-full'>
                            {Object.entries(allValues).map(([key, value]) => {
                                if (key === "sourceCode") {
                                    return;
                                }
                                return (

                                    <div key={key} className='flex flex-col gap-2 mb-6'>
                                        <label htmlFor={key} className='poppins-thin text-[0.85rem]'>{key.charAt(0).toUpperCase() + key.slice(1)} <span className='text-red-400'>*</span></label>
                                        {key === 'codeLanguage' ? (
                                            <select id={key} name={key} value={value} onChange={handleChange} className='bg-[#272525] h-[2.5rem] focus:outline-none p-2 rounded-md text-[0.8rem] poppins-regular'>
                                                <option value="">Select Language</option>
                                                <option value="C++">C++</option>
                                                <option value="Java">Java</option>
                                                <option value="JavaScript">JavaScript</option>
                                                <option value="Python">Python</option>
                                            </select>
                                        ) : (
                                            key === "username" ?
                                                <input id={key} name={key} value={value} onChange={handleChange} placeholder='Ex: John Doe  ' className='bg-[#272525] h-full focus:outline-none p-2 rounded-md text-[0.8rem] poppins-regular' />

                                                :
                                                <textarea id={key} name={key} value={value} onChange={handleChange} placeholder='Your Inputs to code' className='bg-[#272525] h-full focus:outline-none p-6 rounded-md text-[0.8rem] poppins-regular' />
                                        )}

                                    </div>
                                )
                            })}
                            <div className='flex-1 hidden lg:flex items-end'>
                                <button disabled={loading} className={` rounded-lg  ${loading ? "cursor-not-allowed bg-[#f7660bcb]" : "bg-[#f7640b] hover:bg-[#ff8a41]"} w-[8rem]  py-2 h-[2.5rem] flex items-center justify-center gap-2`}>  {loading ? <svg className='w-[1rem] animate-spin' viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#fff" d="M12.9 3.1c1.3 1.2 2.1 3 2.1 4.9 0 3.9-3.1 7-7 7s-7-3.1-7-7c0-1.9 0.8-3.7 2.1-4.9l-0.8-0.8c-1.4 1.5-2.3 3.5-2.3 5.7 0 4.4 3.6 8 8 8s8-3.6 8-8c0-2.2-0.9-4.2-2.3-5.7l-0.8 0.8z"></path> </g></svg> : "Submit"}</button>

                            </div>
                        </div>
                        <div className='flex flex-col gap-2 w-full'>
                            <label htmlFor="sourceCode" className='poppins-thin text-[0.85rem] flex items-center justify-between'>
                                <div >
                                    Source Code <span className='text-red-400'>*</span>
                                </div>
                                <span className='text-[0.8rem] font-normal border-b-2 border-[#f7640b]'>{allValues.codeLanguage}</span>
                            </label>
                            <CodeEditor language={allValues.codeLanguage} value={allValues.sourceCode} onChange={(value) => setAllValues({ ...allValues, sourceCode: value })} />
                        </div>

                        <div className='flex-1 flex items-end lg:hidden'>
                                <button disabled={loading} className={` rounded-lg  ${loading ? "cursor-not-allowed bg-[#f7660bcb]" : "bg-[#f7640b] hover:bg-[#ff8a41]"} w-[8rem]  py-2 h-[2.5rem] flex items-center justify-center gap-2`}>  {loading ? <svg className='w-[1rem] animate-spin' viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#fff" d="M12.9 3.1c1.3 1.2 2.1 3 2.1 4.9 0 3.9-3.1 7-7 7s-7-3.1-7-7c0-1.9 0.8-3.7 2.1-4.9l-0.8-0.8c-1.4 1.5-2.3 3.5-2.3 5.7 0 4.4 3.6 8 8 8s8-3.6 8-8c0-2.2-0.9-4.2-2.3-5.7l-0.8 0.8z"></path> </g></svg> : "Submit"}</button>

                            </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Form;
