import { performanceFeatures } from "@utils/contents/General";
import React from "react";
import { FiZap, FiShield, FiHeadphones } from "react-icons/fi";

const PerformanceComp = () => {
	return (
		<section className='w-full bg-white pb-20 lg:py-24 px-3 lg:px-10'>
			<div className='max-w-[1540px] mx-auto'>
				{/* Top Heading Section */}
				<div className='text-center max-w-3xl mx-auto mb-10 lg:mb-20'>
					<h2 className='text-2xl lg:text-5xl font-bold text-black mb-6 tracking-tight'>
						Performance You Can Rely On
					</h2>
					<p className='text-zinc-600 text-sm lg:text-lg leading-relaxed'>
						We offer dependable parts and peripherals that deliver speed,
						durability, and consistent performance, so your work, gaming, and
						everyday tasks run without interruption.
					</p>
				</div>

				{/* Features Grid */}
				<div className='grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16'>
					{performanceFeatures.map((item, index) => (
						<div key={index} className='flex items-start gap-5 group'>
							{/* Icon Container (Matched to your image) */}
							<div className='flex-shrink-0 w-20 h-20 bg-zinc-100 rounded-xl flex items-center justify-center group-hover:bg-blue-50 transition-colors duration-300'>
								{item.icon}
							</div>

							{/* Text Content */}
							<div className='flex flex-col'>
								<h3 className='text-xl font-bold text-black mb-2 uppercase tracking-wide'>
									{item.title}
								</h3>
								<p className='text-zinc-500 text-sm leading-relaxed'>
									{item.description}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default PerformanceComp;
