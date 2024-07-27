import { Container, Filters, Title, TopBar } from '@/components/common'
import { ProductCard } from '@/components/common/product-card'

export default function Home() {
	return (
		<>
			<Container className='mt-10'>
				<Title text='All pizzas' size='lg' className='font-extrabold' />
			</Container>
			<TopBar />

			<Container className='mt-10 pb-14'>
				<div className='flex gap-[60px]'>
					<div className='w-[250px]'>
						<Filters />
					</div>

					<div className='flex-1'>
						<div className='flex flex-col gap-16'>
							<ProductCard
								id={0}
								name={'Cheeseburger-Pizza'}
								price={100}
								imageUrl={''}
							/>
						</div>
					</div>
				</div>
			</Container>
		</>
	)
}
