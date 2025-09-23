import Image from "next/image";
import Link from "next/link";
export default function TestdriveeSection({ data }) {
  const test_drive_section = data?.showroom_acf?.test_drive_section;

  return test_drive_section?.enable__disable_book_test_drive_section ===
    true ? (
    <section>
      <div className="container">
        <div className="flex flex-wrap -m-[5px] xl:-m-[8px] 2xl:-m-[10px] 3xl:-m-[15px] mb-[25px] lg:!mb-[35px] 2xl:!mb-[45px] 3xl:!mb-[55px]">
          <div className="w-full sm:w-1/2 p-[5px] xl:p-[8px] 2xl:p-[10px] 3xl:p-[15px]">
            <div
              className="w-full h-full p-[15px] lg:p-[30px_25px] xl:p-[35px_25px] 2xl:p-[40px_25] bg-gradient-to-tr 
                                    from-[rgba(217,217,217,0)] to-[rgba(115,115,115,0.1)]
                                    border-[1px] border-solid border-white/10 rounded-[10px] backdrop-blur-[20px] 
                                    shadow-sm transition duration-300 hover:border-white/20 hover:from-[rgba(217,217,217,0.1)] hover:translate-y-1
                                    flex flex-wrap items-center"
            >
              <div className="w-full lg:w-[120px] xl:w-[150px] 2xl:w-[180px] 3xl:w-[230px] flex-items-center justify-center">
                <div className="w-full h-full flex items-center justify-center max-lg:max-w-[125px] m-auto">
                  <Image
                    src={
                      test_drive_section?.logo?.url || "/images/placeholder.jpg"
                    }
                    alt={test_drive_section?.logo?.alt || "test drive logo"}
                    width="225"
                    height="65"
                    placeholder="blur"
                    blurDataURL="/images/placeholder.jpg"
                  />
                </div>
              </div>
              {(test_drive_section?.phone_number ||
                test_drive_section?.email) && (
                <div className="w-full lg:w-[calc(100%-120px)] xl:w-[calc(100%-150px)] 2xl:w-[calc(100%-180px)] 3xl:w-[calc(100%-230px)] pl-[35px] 3xl:pl-[40px]">
                  <div className="flex flex-wrap w-full max-lg:text-center">
                    {test_drive_section?.phone_number && (
                      <div className="w-1/2 p-2">
                        <div className="xl:text-[10px] 2xl:text-[12px] 3xl:text-[16px] text-white font-light font-base1 mb-[5px]">
                          Call
                        </div>
                        <Link
                          href={`tel:${test_drive_section?.phone_number}`}
                          className="text-[10px] xl:text-[13px] 2xl:text-[16px] 3xl:text-[20px] text-white flex max-lg:justify-center transition duration-300 hover:text-[#F29A0D]"
                        >
                          {test_drive_section?.phone_number}
                        </Link>
                      </div>
                    )}

                    {test_drive_section?.email && (
                      <div className="w-1/2 p-2">
                        <div className="xl:text-[10px] 2xl:text-[12px] 3xl:text-[16px] text-white font-light font-base1 mb-[5px]">
                          Email
                        </div>
                        <Link
                          href={`mailto:${test_drive_section?.email}`}
                          className="text-[10px] xl:text-[13px] 2xl:text-[16px] 3xl:text-[20px] text-white flex max-lg:justify-center transition duration-300 hover:text-[#F29A0D]"
                        >
                          {test_drive_section?.email}
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="w-full sm:w-1/2 p-[5px] xl:p-[8px] 2xl:p-[10px] 3xl:p-[15px]">
            <div
              className="w-full h-full p-[25px] lg:p-[30px_25px] xl:p-[35px_25px] 2xl:p-[40px_25] bg-gradient-to-tr 
                                    from-[rgba(217,217,217,0)] to-[rgba(115,115,115,0.1)]
                                    border-[1px] border-solid border-white/10 rounded-[10px] backdrop-blur-[20px] 
                                    shadow-sm transition duration-300 hover:border-white/20 hover:from-[rgba(217,217,217,0.1)] hover:translate-y-1
                                    flex flex-wrap items-center justify-between max-lg:text-center"
            >
              <div className="p-[5px] max-lg:w-full">
                <div
                  className="text-[18px] leading-[22px] lg:text-[23px] lg:leading-[23px] xl:text-[30px] xl:leading-[30px] 2xl:text-[35px] 
                                    2xl:leading-[35px] 3xl:text-[45px] 3xl:leading-[45px] text-white font-base1 lg:max-w-[220px] xl:max-w-[250px] 2xl:max-w-[350px] 3xl:max-w-[400px] max-lg:m-auto"
                >
                  {test_drive_section?.title}
                </div>
              </div>
              {test_drive_section?.button_url?.url && (
                <div className="p-[5px] max-lg:w-full">
                  <Link
                    href={test_drive_section?.button_url?.url}
                    target={test_drive_section?.button_url?.target}
                    className="text-[12px] sm:text-[14px]  2xl:text-[15px] 3xl:text-[18px] leading-[1] 
                                    tracking-[1px] text-center font-semibold font-base1 text-white p-[8px_10px] sm:p-[8px_15px] lg:p-[8px_20px] w-fit
                                        2xl:p-[10px_25px] 3xl:p-[10px_30px] rounded-[4px] sm:rounded-[6px] 
                                    2xl:rounded-[8px] 3xl:rounded-[10px] border hover:text-black hover:bg-white transition-all 
                                    duration-300 ease-in-out max-lg:m-auto block"
                  >
                    {test_drive_section?.button_text}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : null;
}
