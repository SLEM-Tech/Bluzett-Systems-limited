"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChatServiceIconSvg, FileIconSvg, RocketIconSvg } from "../SvgIcons";
import useToken from "../hooks/useToken";
import { signOut } from "@utils/lib";
import { CompanyName, filterCustomersByEmail } from "@constants";
import { useCustomer } from "../lib/woocommerce";
import { LogoImage } from "@utils/function";
import { usePathname } from "next/navigation";
import {
	BiLogoFacebook,
	BiLogoLinkedin,
	BiLogoTiktok,
	BiLogoWhatsapp,
} from "react-icons/bi";

interface footerDataProps {
	title: string;
	links: {
		label: string;
		href: string;
		function?: () => void;
	}[];
}

const Footer = () => {
	const { email } = useToken();
	const currentYear = new Date().getFullYear();
	const pathname = usePathname();
	const { data: customer } = useCustomer("");
	const wc_customer2_info: Woo_Customer_Type[] = customer;
	const wc_customer_info = filterCustomersByEmail(wc_customer2_info, email);
	const firstName = wc_customer_info?.first_name;

	const socialIcons = [
		{ id: 1, icon: <BiLogoTiktok />, link: "#", color: "hover:text-[#ff0050]" },
		{
			id: 2,
			icon: <BiLogoWhatsapp />,
			link: "#",
			color: "hover:text-[#25D366]",
		},
		{
			id: 3,
			icon: <BiLogoFacebook />,
			link: "#",
			color: "hover:text-[#1877F2]",
		},
		{
			id: 4,
			icon: <BiLogoLinkedin />,
			link: "#",
			color: "hover:text-[#0A66C2]",
		},
	];

	const footerData: footerDataProps[] = [
		{
			title: "Account",
			links: [
				{
					label: firstName ? "Dashboard" : "Create Account",
					href: firstName ? "/user/dashboard" : "/user/register",
				},
				{
					label: firstName ? "My Orders" : "Login",
					href: firstName ? "/user/my-orders" : "/user/login",
				},
				{
					label: firstName ? "Log Out" : "Forget Password",
					href: firstName ? "" : "/user/forget-password",
					function: firstName ? signOut : undefined,
				},
			],
		},
		{
			title: "Information",
			links: [
				{ label: "About Us", href: "/about" },
				{ label: "Frequently Asked", href: "/faq" },
				{ label: "Contact Support", href: "/contact-us" },
			],
		},
		{
			title: "Legal",
			links: [
				{ label: "Terms of Use", href: "/terms-of-use?terms-of-use" },
				{ label: "Privacy Policy", href: "/terms-of-use?privacy-policy" },
				{ label: "Shipping Policy", href: "/terms-of-use?delivery-return" },
				{ label: "Returns & Refunds", href: "/terms-of-use?refund-policy" },
			],
		},
	];

	return (
		<footer className='w-full bg-[#050505] border-t border-white/5 pt-10'>
			{/* 2. Main Footer Content */}
			<div className='max-w-[1440px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16'>
				{/* Brand Column */}
				<div className='lg:col-span-4 space-y-6'>
					<LogoImage className='w-10 lg:w-14 brightness-200' />
					<p className='text-zinc-500 text-sm leading-relaxed max-w-xs'>
						Providing complete hardware solutions for professionals, gamers, and
						digital creators. Your performance is our priority.
					</p>
					<div className='flex gap-3'>
						{socialIcons.map((soc) => (
							<motion.a
								key={soc.id}
								href={soc.link}
								whileHover={{ y: -3 }}
								className={`size-10 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-400 text-xl transition-colors ${soc.color}`}
							>
								{soc.icon}
							</motion.a>
						))}
					</div>
				</div>

				{/* Links Columns */}
				<div className='lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8'>
					{footerData.map((section, idx) => (
						<div key={idx} className='space-y-6'>
							<h5 className='text-white text-xs font-black uppercase tracking-[0.2em]'>
								{section.title}
							</h5>
							<ul className='space-y-4'>
								{section.links.map((link, lIdx) => (
									<li key={lIdx}>
										<Link
											href={link.href}
											onClick={link.function}
											className={`text-sm transition-all duration-300 hover:translate-x-1 inline-block ${
												pathname === link.href
													? "text-blue-500 font-bold"
													: "text-zinc-500 hover:text-white"
											}`}
										>
											{link.label}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</div>

			{/* 3. Bottom Bar */}
			<div className='w-full border-t border-white/5 py-8 bg-black/50'>
				<div className='max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-4'>
					<div className='text-zinc-600 text-[10px] uppercase tracking-widest font-bold'>
						&copy; {currentYear} {CompanyName}. All Systems Operational.
					</div>

					{/* Fake Payment Icons for Hardware Trust */}
					<div className='flex items-center gap-4 opacity-30 grayscale hover:grayscale-0 transition-all'>
						<div className='h-4 w-8 bg-zinc-700 rounded-sm' /> {/* Mock Visa */}
						<div className='h-4 w-8 bg-zinc-700 rounded-sm' />{" "}
						{/* Mock Mastercard */}
						<div className='h-4 w-8 bg-zinc-700 rounded-sm' />{" "}
						{/* Mock Verve */}
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
