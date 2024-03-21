import React, { useState } from 'react';
import CodeEditor from '../../components/CodeEditor/CodeEditor';
import axios, { all } from "axios"
import { toast } from 'sonner';
import { LoaderCircleIcon } from '../../components/ui/Icons';




const Form = () => {
    const [op, setOp] = useState(null)
    const [opError, setOpError] = useState(null)

    // Define state variables to store form field values
    const [allValues, setAllValues] = useState({
        username: '',
        codeLanguage: '',
        stdin: '',
        sourceCode: '',
        stdout: op,
    });

    const [loading, setLoading] = useState(false);

    const headers = {
        'Content-Type': 'application/json',
        // 'X-RapidAPI-Key':  `${import.meta.env.VITE_RAPID_API_KEY_NEW}`, 
        'X-RapidAPI-Key': `${import.meta.env.VITE_RAPID_API_KEY_NEW}`,
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
    };

    const requestBody = {
        source_code: allValues.sourceCode,
        language_id: allValues.codeLanguage,
        stdin: allValues.stdin
    };


    const runCode = async () => {
        try {

            const { codeLanguage, sourceCode } = allValues;
            if (!codeLanguage || !sourceCode) {
                toast.warning("Please enter language or source code to run the code")
                return;
            }
            setLoading(true);

            // Step-1
            const res = await axios.post("https://judge0-ce.p.rapidapi.com/submissions", requestBody, { headers })
            console.log(res.data?.token);
            console.log(res);
            // if(res.data)

            //Step-2 - Waiting while above thing get resolved
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Step-3
            const outRes = await axios.get(`https://judge0-ce.p.rapidapi.com/submissions/${res.data?.token}`, { headers });

            setLoading(false);

            console.log(outRes);
            // console.log(outRes.data.stdout)
            // console.log(outRes.data.status.description)

            if (!outRes?.data?.stdout) {
                setOpError(outRes.data.stderr);
            } else {
                setOp(outRes.data.stdout);
                setOpError(null);
                setAllValues({ ...allValues, stdout: outRes.data.stdout });
            }

        } catch (error) {
            setLoading(false);
            console.error("Error:", error);
            toast.error(error?.response.status === 429 ? "Daily API Limit key has been exhausted" : "An error has occurred , please try again later");
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { username, codeLanguage, stdin, sourceCode, stdout } = allValues;

        if (!username || !codeLanguage || !stdin || !sourceCode) {
            toast.warning("Please fill all the required fields");
            return;
        }
        console.log(allValues)

        if (op === null && opError === null) {
            runCode();
        }
        if (opError) {
            console.log("Error: " + opError)
            toast.warning("Please write correct code and then submit it !")
            return;
        }
        if (!stdout) {
            toast.warning("Please write correct code and then submit it !")
            return;
        }
        // return;
        try {
            setLoading(true);
            const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/submit`, allValues);
            setLoading(false);

            if (res.data.success) {
                toast.success(res.data.message);
            } else {
                toast.warning(res.data.message);
            }
        } catch (error) {
            setLoading(false);
            console.error("Error:", error);
            if (error.response) {
                toast.error(`Server responded with error: ${error.response.status}`);
            } else if (error.request) {
                toast.error("No response received from the server. Please try again later.");
            } else {
                toast.error("An error occurred while sending the request. Please try again later.");
            }
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setAllValues({
            ...allValues,
            [name]: value
        });
    };

    const renderLanguagesFromID = (languageId) => {
        console.log(languageId)
        switch (languageId) {
            case "54":
                return "C++ (GCC 9.2.0)"

            case "71":
                return "Python (3.8.1)"

            case "91":
                return "Java (JDK 17.0.6)"

            case "93":
                return "JavaScript (Node.js 18.15.0)"

            default:
                return "No language Selected"
        }
    }

    return (
        <>
            <div className='h-full'>
                <div className='border-green-500 mt-6  h-[20rem]'>
                    <form onSubmit={handleSubmit} className='flex flex-col lg:flex-col gap-4 border-2 border-[#252525] rounded-t-xl p-4 w-full min-h-[85vh] max-h-fit'>
                        <div className='flex flex-wrap  h-full w-full'>
                            {Object.entries(allValues).map(([key, value]) => {
                                if (key === "sourceCode" || key === "stdout") {
                                    return;
                                }
                                return (

                                    <div key={key} className='flex flex-col w-full  gap-2 mb-6'>
                                        <label htmlFor={key} className='poppins-thin text-[0.85rem]'>{key.charAt(0).toUpperCase() + key.slice(1)} <span className='text-red-400'>*</span></label>
                                        {key === 'codeLanguage' ? (
                                            <select id={key} name={key} value={value} onChange={handleChange} className='bg-[#272525] h-[2.5rem] focus:outline-none p-2 rounded-md text-[0.8rem] poppins-regular'>
                                                <option value="">Select Language</option>
                                                <option value={54}>C++ (GCC 9.2.0)</option>
                                                <option value={91}>Java (JDK 17.0.6)</option>
                                                <option value={93}>JavaScript (Node.js 18.15.0)</option>
                                                <option value={71}>Python (3.8.1)</option>
                                            </select>
                                        ) : (
                                            key === "username" ?
                                                <input id={key} name={key} value={value} onChange={handleChange} placeholder='Ex: John Doe  ' className='bg-[#272525] h-[2.5rem] focus:outline-none p-2 rounded-md text-[0.8rem] poppins-regular' />

                                                :
                                                <textarea id={key} name={key} value={value} onChange={handleChange} placeholder='Your Inputs to code' className='bg-[#272525] h-[5rem] focus:outline-none p-4 rounded-md text-[0.8rem] poppins-regular' />
                                        )}

                                    </div>
                                )
                            })}

                        </div>
                        <div className='flex flex-col lg:flex-row gap-4 h-fit w-full'>
                            <div className='flex h-[40rem] lg:w-full flex-col gap-2 w-full'>

                                <label htmlFor="sourceCode" className='poppins-thin text-[0.85rem] flex items-center justify-between'>
                                    <div >
                                        Source Code  <span className='text-red-400'>*</span>
                                    </div>
                                    <span className='text-[0.8rem] font-normal border-b-2 border-[#f7640b]'>{renderLanguagesFromID(allValues?.codeLanguage)}</span>
                                </label>
                                <CodeEditor language={renderLanguagesFromID(allValues?.codeLanguage)} value={allValues.sourceCode} onChange={(value) => setAllValues({ ...allValues, sourceCode: value })} />
                            </div>

                            <div className='borde h-[20%] mt-7 w-full lg:w-[50%]'>
                                <div className=' h-[3rem] flex items-center text-[0.8rem] px-3 bg-[#161616]'>Output</div>
                                <div className='h-[10rem] p-2 lg:h-[560px] overflow-auto border-2 border-[#252525]'>
                                    {op || opError}
                                </div>
                            </div>
                        </div>
                        <div className=' gap-2 flex items-end'>
                            <button type='submit' disabled={loading} className={` rounded-md ${loading ? "cursor-not-allowed bg-[#f7660bcb]" : "bg-[#f7640b] hover:bg-[#ff8a41]"} w-[8rem]  py-2 h-[2.5rem] flex items-center justify-center gap-2`}>  {loading ? <LoaderCircleIcon className={"animate-spin"} /> : "Submit"}</button>
                            <button type='button' onClick={runCode} disabled={loading} className={` rounded-md  ${loading ? "cursor-not-allowed bg-[#f7660bcb]" : "bg-transparent  hover:bg-[#202020]"} w-[8rem]  py-2 h-[2.5rem] flex items-center justify-center gap-2`}>  {loading ? <LoaderCircleIcon className={"animate-spin"} /> : "Run Code"}</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Form;
