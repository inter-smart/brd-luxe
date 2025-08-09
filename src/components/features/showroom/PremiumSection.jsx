import BreadCrumb from '@/components/common/BreadCrumb'
import React from 'react'
import Image from "next/image";

export default function PremiumSection() {
    return (
        <section className="w-full h-full min-h-[300px] sm:min-h-[450px] xl:min-h-[550px] 2xl:min-h-[650px] 3xl:min-h-[750px] relative 
            py-[30px] xl:py-[30px_40px] 2xl:py-[35px_45px] 3xl:py-[45px_60px] flex items-center
            before:absolute before:top-0 before:left-0 
            before:content-[''] before:h-[155px] before:w-full before:z-10
            before:bg-[linear-gradient(180deg,#000_0%,rgba(0,0,0,0)_100%)]
            after:absolute after:bottom-0 after:left-0 
            after:content-[''] after:h-[155px] after:w-full after:z-10
            after:bg-[linear-gradient(360deg,#000_0%,rgba(0,0,0,0)_100%)]">
            <div className="w-full h-full sm:max-w-[75%] absolute top-0 left-0 after:absolute after:bottom-0 after:right-0 
            after:content-[''] after:h-full after:w-[450px] after:z-10
            after:bg-[linear-gradient(270deg,#000_0%,rgba(0,0,0,0)_100%)] ">
                <Image src="/images/premiumBg.jpg" width="1400" height="890" className="w-full h-full object-cover opacity-20" alt="bg"/>
            </div>
            {/* title */}
            <div className="text-[35px] sm:text-[45px] lg:text-[50px] xl:text-[65px] 2xl:text-[80px] 3xl:text-[100px] font-bold font-base1 
            uppercase absolute top-0 bottom-0 right-0 md:right-[50px] z-20 m-auto h-auto w-auto
                    bg-clip-text text-transparent line-clamp-1 flex items-center justify-center pointer-events-none 
                    [background-image:linear-gradient(270deg,#141414_0%,#252525_51.92%,#141414_100%)]"  style={{ writingMode: 'sideways-lr' }}>
                Showrooms
            </div>
            {/* breadcrumb */}
            <div className="container absolute top-[40px] left-0 z-20 right-0 m-auto">
                <BreadCrumb
                    items={[
                        { label: "Home", href: "/" },
                        { label: "Showroom", href: "/showroom" },
                    ]}
                />
            </div>
            <div className="container relative z-10 ">

                <div className="w-full sm:max-w-[350px] xl:max-w-[400px] 2xl:max-w-[500px] 3xl:max-w-[700px] ml-auto relative ">
                    <div className="max-w-[275px] xl:max-w-[350px] 2xl:max-w-[420px] 3xl:max-w-[550px]">
                        <div className="text-[22px] leading-[22px] 
                        lg:text-[28px] lg:leading-[28px] 
                        xl:text-[35px] xl:leading-[35px] 
                        2xl:text-[44px] 2xl:leading-[44px] 
                        3xl:text-[55px] 3xl:leading-[55px] 
                        text-white font-light mb-[15px] xl:mb-[20px] 2xl:mb-[30px] 3xl:mb-[40px] font-base1">
                            Premium Showrooms
                            Across Kerala,<br></br>
                            Designed for You
                        </div>
                        <p className="text-[10px] xl:text-[13px] 2xl:text-[16px] 3xl:text-[20px] !font-base2 text-white font-extralight">Discover our state-of-the-art showrooms,
                            where your journey to owning a Maruti Suzuki begins in comfort, elegance, and trust.</p>
                    </div>
                </div>

            </div>
        </section >
    )
}
