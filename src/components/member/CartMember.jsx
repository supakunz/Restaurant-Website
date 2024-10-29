import React from 'react'

const CartMember = (props) => {
  return (
    <>
      <div className='flex flex-col gap-2 relative bg-white shadow-lg py-[3rem] px-8 rounded-xl hover:bg-yellow hover:text-white group after:content-[""] after:absolute after:w-[58%] after:rounded-full after:h-2 after:top-[-3px] after:left-[50%] after:-translate-x-[50%] after:bg-black '>
        <p className='text-[18px] lg:text-[20px] font-semibold'>{props.pack}</p>
        <p className='text-[15px] lg:text-[17px]'><span className='text-[35px] lg:text-[40px] font-semibold'>${props.price}</span> /Month</p>
        <p className='text-grayLight text-[13px] lg:text-[15.5px] group-hover:text-white'>{props.detail}</p>
        <ul className='flex flex-col text-[17px] text-grayLight mt-5 mb-6'>
          {props.pack == 'Base' ?
            <div className='text-[13px] lg:text-[15.5px] group-hover:text-white flex flex-col gap-3'>
              <li className='flex items-start gap-3'><i class='bx bx-check text-green-600 text-[20px] pt-1'></i><p>{props.more[0]}</p></li>
              <li className='flex items-start gap-3'><i class='bx bx-check text-green-600 text-[20px] pt-1'></i><p>{props.more[1]}</p></li>
              <li className='flex items-start gap-3'><i class='bx bx-x text-red-600 text-[20px] pt-1' ></i><p>{props.more[2]}</p></li>
              <li className='flex items-start gap-3'><i class='bx bx-x text-red-600 text-[20px] pt-1' ></i><p>{props.more[3]}</p></li>
              <li className='flex items-start gap-3'><i class='bx bx-x text-red-600 text-[20px] pt-1' ></i><p>{props.more[4]}</p></li>
            </div>
            : props.pack == 'Intro' ?
              <div className='text-[13px] lg:text-[15.5px] group-hover:text-white flex flex-col gap-3'>
                <li className='flex items-start gap-3'><i class='bx bx-check text-green-600 text-[20px] pt-1'></i><p>{props.more[0]}</p></li>
                <li className='flex items-start gap-3'><i class='bx bx-check text-green-600 text-[20px] pt-1'></i><p>{props.more[1]}</p></li>
                <li className='flex items-start gap-3'><i class='bx bx-check text-green-600 text-[20px] pt-1' ></i><p>{props.more[2]}</p></li>
                <li className='flex items-start gap-3'><i class='bx bx-x text-red-600 text-[20px] pt-1' ></i><p>{props.more[3]}</p></li>
                <li className='flex items-start gap-3'><i class='bx bx-x text-red-600 text-[20px] pt-1' ></i><p>{props.more[4]}</p></li>
              </div>
              : props.pack == 'Popular' ?
                <div className='text-[13px] lg:text-[15.5px] group-hover:text-white flex flex-col gap-3'>
                  <li className='flex items-start gap-3'><i class='bx bx-check text-green-600 text-[20px] pt-1'></i><p>{props.more[0]}</p></li>
                  <li className='flex items-start gap-3'><i class='bx bx-check text-green-600 text-[20px] pt-1'></i><p>{props.more[1]}</p></li>
                  <li className='flex items-start gap-3'><i class='bx bx-check text-green-600 text-[20px] pt-1' ></i><p>{props.more[2]}</p></li>
                  <li className='flex items-start gap-3'><i class='bx bx-check text-green-600 text-[20px] pt-1' ></i><p>{props.more[3]}</p></li>
                  <li className='flex items-start gap-3'><i class='bx bx-x text-red-600 text-[20px] pt-1' ></i><p>{props.more[4]}</p></li>
                </div>
                : props.pack == 'Premium' ?
                  <div className='text-[13px] lg:text-[15.5px] group-hover:text-white flex flex-col gap-3'>
                    <li className='flex items-start gap-3'><i class='bx bx-check text-green-600 text-[20px] pt-1'></i><p>{props.more[0]}</p></li>
                    <li className='flex items-start gap-3'><i class='bx bx-check text-green-600 text-[20px] pt-1'></i><p>{props.more[1]}</p></li>
                    <li className='flex items-start gap-3'><i class='bx bx-check text-green-600 text-[20px] pt-1' ></i><p>{props.more[2]}</p></li>
                    <li className='flex items-start gap-3'><i class='bx bx-check text-green-600 text-[20px] pt-1' ></i><p>{props.more[3]}</p></li>
                    <li className='flex items-start gap-3'><i class='bx bx-check text-green-600 text-[20px] pt-1' ></i><p>{props.more[4]}</p></li>
                  </div> : null
          }
        </ul>
        <button className='text-[14px] lg:text-[16px] p-3 bg-yellow rounded-md group-hover:text-black group-hover:bg-white'>Choose Plan</button>
      </div>
    </>
  )
}

export default CartMember