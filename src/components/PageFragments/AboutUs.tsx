import { AboutUsContent } from "@utils/contents/General";
import React from "react";

const AboutUs = () => {
	return (
		<section className='w-full bg-black py-10 lg:py-32 px-6 lg:px-10'>
			<div className='max-w-[1540px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start'>
				{/* Left Side: Bold Header */}
				<div className='lg:col-span-5'>
					<h2 className='text-2xl lg:text-4xl font-black text-white leading-[0.85] uppercase'>
						About <br />
						us
					</h2>
				</div>

				{/* Right Side: Professional Copy */}
				<div className='lg:col-span-7 flex flex-col items-end'>
					<AboutUsContent />
				</div>
			</div>
		</section>
	);
};

export default AboutUs;
