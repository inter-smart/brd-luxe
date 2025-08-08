import { Heading } from "@/components/utils/Heading";

const key_highlight_data = {
  heading: {
    title: "Key Highlights",
  },
  highlight_list: [
    {
      description: "Heater",
    },
    {
      description: "Central Locking",
    },
    {
      description: "Anti Lock Braking System",
    },
    {
      description: "Navigation System",
    },
    {
      description: "Power Door Locks",
    },
    {
      description: "Air Conditioner",
    },
    {
      description: "Adjustable Steering",
    },
    {
      description: "Driver Airbag",
    },
    {
      description: "Crash Sensor",
    },
    {
      description: "Rear Camera",
    },
    {
      description: "Parking Sensors",
    },
    {
      description: "Adjustable Seats",
    },
  ],
};

export default function KeyHighlightSection({ data = key_highlight_data }) {
  return (
    <section className="w-full h-auto block">
      <div className="container">
        <div className="w-full h-auto flex flex-wrap">
          <div className="w-1/2">
            <div className="w-full h-auto p-[35px_40px]">
              <Heading
                as="h1"
                size={"heading1"}
                className="text-white mb-[15px] md:mb-[20px] 2xl:mb-[40px] 3xl:mb-[35px]"
              >
                {data?.heading?.title}
              </Heading>
              <ul className="block flex-wrap">
                {data?.highlight_list?.map((item, index) => (
                  <li key={`key-${index}`}>{item?.description}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="w-1/2"></div>
        </div>
      </div>
    </section>
  );
}
