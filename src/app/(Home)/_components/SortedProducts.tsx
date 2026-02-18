"use client";
import { convertToSlug } from "@constants";
import ProductCard2 from "@src/components/Cards/ProductCard2";
import { updateCategorySlugId } from "@src/components/config/features/subCategoryId";
import { useCategories, WooCommerce } from "@src/components/lib/woocommerce";
import GlobalLoader from "@src/components/modal/GlobalLoader";
import React, { useEffect, useState, useTransition } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

// Matches the Skeleton Loaders to the new card shape
export const Loader = () => (
	<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 w-full'>
		{[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
			<div
				key={i}
				className='w-full aspect-[4/5] bg-zinc-100 animate-pulse rounded-[20px]'
			/>
		))}
	</div>
);

const SortedProducts = () => {
	const [activeTab, setActiveTab] = useState<number | "all">("all");
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [categoryProductsMap, setCategoryProductsMap] = useState<{
		[key: string]: any[];
	}>({});

	const dispatch = useDispatch();
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const { data: categories, isLoading: categoryWpIsLoading } =
		useCategories("");

	useEffect(() => {
		const fetchCategoryProducts = async () => {
			if (!categories) return;
			try {
				setIsLoading(true);
				const filteredCategories = categories
					?.filter((category: any) => category?.count > 0)
					?.slice(0, 8); // Expanded to 8 to fill the grid better

				if (filteredCategories) {
					const productsPromises = filteredCategories.map(
						async (category: any) => {
							const response = await WooCommerce.get(
								`products?category=${category?.id}&per_page=8`,
							);
							return { [category?.id]: response?.data };
						},
					);

					const productsResults = await Promise.all(productsPromises);
					const productsMap = productsResults.reduce(
						(acc, result) => ({ ...acc, ...result }),
						{},
					);
					setCategoryProductsMap(productsMap);
				}
			} catch (error) {
				console.error("Error fetching products:", error);
			} finally {
				setIsLoading(false);
			}
		};

		if (categories?.length) fetchCategoryProducts();
	}, [categories]);

	const handleCategoryClick = (name: string, id: number) => {
		const categorySlugId = `${convertToSlug(name)}-${id}`;
		dispatch(updateCategorySlugId({ categorySlugId }));
		startTransition(() => {
			router.push(`/category/${categorySlugId}`);
		});
	};

	// Logic to determine which products to show based on active tab
	const getDisplayProducts = () => {
		if (activeTab === "all") {
			// Flatten all products from the map into one array
			return Object.values(categoryProductsMap).flat().slice(0, 8);
		}
		return categoryProductsMap[activeTab] || [];
	};

	return (
		<section className='w-full py-16 px-4 lg:px-10 bg-white'>
			<div className='max-w-[1540px] mx-auto'>
				{/* --- Header Section (Matched to Image) --- */}
				<div className='text-center mb-12'>
					<h2 className='text-4xl md:text-5xl font-bold text-zinc-800 mb-4'>
						New Arrivals
					</h2>
					<p className='text-zinc-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed'>
						Discover our latest high-performance hardware and accessories.
						Engineered for professionals and gamers who demand consistent
						reliability.
					</p>
				</div>

				{/* --- Filter Pills (Matched to Image) --- */}
				<div className='flex items-center justify-center gap-2 md:gap-4 mb-12 overflow-x-auto no-scrollbar pb-2'>
					<button
						onClick={() => setActiveTab("all")}
						className={`px-6 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
							activeTab === "all"
								? "bg-black text-white shadow-xl"
								: "bg-zinc-50 text-zinc-400 hover:bg-zinc-100"
						}`}
					>
						All Products
					</button>
					{categories
						?.filter((c: any) => c.count > 0)
						.slice(0, 5)
						.map((cat: any) => (
							<button
								key={cat.id}
								onClick={() => setActiveTab(cat.id)}
								className={`px-6 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
									activeTab === cat.id
										? "bg-black text-white shadow-xl"
										: "bg-zinc-50 text-zinc-400 hover:bg-zinc-100"
								}`}
							>
								{cat.name}
							</button>
						))}
				</div>

				{/* --- Product Grid --- */}
				<div className='min-h-[400px]'>
					{isLoading ? (
						<Loader />
					) : (
						<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8'>
							{getDisplayProducts().map((product: any) => (
								<div key={product.id} className='animate-fade-in'>
									<ProductCard2
										id={product?.id}
										image={product?.images[0]?.src}
										oldAmount={product?.regular_price}
										newAmount={product?.price}
										description={product?.name}
										category={
											categories?.find(
												(c: any) => c.id === product.categories[0]?.id,
											)?.name
										}
									/>
								</div>
							))}
						</div>
					)}
				</div>

				{/* --- View More Footer --- */}
				<div className='mt-16 text-center'>
					<button
						onClick={() => {
							startTransition(() => {
								router.push("category");
							});
						}}
						className='px-10 py-4 bg-black text-white rounded-lg text-sm font-bold hover:bg-zinc-800 transition-all active:scale-95 shadow-lg'
					>
						View More
					</button>
				</div>
			</div>
			<GlobalLoader isPending={categoryWpIsLoading || isPending} />
		</section>
	);
};

export default SortedProducts;
