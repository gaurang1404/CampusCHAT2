import React from 'react'

export const Hero = () => {
    return (
        <div>
            <div className='max-w-7xl p-4 mb-10 mx-auto flex flex-col justify-center gap-4'>
                <div className='flex flex-col items-center gap-4 w-full mx-auto pt-4'>
                    <div>
                        <p className='p-2 rounded-3xl pl-4 pr-4 bg-gray-100 text-center w-3xl'>AI Powered tool for student and teachers</p>
                    </div>
                    <div>
                        <h1><span className='text-7xl font-extrabold text-[black] stroke-text'>Campus</span><span className='text-[#0B2F9F] text-8xl font-extrabold'>CHAT</span></h1>
                    </div>
                    <div>
                        <p className='text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit At provident laudantium voluptatem, <br /> laboriosam ipsam corporis autem ratione magnam tempore dolore.</p>
                    </div>
                </div>
            </div>        
        </div>
    )
}
