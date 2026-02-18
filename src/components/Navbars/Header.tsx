"use client";
import React, { useMemo, useState, useTransition, Fragment } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "react-use-cart";
import { useAppDispatch, useAppSelector } from "../hooks";
import Drawer from "rc-drawer";
import { useCustomer } from "../lib/woocommerce";
import { currencyOptions, filterCustomersByEmail } from "@constants";
import { getFirstCharacter, signOut } from "@utils/lib";
import { LogoImage } from "@utils/function";
import Picture from "../picture/Picture";
import { APICall } from "@utils";
import { fetchExchangeRate } from "@utils/endpoints";
import { setBaseCurrency, setExchangeRate } from "../Redux/Currency";
import FormToast from "../Reusables/Toast/SigninToast";
import useToken from "../hooks/useToken";

// Headless UI Components
import { Menu, Transition } from "@headlessui/react";
import {
	FiSearch,
	FiShoppingBag,
	FiLogOut,
	FiMenu,
	FiShoppingCart,
} from "react-icons/fi";
import { SlArrowDown } from "react-icons/sl";
import Flag from "react-world-flags";
import GlobalLoader from "../modal/GlobalLoader";
import MobileNav from "./MobileNav";
import ProductTable from "../Tables/ProductTable";
import CategoryPageBottomHeader from "./CategoryPageBottomHeader";
import ProductPageBottomHeader from "./ProductPageBottomHeader";
import HomePageBottomHeader from "./HomePageBottomHeader";
import { FaCartArrowDown } from "react-icons/fa";
import { BiUser } from "react-icons/bi";
import { ImSpinner2 } from "react-icons/im";

const Header = () => {
	const pathname = usePathname();
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { email } = useToken();
	const { totalItems } = useCart();

	const { baseCurrency } = useAppSelector((state) => state.currency);
	const [isPending, startTransition] = useTransition();

	const [isCartOpen, setIsCartOpen] = useState(false);
	const [drawerVisible, setDrawerVisible] = useState(false);
	const [searchValue, setSearchValue] = useState("");

	const { data: customer } = useCustomer("");
	const wc_customer_info = useMemo(
		() => filterCustomersByEmail(customer as Woo_Customer_Type[], email),
		[customer, email],
	);

	const onOpenCart = () => setIsCartOpen(true);
	const onCloseCart = () => setIsCartOpen(false);

	const handleCurrencyChange = async (code: string) => {
		const selectedObj = currencyOptions.find((c) => c.code === code);
		if (!selectedObj) return;

		try {
			const data = await APICall(fetchExchangeRate, ["NGN", code], true, true);
			if (data) {
				dispatch(setExchangeRate(data));
				dispatch(setBaseCurrency(selectedObj));
				FormToast({ message: `Switched to ${code}`, success: true });
			}
		} catch (error) {
			FormToast({ message: "Currency switch failed", success: false });
		}
	};

	const handleSearch = () => {
		if (!searchValue) return;
		startTransition(() => {
			router.push(`/search?${searchValue}`);
		});
	};

	const userDropDownLinks = [
		{ id: 1, href: "/user/dashboard", icon: <BiUser />, label: "My Account" },
		{
			id: 2,
			href: "/user/my-orders",
			icon: <FaCartArrowDown />,
			label: "Orders",
		},
		{ id: 3, onClick: onOpenCart, icon: <FiShoppingCart />, label: "Cart" },
	];

	return (
		<>
			<header className='flex flex-col w-full bg-black/80 backdrop-blur-xl z-[100] fixed top-0 border-b border-white/10 transition-all duration-300'>
				{/* Main Desktop Header */}
				<div className='hidden slg:grid grid-cols-12 items-center w-full py-4 max-w-[1540px] px-10 mx-auto gap-4'>
					{/* 1. Logo Section */}
					<div className='col-span-2 flex items-center'>
						<LogoImage className='!w-[42px] cursor-pointer brightness-200 hover:scale-105 transition-transform' />
					</div>

					{/* 2. Search Bar (Premium Look) */}
					<div className='col-span-7 flex justify-center'>
						<div className='relative w-full max-w-[650px] group'>
							<div className='absolute inset-y-0 left-4 flex items-center pointer-events-none'>
								<FiSearch className='text-zinc-500 group-focus-within:text-blue-500 transition-colors' />
							</div>
							<input
								type='text'
								placeholder='Search high-performance hardware...'
								className='w-full h-12 text-sm text-zinc-200 rounded-xl pl-12 pr-12 border border-white/5 outline-none focus:border-blue-500/40 focus:ring-4 focus:ring-blue-500/5 transition-all bg-zinc-900/50'
								value={searchValue}
								onChange={(e) => setSearchValue(e.target.value)}
								onKeyDown={(e) => e.key === "Enter" && handleSearch()}
							/>
							{isPending && (
								<div className='absolute inset-y-0 right-4 flex items-center'>
									<ImSpinner2 className='text-blue-500 animate-spin' />
								</div>
							)}
						</div>
					</div>

					{/* 3. Controls (Currency, Cart, User) */}
					<div className='col-span-3 flex items-center justify-end gap-5'>
						{/* Currency Toggle */}
						<Menu as='div' className='relative'>
							<Menu.Button className='flex items-center gap-2 bg-zinc-900/80 border border-white/5 px-4 py-2.5 rounded-xl hover:bg-zinc-800 transition group outline-none'>
								{/* @ts-ignore */}
								<Flag
									code={baseCurrency?.countryCode || "NG"}
									className='w-4 rounded-sm object-cover'
								/>
								<span className='text-xs font-bold tracking-widest text-zinc-300 uppercase'>
									{baseCurrency.code}
								</span>
								<SlArrowDown className='text-[9px] text-zinc-500 group-hover:text-zinc-300 transition-transform duration-300' />
							</Menu.Button>
							<Transition
								as={Fragment}
								enter='transition duration-200 ease-out'
								enterFrom='opacity-0 translate-y-1'
								enterTo='opacity-100 translate-y-0'
							>
								<Menu.Items className='absolute right-0 mt-3 w-44 bg-zinc-950 border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-1.5 z-[110] outline-none'>
									{currencyOptions.map((c) => (
										<Menu.Item key={c.code}>
											{({ active }) => (
												<button
													onClick={() => handleCurrencyChange(c.code)}
													className={`${active ? "bg-blue-600 text-white" : "text-zinc-400"} flex w-full items-center gap-3 rounded-xl px-3 py-3 text-xs font-semibold transition-all`}
												>
													{/* @ts-ignore */}
													<Flag
														code={c.countryCode}
														className='w-5 rounded-sm'
													/>
													{c.code}{" "}
													<span className='opacity-60'>({c.symbol})</span>
												</button>
											)}
										</Menu.Item>
									))}
								</Menu.Items>
							</Transition>
						</Menu>

						{/* Premium Cart Button */}
						<div
							className='relative p-3 rounded-xl bg-zinc-900/50 border border-white/5 cursor-pointer hover:bg-blue-600/10 hover:border-blue-500/30 transition-all group'
							onClick={onOpenCart}
						>
							<FiShoppingBag className='text-xl text-zinc-300 group-hover:text-blue-400 transition-colors' />
							{totalItems > 0 && (
								<span className='absolute -top-1 -right-1 size-5 bg-blue-600 text-white text-[10px] font-black flex items-center justify-center rounded-lg shadow-lg shadow-blue-900/20'>
									{totalItems}
								</span>
							)}
						</div>

						{/* User Profile */}
						<Menu as='div' className='relative'>
							<Menu.Button className='flex items-center gap-2 outline-none group'>
								<div className='p-0.5 rounded-full border-2 border-transparent group-hover:border-blue-500/50 transition-all'>
									{wc_customer_info?.shipping?.address_2 ? (
										<Picture
											src={wc_customer_info.shipping.address_2}
											alt='user'
											className='size-10 rounded-full object-cover'
										/>
									) : (
										<div className='size-10 rounded-full bg-gradient-to-tr from-blue-700 to-blue-500 text-white flex items-center justify-center font-bold text-sm shadow-inner'>
											{getFirstCharacter(wc_customer_info?.first_name || "U")}
										</div>
									)}
								</div>
							</Menu.Button>
							<Transition
								as={Fragment}
								enter='transition duration-200 ease-out'
								enterFrom='opacity-0 translate-y-1'
								enterTo='opacity-100 translate-y-0'
							>
								<Menu.Items className='absolute right-0 mt-3 w-60 bg-zinc-950 border border-white/10 rounded-2xl shadow-2xl p-2 z-[110] outline-none'>
									<div className='px-4 py-3 mb-2 bg-white/5 rounded-xl border border-white/5'>
										<p className='text-[10px] uppercase tracking-tighter text-zinc-500 font-bold'>
											Account Holder
										</p>
										<p className='text-sm font-bold text-white truncate'>
											{wc_customer_info?.first_name || "Guest User"}
										</p>
									</div>
									<div className='space-y-1'>
										{userDropDownLinks.map((item) => (
											<Menu.Item key={item.id}>
												{({ active }) => (
													<button
														onClick={(e) => {
															if (item.onClick) {
																e.preventDefault();
																item.onClick();
															} else if (item.href) {
																router.push(item.href);
															}
														}}
														className={`${active ? "bg-blue-600 text-white translate-x-1" : "text-zinc-400"} flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all`}
													>
														<span className='text-lg opacity-70'>
															{item.icon}
														</span>
														{item.label}
													</button>
												)}
											</Menu.Item>
										))}
									</div>
									<Menu.Item>
										{({ active }) => (
											<button
												onClick={() => signOut()}
												className={`${active ? "bg-red-500 text-white" : "text-red-500"} flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold transition-all mt-2 border border-red-500/10`}
											>
												<FiLogOut /> Log Out
											</button>
										)}
									</Menu.Item>
								</Menu.Items>
							</Transition>
						</Menu>
					</div>
				</div>

				{/* Mobile Header (Re-styled for Tech look) */}
				<div className='slg:hidden flex flex-col w-full p-5 gap-4 bg-black border-b border-white/5'>
					<div className='flex items-center justify-between'>
						<div className='flex items-center gap-5'>
							<button
								onClick={() => setDrawerVisible(true)}
								className='p-2 rounded-lg bg-zinc-900 border border-white/5'
							>
								<FiMenu className='text-2xl text-white' />
							</button>
							<LogoImage className='!w-[32px] brightness-200' />
						</div>
						<div
							onClick={onOpenCart}
							className='relative p-2.5 rounded-lg bg-blue-600 shadow-lg shadow-blue-600/20'
						>
							<FiShoppingBag className='text-xl text-white' />
							{totalItems > 0 && (
								<span className='absolute -top-1 -right-1 size-5 bg-black border-2 border-blue-600 rounded-full text-[9px] flex items-center justify-center text-white font-bold'>
									{totalItems}
								</span>
							)}
						</div>
					</div>
					<div className='relative'>
						<input
							type='text'
							placeholder='Search hardware...'
							className='w-full h-12 text-sm bg-zinc-900 text-white rounded-xl px-5 border border-white/5 outline-none focus:ring-1 focus:ring-blue-500'
							value={searchValue}
							onChange={(e) => setSearchValue(e.target.value)}
							onKeyDown={(e) => e.key === "Enter" && handleSearch()}
						/>
						{isPending ? (
							<ImSpinner2 className='absolute right-4 top-1/2 -translate-y-1/2 text-blue-500 animate-spin' />
						) : (
							<FiSearch className='absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500' />
						)}
					</div>
				</div>

				{/* Conditional Bottom Headers (Maintained Logic) */}
				<div className='bg-black/40'>
					{pathname.includes("/category") ? (
						<CategoryPageBottomHeader />
					) : pathname.includes("/home-item") ? (
						<ProductPageBottomHeader />
					) : (
						<HomePageBottomHeader />
					)}
				</div>
			</header>

			{/* Maintenance of Drawer and Navigation Overlays */}
			<Drawer
				open={isCartOpen}
				onClose={onCloseCart}
				placement='right'
				width={
					typeof window !== "undefined" && window.innerWidth > 768
						? 500
						: "100%"
				}
				className='bg-zinc-950 shadow-2xl'
			>
				<ProductTable onClose={onCloseCart} />
			</Drawer>

			<GlobalLoader isPending={isPending} />
			<MobileNav
				closeDrawer={() => setDrawerVisible(false)}
				drawerVisible={drawerVisible}
			/>
		</>
	);
};

export default Header;
