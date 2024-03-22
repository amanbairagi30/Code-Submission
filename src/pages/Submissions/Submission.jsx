import React, { useEffect, useState } from 'react'
import axios from "axios";
import { LoaderCircleIcon } from '../../components/ui/Icons';

const Submission = () => {
  const [submissionsData, setSubmissionsData] = useState([]);

  useEffect(() => {
    getSubmissionsData();
  }, []);

  const getSubmissionsData = async () => {
    try {

      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/get-submissions`);
      console.log(res)
      if (res?.data?.success) {
        setSubmissionsData(res.data.allCodeData);
        console.log(res.data?.message);
      } else {
        console.log(res.data?.message);
        throw new Error(res.data?.message);
      }

    } catch (error) {
      console.log(error);
    }
  }

  console.log(submissionsData && submissionsData.length > 0 && Object.keys(submissionsData[0]));

  const renderValues = (key, value) => {
    switch (key.toLowerCase()) {
      case 'sourcecode':
        return (
          <pre className="whitespace-pre-wrap w-full rounded-md bg-[#202020] p-4">{value.slice(0, 100)}</pre>
        );
      case 'stdout':
        return (
          <pre className="whitespace-pre-wrap w-full rounded-md bg-[#202020] p-4">{value || "-"}</pre>
        );

      case 'codelanguage':
        switch (value) {
          case "54":
            return "C++ (GCC 9.2.0)"

          case "71":
            return "Python (3.8.1)"

          case "91":
            return "Java (JDK 17.0.6)"

          case "93":
            return "JavaScript (Node.js 18.15.0)"

          default:
            return "NULL"
        }
      case 'timestamp':
        const date = new Date(value);
        return date.toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric'/*, hour: '2-digit', minute: '2-digit'*/ });
      default:
        return value;
    }
  }

  return (
    <>
      <div className='border-2 border-[#252525] rounded-xl mt-4 text-justify p-4'>
        All Submissions
        {submissionsData.length > 0
          ?
          <div className='px-2 mt-4 overflow-auto'>
            {/* {JSON.stringify(submissionsData)} */}
            <table className="border-collapse w-full border border-gray-400">
              <tr className='border-2 border-[#252525] text-[0.8rem] font-normal p-6 '>
                {submissionsData && submissionsData.length > 0 && Object.keys(submissionsData[0]).map((key, index) => {
                  console.log(key);
                  return (
                    <th className='p-4' key={index}>{key?.toUpperCase()}</th>
                  )
                })}
              </tr>
              {submissionsData && submissionsData?.map(elem => (
                <>

                  <tr className='border-2 text-[0.9rem] border-[#252525] max-h-[6rem] mt-2' key={elem.id}>
                    {Object.entries(elem).map(([key, value], index) => (
                      <td className='p-4 bg-[#0b0b0b]' key={index}>{renderValues(key, value)}</td>
                    ))}
                  </tr>

                </>
              ))}

            </table>
          </div>
          :
          <div className='mt-10 mb-4 flex gap-2 items-center text-[0.8rem] '>
            Loading Submissions <LoaderCircleIcon className={"animate-spin"} />
          </div>
        }

      </div>
    </>
  )
}

export default Submission
