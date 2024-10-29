import React from 'react'

const ContactPage = () => {
  return (
    <>
      <section>
        <div className='container-section py-[100px]'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-[14px] sm:text-[15px] lg:text-[16px]'>
            <div className='flex flex-col gap-1 bg-white p-5'>
              <h1 className='text-[21px] lg:text-[25px] text-yellow font-semibold'>Address</h1>
              <p><i class="bx bxs-map text-yellow text-[18px] mr-[0.4rem]"></i>123 Street, New York, USA</p>
            </div>
            <div className='flex flex-col gap-1 bg-white p-5'>
              <h1 className='text-[21px] lg:text-[25px] text-yellow font-semibold'>Phone</h1>
              <p><i class="bx bxs-phone text-yellow text-[18px] mr-[0.4rem]"></i>+012 345 67890</p>
            </div>
            <div className='flex flex-col gap-1 bg-white p-5'>
              <h1 className='text-[21px] lg:text-[25px] text-yellow font-semibold'>Email</h1>
              <p><i class="fa fa-envelope text-yellow text-[16px] mr-[0.4rem]"></i>mail@domain.com</p>
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 mt-[3rem] gap-6'>
            <div className='h-[260px] md:h-full'>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d42102.681655103755!2d-90.21880747306513!3d41.57249733178677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87e2139c16591a01%3A0x5f9c1c5e58038afd!2sFreelance%20Landscape!5e0!3m2!1sth!2sth!4v1721811845934!5m2!1sth!2sth" width="100%" height="100%" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <div className='flex flex-col gap-6 text-[14px] lg:text-[16px]'>
              <div className='flex gap-6'>
                <input className='p-2 w-full focus:border-yellow border-[1px] border-solid focus:outline-none' type="text" name="" placeholder='Your name...' />
                <input className='p-2 w-full focus:border-yellow border-[1px] border-solid focus:outline-none' type="email" name="" placeholder='Your email...' />
              </div>
              <input className='p-2 focus:border-yellow border-[1px] border-solid focus:outline-none' type="text" placeholder='Subject...' />
              <textarea className='p-2 h-[100px] focus:border-yellow border-[1px] border-solid focus:outline-none' name="" id="" placeholder='Message' style={{ resize: "none" }}></textarea>
              <button className='p-3 bg-yellow text-white'>Send Message</button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ContactPage