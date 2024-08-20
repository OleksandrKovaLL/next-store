'use client'

import React from 'react'

import { cn } from '@/shared/lib/utils'

import { useRouter } from 'next/navigation'
import { ProductWithRelations } from '@/@types/prisma'
import { ChooseProductForm } from '@/shared/components/common'
import { ChoosePizzaForm } from '@/shared/components/common/choose-pizza-from'
import { Dialog } from '@/shared/components/ui'
import { DialogContent } from '@/shared/components/ui/dialog'

interface Props {
	product: ProductWithRelations
	className?: string
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
	const router = useRouter()
	const isPizzaFrom = Boolean(product.items[0].pizzaType)
	return (
		<Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
			<DialogContent
				className={cn(
					'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
					className
				)}
			>
				{isPizzaFrom ? (
					<ChoosePizzaForm
						imageUrl={product.imageUrl}
						name={product.name}
						ingredients={product.ingredients}
						items={product.items}
					/>
				) : (
					<ChooseProductForm
						imageUrl={product.imageUrl}
						name={product.name}
						ingredients={[]}
					/>
				)}
			</DialogContent>
		</Dialog>
	)
}