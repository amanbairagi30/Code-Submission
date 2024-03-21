import React from 'react'
import {SquareArrowUpRightIcon} from '../../components/ui/Icons';
import { Link, useLocation } from 'react-router-dom';
import TUF from "../../assets/tuf.png";

const Navbar = () => {
    const location = useLocation();

    return (
        <>
            <nav className='flex sticky top-[0.8rem] bg-[#161616] px-3 py-3 h-fit border-2 border-[#252525] rounded-full text-[0.8rem] items-center justify-between '>
                <div className='text-center w-[2rem] h-auto rounded-full'>
                    <img className='w-full h-full rounded-full' src={TUF} alt="" />
                </div>
                <Link to={location.pathname === "/" ? "/submissions" : "/"}>
                    <div className='border-2 border-transparent hover:border-b-2 hover:border-b-[#f7640b] cursor-pointer flex items-center gap-1'><span className=''>{location.pathname === "/" ? "Submissions" : "Home"}</span><SquareArrowUpRightIcon /></div>
                </Link>
            </nav>
        </>
    )
}

export default Navbar
