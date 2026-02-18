import { CompanyName, CompanyShortName } from "@constants";
import { FiHeadphones, FiShield, FiZap } from "react-icons/fi";

export const MainTermsOfUse = () => {
	return (
		<div id='termsOfUse' className='text-white/80 space-y-6'>
			<div>
				<h4 className='text-base sm:text-xl xl:text-2xl font-black text-white uppercase tracking-tight'>
					Terms of Service & Hardware Sales Agreement
				</h4>
				<p className='mt-3 leading-[1.8] text-xs md:text-sm xl:text-base'>
					By accessing the {CompanyName} digital storefront and finalizing a
					purchase, you agree to the following operational standards regarding
					high-performance hardware fulfillment:
				</p>
			</div>

			<ul className='list-none space-y-5 text-xs md:text-sm xl:text-base'>
				<li>
					<span className='font-bold text-gray-300 block uppercase text-[11px] tracking-wider mb-1'>
						01. Order Fulfillment & Inventory
					</span>
					{CompanyName} specializes in precision-engineered hardware. While we
					maintain a robust inventory, order confirmation is subject to
					technical availability. In cases where a high-demand component is
					backordered, customers will be notified within 24 hours.
				</li>

				<li>
					<span className='font-bold text-gray-300 block uppercase text-[11px] tracking-wider mb-1'>
						02. Technical Payment Verification
					</span>
					To ensure secure transactions, all manual bank transfers require a
					digital receipt upload. Fulfillment protocols commence immediately
					once our finance department reconciles the funds, ensuring your
					hardware is allocated to your order.
				</li>

				<li>
					<span className='font-bold text-gray-300 block uppercase text-[11px] tracking-wider mb-1'>
						03. Shipping & Fragile Handling
					</span>
					Hardware components are sensitive assets. Our logistics partners are
					trained in "Fragile Tech Handling." While we provide estimated
					delivery windows, {CompanyName} is not liable for delays caused by
					third-party courier logistics or regional security inspections.
				</li>

				<li>
					<span className='font-bold text-gray-300 block uppercase text-[11px] tracking-wider mb-1'>
						04. Dynamic Pricing & Tech Volatility
					</span>
					The hardware market is subject to global chipset availability and
					exchange rate fluctuations. {CompanyName} reserves the right to adjust
					digital pricing in real-time to reflect current market value before an
					order is finalized.
				</li>

				<li>
					<span className='font-bold text-gray-300 block uppercase text-[11px] tracking-wider mb-1'>
						05. Technical Compatibility Responsibility
					</span>
					Customers are responsible for ensuring that components (CPUs, GPUs,
					Motherboards) are compatible with their existing systems.{" "}
					{CompanyName} provides detailed specifications, but the final
					integration compatibility rests with the user.
				</li>

				<li>
					<span className='font-bold text-gray-300 block uppercase text-[11px] tracking-wider mb-1'>
						06. Storage for Pickup Orders
					</span>
					Items selected for "Warehouse Pickup" will be held for 10 business
					days. After this window, a technical holding fee may be applied to
					secure the inventory space for incoming stock.
				</li>
			</ul>

			<div className='bg-zinc-900/50 p-6 rounded-2xl border border-white/5 mt-6'>
				<p className='leading-[1.6] text-xs md:text-sm italic text-zinc-400'>
					<span className='font-bold text-blue-500 not-italic uppercase text-[10px] block mb-1'>
						Technical Liability Disclaimer:
					</span>
					{CompanyName} is an authorized retailer of digital hardware. We do not
					manufacture the components. All long-term warranty claims are subject
					to the manufacturer’s specific terms, though we provide full
					assistance in the RMA (Return Merchandise Authorization) process.
				</p>
			</div>
		</div>
	);
};

export const PrivacyPolicy = () => {
	return (
		<div id='privacyPolicy' className='text-zinc-400 space-y-8'>
			<div>
				<h4 className='text-sm sm:text-xl xl:text-2xl font-black text-white uppercase tracking-tighter'>
					01. System Data & Privacy
				</h4>
				<p className='mt-3 leading-[1.8] text-xs md:text-sm xl:text-base'>
					{CompanyName} utilizes data intelligence to provide a secure
					environment for high-value hardware transactions. We strictly adhere
					to the Nigeria Data Protection Regulation (NDPR) to protect your
					digital identity.
				</p>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-6'>
					<div className='p-4 bg-zinc-900/50 rounded-2xl border border-white/5'>
						<span className='font-bold text-white text-xs uppercase block mb-2 tracking-widest'>
							Fulfillment Data
						</span>
						<p className='text-xs leading-relaxed'>
							Shipping coordinates and contact data are used strictly to
							facilitate the secure transit of your hardware components.
						</p>
					</div>
					<div className='p-4 bg-zinc-900/50 rounded-2xl border border-white/5'>
						<span className='font-bold text-white text-xs uppercase block mb-2 tracking-widest'>
							Transaction Security
						</span>
						<p className='text-xs leading-relaxed'>
							Payment tokens and verification logs are encrypted to prevent
							unauthorized financial access during the checkout process.
						</p>
					</div>
				</div>
			</div>

			<div className='bg-blue-600 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden'>
				<div className='absolute top-0 right-0 p-6 opacity-20 font-black text-4xl text-white'>
					ENCRYPTED
				</div>
				<div className='relative z-10'>
					<h4 className='text-sm sm:text-base lg:text-lg font-black uppercase tracking-widest text-white'>
						02. Hardware-Level Encryption
					</h4>
					<p className='mt-4 leading-[1.8] text-xs md:text-sm xl:text-base text-white/90'>
						Your personal identifiers are protected with AES-256 bank-grade
						encryption. We treat your data with the same precision we apply to
						our hardware—ensuring zero vulnerabilities and complete integrity.
					</p>
				</div>
			</div>
		</div>
	);
};

export const DeliveryReturn = () => {
	return (
		<div className='text-zinc-300 space-y-12 pb-10'>
			<div>
				<h3 className='font-black text-xl md:text-2xl xl:text-3xl text-white uppercase tracking-tighter mb-4'>
					Logistics & Fulfillment Architecture
				</h3>
				<p className='text-sm md:text-base leading-relaxed max-w-4xl'>
					We utilize a "White Glove" logistics network to ensure that delicate
					hardware—from GPUs to Monitors—reaches your setup without a single
					vibration-induced defect.
				</p>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
				<div className='bg-zinc-900/50 p-8 rounded-[2rem] border border-white/5'>
					<h4 className='font-black text-xs uppercase tracking-[2px] text-blue-500 mb-6'>
						Standard Dispatch
					</h4>
					<p className='text-[10px] font-bold text-zinc-500 uppercase mb-4'>
						Orders Under ₦2,000,000
					</p>
					<ul className='space-y-4 text-sm'>
						<li className='flex justify-between border-b border-white/5 pb-2'>
							<span className='text-zinc-400'>Mainland Delivery</span>
							<span className='font-black text-white'>₦7,000.00</span>
						</li>
						<li className='flex justify-between border-b border-white/5 pb-2'>
							<span className='text-zinc-400'>Express Technical Dispatch</span>
							<span className='font-black text-white'>₦12,000.00</span>
						</li>
					</ul>
				</div>

				<div className='bg-white p-8 rounded-[2rem] text-black shadow-2xl'>
					<h4 className='font-black text-xs uppercase tracking-[2px] text-blue-600 mb-6'>
						Premium Fulfillment
					</h4>
					<p className='text-[10px] font-bold text-zinc-400 uppercase mb-4'>
						Orders Above ₦2,000,000
					</p>
					<ul className='space-y-4 text-sm'>
						<li className='flex justify-between border-b border-zinc-200 pb-2'>
							<span className='font-medium'>Priority Shipping</span>
							<span className='font-black text-blue-600 uppercase'>Free</span>
						</li>
						<li className='flex justify-between border-b border-zinc-200 pb-2'>
							<span className='font-medium'>Installation Assistance</span>
							<span className='font-black text-blue-600 uppercase'>
								Included
							</span>
						</li>
					</ul>
				</div>
			</div>

			<div className='bg-zinc-900 border border-white/5 rounded-3xl p-8'>
				<h4 className='font-black text-sm uppercase tracking-widest text-white mb-4'>
					The "Dead on Arrival" (DOA) Guarantee
				</h4>
				<p className='text-xs md:text-sm text-zinc-400 leading-relaxed mb-6'>
					We provide a{" "}
					<span className='text-white font-bold'>Direct Replacement</span> for
					any hardware found defective upon unboxing. To qualify for a DOA swap,
					an "Unboxing Video" is mandatory to ensure the defect is
					factory-related and not caused during installation.
				</p>
			</div>
		</div>
	);
};

export const RefundPolicy = () => {
	return (
		<div className='text-zinc-400 space-y-6 text-xs sm:text-sm'>
			<p>
				{CompanyName} ensures that every piece of tech we ship meets industrial
				standards. Our refund policy is built to protect the integrity of
				high-value hardware components.
			</p>

			<section className='space-y-2'>
				<h3 className='font-bold text-white uppercase text-xs tracking-widest'>
					1. Eligibility for Returns
				</h3>
				<ul className='list-disc pl-5 space-y-2'>
					<li>
						<strong>Factory Defect:</strong> Confirmed hardware failure within
						the first 48 hours.
					</li>
					<li>
						<strong>Order Mismatch:</strong> Receiving a component with
						different specs than ordered.
					</li>
					<li>
						<strong>Seal Integrity:</strong> Returns are only accepted if the
						manufacturer’s anti-static seal remains intact (unless the item is
						defective).
					</li>
				</ul>
			</section>

			<section className='space-y-2'>
				<h3 className='font-bold text-white uppercase text-xs tracking-widest'>
					2. Non-Refundable Items
				</h3>
				<ul className='list-disc pl-5 space-y-2'>
					<li>
						<strong>Software & Licenses:</strong> Digital keys and activated OS
						licenses.
					</li>
					<li>
						<strong>Installation Damage:</strong> Bent CPU pins or
						short-circuited PCBs caused by improper user installation.
					</li>
					<li>
						<strong>Thermal Paste/Consumables:</strong> Items that have been
						opened and applied.
					</li>
				</ul>
			</section>

			<p className='mt-4 p-4 bg-zinc-900 rounded-xl border border-white/5'>
				<strong>Important Note:</strong> To maintain the quality of our stock,
				all hardware returns undergo a <strong>Technical Diagnostic</strong>{" "}
				before a refund or replacement is authorized.
			</p>
		</div>
	);
};

export const AboutUsContent = () => {
	return (
		<>
			<p className='text-zinc-400 text-sm sm:text-lg lg:text-xl leading-relaxed lg:text-right max-w-2xl'>
				We are more than just a hardware provider; we are the backbone of your
				digital ecosystem. From high-performance internal components to the
				peripherals that define your workflow, we source only the most reliable
				tech to ensure your setup never misses a beat.
			</p>

			<p className='text-zinc-500 text-base mt-6 lg:text-right max-w-xl font-medium'>
				Whether you are building a professional workstation, a competitive
				gaming rig, or a seamless home office, our mission is to provide the
				precision-engineered tools required for the modern digital age.
			</p>
		</>
	);
};

export const performanceFeatures = [
	{
		title: "Speed",
		description:
			"Optimized data transfer rates and ultra-low latency components ensure your system handles demanding workflows without lag.",
		icon: <FiZap className='text-zinc-400 text-2xl' />,
	},
	{
		title: "Security",
		description:
			"Hardware-level encryption and secure firmware protocols protect your digital assets and sensitive data from external threats.",
		icon: <FiShield className='text-zinc-400 text-2xl' />,
	},
	{
		title: "Support",
		description:
			"Access our expert technical team for hardware troubleshooting and optimization tips to keep your gear at peak performance.",
		icon: <FiHeadphones className='text-zinc-400 text-2xl' />,
	},
];
