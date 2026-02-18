"use client";

import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useCart } from "react-use-cart";
import Link from "next/link";
import Picture from "../picture/Picture";
import { FormatMoney2 } from "../Reusables/FormatMoney";
import { convertToSlug } from "@constants";

interface ProductCard2Props {
	id: string | number;
	image: string;
	oldAmount?: string;
	newAmount: string;
	description: string;
	category?: string; // Added to match the "Keyboard" sublabel in image
	boxShadow?: boolean;
}

const ProductCard2 = ({
	id,
	image,
	oldAmount,
	newAmount,
	description,
	category = "Hardware",
	boxShadow = true,
}: ProductCard2Props) => {
	const { addItem, removeItem, updateItem, getItem } = useCart();

	const ID = id.toString();
	const cartItem = getItem(ID);
	const quantity = cartItem?.quantity || 0;
	const price = parseInt(newAmount);
	const slugDesc = convertToSlug(description);

	const discount = oldAmount
		? Math.round(((parseInt(oldAmount) - price) / parseInt(oldAmount)) * 100)
		: 0;

	const addToCart = () => {
		addItem({ id: ID, name: description, price, quantity: 1, image });
	};

	const increase = () => updateItem(ID, { quantity: quantity + 1 });
	const decrease = () => {
		if (quantity <= 1) removeItem(ID);
		else updateItem(ID, { quantity: quantity - 1 });
	};

	return (
		<div
			className={`group relative flex flex-col w-full rounded-[20px] md:rounded-[30px] bg-white overflow-hidden transition-all duration-300 ${
				boxShadow
					? "hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
					: "border border-zinc-100"
			}`}
		>
			{/* Image Area - Matches the light gray rounded box in image */}
			<Link
				href={`/home-item/product/${slugDesc}-${id}`}
				className='relative aspect-[1.1/1] w-full p-2 md:p-3'
			>
				<div className='w-full h-full bg-[#F2F2F2] rounded-[15px] md:rounded-[25px] overflow-hidden flex items-center justify-center'>
					<Picture
						src={image}
						alt={description}
						className='object-contain w-[85%] h-[85%] transition-transform duration-500 group-hover:scale-105'
					/>
				</div>

				{discount > 0 && (
					<div className='absolute top-5 left-5 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10'>
						-{discount}%
					</div>
				)}
			</Link>

			{/* Content Area */}
			<div className='flex flex-col flex-grow p-3 md:p-5 pt-1'>
				{/* Title & Category (Stacked exactly like image) */}
				<div className='mb-4'>
					<Link
						href={`/home-item/product/${slugDesc}-${id}`}
						className='text-sm md:text-lg font-bold text-zinc-800 line-clamp-1 hover:text-blue-600 transition-colors'
						dangerouslySetInnerHTML={{ __html: description }}
					/>
					<p className='text-[10px] md:text-xs text-zinc-400 font-medium uppercase tracking-wider mt-0.5'>
						{category}
					</p>
				</div>

				{/* Price & Action Row */}
				<div className='mt-auto flex lg:items-center flex-col lg:justify-between gap-2'>
					<div className='flex flex-col'>
						{oldAmount && (
							<span className='text-[10px] line-through text-zinc-300'>
								<FormatMoney2 value={parseInt(oldAmount)} />
							</span>
						)}
						<span className='text-zinc-900 font-bold text-base md:text-2xl tracking-tighter'>
							{price ? <FormatMoney2 value={price} /> : "N/A"}
						</span>
					</div>

					{/* Action Buttons */}
					<div className='flex items-center'>
						{quantity === 0 ? (
							<button
								onClick={(e) => {
									e.preventDefault();
									addToCart();
								}}
								className='bg-[#272B30] text-white text-[10px] md:text-xs font-bold px-3 md:px-5 py-2.5 md:py-3 rounded-lg md:rounded-xl hover:bg-black transition-all active:scale-95'
							>
								Add to cart
							</button>
						) : (
							<div className='flex items-center gap-2 bg-zinc-100 p-1 rounded-lg'>
								<button
									onClick={(e) => {
										e.preventDefault();
										decrease();
									}}
									className='size-6 md:size-8 flex items-center justify-center rounded-md bg-white text-zinc-800 shadow-sm active:scale-90'
								>
									<AiOutlineMinus size={12} />
								</button>
								<span className='text-xs font-bold text-zinc-800 min-w-[12px] text-center'>
									{quantity}
								</span>
								<button
									onClick={(e) => {
										e.preventDefault();
										increase();
									}}
									className='size-6 md:size-8 flex items-center justify-center rounded-md bg-[#272B30] text-white shadow-sm active:scale-90'
								>
									<AiOutlinePlus size={12} />
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductCard2;
