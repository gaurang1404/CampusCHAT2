import React from 'react'
import HomePageStudent from '../../assets/Homepage.jpeg'

export const HomeCard = () => {
    return (
        <div>
            <div className='max-w-7xl mx-auto flex justify-center items-center'>
                <div className='max-w-[50%] h-[20rem] flex flex-wrap gap-2 items-start justify-center'>
                    <div className='w-full h-full grid grid-cols-2 gap-4 p-4'>
                        <div className='border p-4 text-center rounded-2xl shadow-sm'>
                            <h1 className='rounded-lg p-1 text-xl font-bold w-full bg-[#0B2F9F] text-[white]'>COURSE REGISTRATION</h1>
                            <p className="rounded-b-xl bg-gray-100 w-[96%] mx-auto h-[70%]">Students can directly register for courses online.</p>
                        </div>
                        <div className='border p-4 text-center rounded-2xl shadow-sm'>
                            <h1 className='rounded-lg p-1 text-xl font-bold w-full bg-[#0B2F9F] text-[white]'>CLASS NOTES</h1>
                            <p className="rounded-b-xl bg-gray-100 w-[98%] mx-auto h-[70%]">Teachers can upload the notes in the classroom for everyone to access.</p>
                        </div>
                        <div className='border p-4 text-center rounded-2xl shadow-sm'>
                            <h1 className='rounded-lg p-1 text-xl font-bold w-full bg-[#0B2F9F] text-[white]'>ATTENDANCE TRACK</h1>
                            <p className="rounded-b-xl bg-gray-100 w-[98%] mx-auto h-[70%]">Students can track their attendace in every course and apply for leave through the website.</p>
                        </div>
                        <div className='border p-4 text-center rounded-2xl shadow-sm'>
                            <h1 className='rounded-lg p-1 text-xl font-bold w-full bg-[#0B2F9F] text-[white]'>AI POWERED CAHTBOX</h1>
                            <p className="rounded-b-xl bg-gray-100 w-[98%] mx-auto h-[70%]">Chat with the AI and easily access profile information with just one text.</p>
                        </div>
                    </div>
                </div>
                <div>
                    <img src={HomePageStudent} alt="" />
                </div>
            </div>
        </div>
    )
}
