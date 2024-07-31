'use client'

import React, { useState } from 'react'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useClickAway, useDebounce } from 'react-use'
import { Api } from '@/services/api-client'
import { Product } from '@prisma/client'
import Link from 'next/link'

interface Props {
	className?: string
}

export const SearchInput: React.FC<Props> = ({ className }) => {
	const [searchQuery, setSearchQuery] = useState('')
	const [focused, setFocused] = useState(false)
	const [products, setProducts] = useState<Product[]>([])
	const ref = React.useRef(null)

	useClickAway(ref, () => {
		setFocused(false)
	})

	useDebounce(
		() => {
			Api.products.search(searchQuery).then(items => {
				console.log(typeof items)
				setProducts(items)
			})
		},
		250,
		[searchQuery]
	)

	const onClickItem = (product: Product) => {
		setFocused(false)
		setSearchQuery('')
		setProducts([])
	}

	return (
		<>
			{focused && (
				<div className='fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30' />
			)}
			<div
				ref={ref}
				className={cn(
					'flex rounded-2xl flex-1 justify-between relative h-11 z-30',
					className
				)}
			>
				<Search className='absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400' />
				<input
					className='rounded-2xl outline-none w-full bg-gray-100 pl-11'
					type='text'
					placeholder='Search pizza...'
					onFocus={() => setFocused(true)}
					value={searchQuery}
					onChange={e => setSearchQuery(e.target.value)}
				/>

				{products.length > 0 && (
					<div
						className={cn(
							'absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30',
							focused && 'visible opacity-100 top-12'
						)}
					>
						{products.map(product => (
							<Link
								key={product.id}
								className='flex items-center gap-3 px-3 py-2 hover:bg-primary/10'
								href={`/product/${product.id}`}
								onClick={onClickItem}
							>
								<img
									src={product.imageUrl}
									className='rounded-sm h-8 w-8'
									alt={product.name}
								/>
								<span>{product.name}</span>
							</Link>
						))}
					</div>
				)}
			</div>
		</>
	)
}