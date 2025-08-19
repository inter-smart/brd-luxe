import { Heading } from "../../utils/Heading";
export default function VisitUsSection() {
    return (
        <section className="relative w-full h-[380px] sm:h-[520px] md:min-h-screen overflow-hidden">
            <Heading
                as="h2"
                size="heading1"
                className=" text-white text-center bg-black min-w-[250px] lg:min-w-[300px] xl:min-w-[390px] 2xl:min-w-[470px] 3xl:min-w-[585px] h-[35px] sm:h-[40px] lg:h-[50px] xl:h-[60px] 2xl:h-[75px] 3xl:h-[90px]
                     m-auto !w-fit line-clamp-1
                     [clip-path:polygon(0%_0%,100%_0,85%_100%,15%_100%)]"
            >
                Visit Us Virtually
            </Heading>

            <div className="w-full h-full ">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full absolute top-0 left-0 object-cover -z-1 inset-0"
                >
                    <source src="/videos/showroom_visit.mp4" type="video/mp4" />
                </video>
            </div>
        </section>
    )
}
