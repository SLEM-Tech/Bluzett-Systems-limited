"use client";
import React, { useEffect, useRef, useState } from "react";

import Picture from "../picture/Picture";
import { useCategories, WooCommerce } from "../lib/woocommerce";
import ProductCard from "../Cards/ProductCard";
import HomeCard from "../Cards/HomeCard";
import Carousel from "../Reusables/Carousel";
import Link from "next/link";
import { convertToSlug, convertToSlug2 } from "@constants";
import { useEncryptionHelper } from "../EncryptedData";
import { useDispatch } from "react-redux";
import { updateCategorySlugId } from "../config/features/subCategoryId";
import { useRouter } from "next/navigation";
import { heroBg, heroImage, heroImage2, heroImage3 } from "@public/images";
import { Rubik } from "next/font/google";
import HeroCarousel from "../Cards/HeroCarousel";
import AboutUs from "./AboutUs";
import WhyChooseUs from "./WhyChooseUs";

const rubik = Rubik({
	subsets: ["latin-ext"],
	weight: ["300", "400", "500", "600", "700", "800", "900"],
	display: "swap", // Professional standard for performance
});

const AllCategorySection = () => {
	const sliderRef = useRef<HTMLDivElement>(null);
	const [maxScrollTotal, setMaxScrollTotal] = useState(0);
	const [scrollLeftTotal, setScrollLeftTotal] = useState(0);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const dispatch = useDispatch();
	const router = useRouter();

	// State to hold products by category
	const [categoryProductsMap, setCategoryProductsMap] = useState<{
		[key: string]: ProductType[];
	}>({});
	// WooCommerce API Category
	const {
		data: categories,
		isLoading: categoryWpIsLoading,
		isError: categoryIsError,
	} = useCategories("");

	const Categories: CategoryType[] = categories;
	const TotalCatgory = Categories?.length - 1;

	useEffect(() => {
		const fetchCategoryProducts = async () => {
			try {
				setIsLoading(true);

				const filteredCategories = categories
					?.filter((category: CategoryType) => category?.count > 0)
					?.slice(0, 5);

				if (filteredCategories) {
					const productsPromises = filteredCategories.map(
						async (category: CategoryType) => {
							const response = await WooCommerce.get(
								`products?category=${category?.id}`,
							);

							// Check if there is at least one product in the category
							const firstProductImage =
								response?.data.length > 0
									? response?.data[0]?.images[0]?.src
									: null;

							return {
								categoryId: category?.id,
								firstProductImage: firstProductImage, // Store the first product's image
							};
						},
					);

					const productsResults = await Promise.all(productsPromises);

					// Update the state with the first product images mapped by category
					const productsMap = productsResults.reduce(
						(acc: any, result: any) => ({
							...acc,
							[result.categoryId]: result.firstProductImage,
						}),
						{},
					);

					setCategoryProductsMap(productsMap);
				}
			} catch (error) {
				console.error("Error fetching category products:", error);
			} finally {
				setIsLoading(false);
			}
		};

		if (categories?.length) {
			fetchCategoryProducts();
		}
	}, [categories]);

	const handleNext = () => {
		if (sliderRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
			const maxScroll = scrollWidth - clientWidth;
			setScrollLeftTotal(scrollLeft);
			setMaxScrollTotal(maxScroll);

			sliderRef.current.scrollLeft += 600; // Adjust the scroll distance as needed
			setCurrentIndex((prevIndex) =>
				prevIndex < TotalCatgory - 1 ? prevIndex + 1 : prevIndex,
			);
		}
	};

	const handlePrev = () => {
		if (sliderRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
			const maxScroll = scrollWidth - clientWidth;
			setScrollLeftTotal(scrollLeft);
			setMaxScrollTotal(maxScroll);
			// console.log(scrollLeft);
			if (scrollLeft > 0) {
				sliderRef.current.scrollLeft -= 600; // Adjust the scroll distance as needed
				setCurrentIndex((prevIndex) =>
					prevIndex > 0 ? prevIndex - 1 : prevIndex,
				);
			}
		}
	};

	return (
		<>
			{/* Hero Concept inspired by the image */}
			<div className='relative w-full h-[80vh] lg:h-screen grid place-items-center overflow-hidden'>
				{/* The Background Image */}
				<Picture
					src={heroBg}
					alt='Gaming Setup'
					className='w-full h-full lg:size-[80%] object-cover rounded-2xl scale-105'
				/>

				{/* Dark Gradient Overlay for Readability */}
				<div className='absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent' />

				{/* Content Overlay */}
				<div className='absolute inset-0 flex flex-col justify-center mx-auto px-8 lg:px-20 max-w-5xl space-y-6'>
					<h1
						className={`text-3xl lg:text-6xl font-black mx-auto text-white text-center max-w-2xl  ${rubik.className}`}
					>
						Complete Hardware Solutions for Every Digital Need
					</h1>
				</div>
			</div>
			<AboutUs />
			{/* Category Section Styling Idea */}
			<div className='grid grid-cols-2 lg:grid-cols-5 mx-auto max-w-[1256px] mt-4 gap-6 px-2 lg:px-0'>
				{Categories?.slice(0, 5).map((cat) => {
					const productImage: any = categoryProductsMap[cat?.id];
					return (
						<Link
							key={cat.id}
							href={`/category/${convertToSlug(cat.name)}-${cat.id}`}
							className='group relative h-48 bg-[#111] rounded-2xl overflow-hidden transition-all'
						>
							{/* Category Image */}
							<Picture
								src={cat.image?.src ?? productImage}
								alt={cat.image?.name}
								className='w-full h-full aspect-video opacity-60 group-hover:scale-110 transition-transform duration-700'
							/>

							{/* Text Label */}
							<div className='absolute bottom-4 left-4'>
								<h3 className='text-lg font-bold text-white uppercase'>
									{cat.name}
								</h3>
							</div>
						</Link>
					);
				})}
			</div>
			<div className='mt-8'>
				<WhyChooseUs />
			</div>
			{/* </Carousel> */}
		</>
	);
};

export default AllCategorySection;
