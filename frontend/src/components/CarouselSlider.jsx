import { Carousel } from 'react-bootstrap';
import { MdOutlineLibraryBooks } from 'react-icons/all';
const CarouselSlider = () => {
	let section_article_1;
	let section_article_2;

	section_article_1 = (
		<Carousel className='desktop'>
			<Carousel.Item interval={9000}>
				<div className='article-container d-flex'>
					<div className='article-element'>
						<div className='article-top'>
							<MdOutlineLibraryBooks className='btn-books' />

							<div className='article-right-side'>
								<h3 className='article-header'>Lorem ipsum dolor.</h3>
								<p className='article-date'>Mar 3, 2022</p>
							</div>
						</div>
						<div className='article-info'>
							<p>
								Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam
								quod quas reprehenderit error sit necessitatibus eaque
								recusandae accusamus ducimus laborum.
							</p>
						</div>
					</div>
					<div className='article-element lower'>
						<div className='article-top'>
							<MdOutlineLibraryBooks className='btn-books' />

							<div className='article-right-side'>
								<h3 className='article-header'>Lorem ipsum dolor.</h3>
								<p className='article-date'>Mar 3, 2022</p>
							</div>
						</div>
						<div className='article-info'>
							<p>
								Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam
								quod quas reprehenderit error sit necessitatibus eaque
								recusandae accusamus ducimus laborum.
							</p>
						</div>
					</div>
				</div>
			</Carousel.Item>
			<Carousel.Item interval={9000}>
				<div className='article-container d-flex'>
					<div className='article-element'>
						<div className='article-top'>
							<MdOutlineLibraryBooks className='btn-books' />

							<div className='article-right-side'>
								<h3 className='article-header'>Lorem ipsum dolor.</h3>
								<p className='article-date'>Mar 3, 2022</p>
							</div>
						</div>
						<div className='article-info'>
							<p>
								Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam
								quod quas reprehenderit error sit necessitatibus eaque
								recusandae accusamus ducimus laborum.
							</p>
						</div>
					</div>
					<div className='article-element lower'>
						<div className='article-top'>
							<MdOutlineLibraryBooks className='btn-books' />

							<div className='article-right-side'>
								<h3 className='article-header'>Lorem ipsum dolor.</h3>
								<p className='article-date'>Mar 3, 2022</p>
							</div>
						</div>
						<div className='article-info'>
							<p>
								Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam
								quod quas reprehenderit error sit necessitatibus eaque
								recusandae accusamus ducimus laborum.
							</p>
						</div>
					</div>
				</div>
			</Carousel.Item>
		</Carousel>
	);

	section_article_2 = (
		<Carousel className='mobile'>
			<Carousel.Item interval={100000}>
				<div className='article-element '>
					<div className='article-top'>
						<MdOutlineLibraryBooks className='btn-books' />

						<div className='article-right-side'>
							<h3 className='article-header'>Lorem ipsum dolor.</h3>
							<p className='article-date'>Mar 3, 2022</p>
						</div>
					</div>
					<div className='article-info'>
						<p>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam
							quod quas reprehenderit error sit necessitatibus eaque recusandae
							accusamus ducimus laborum.
						</p>
					</div>
				</div>
			</Carousel.Item>
			<Carousel.Item interval={100000}>
				<div className='article-element '>
					<div className='article-top'>
						<MdOutlineLibraryBooks className='btn-books' />

						<div className='article-right-side'>
							<h3 className='article-header'>Lorem ipsum dolor.</h3>
							<p className='article-date'>Mar 3, 2022</p>
						</div>
					</div>
					<div className='article-info'>
						<p>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam
							quod quas reprehenderit error sit necessitatibus eaque recusandae
							accusamus ducimus laborum.
						</p>
					</div>
				</div>
			</Carousel.Item>
			<Carousel.Item interval={100000}>
				<div className='article-element '>
					<div className='article-top'>
						<MdOutlineLibraryBooks className='btn-books' />

						<div className='article-right-side'>
							<h3 className='article-header'>Lorem ipsum dolor.</h3>
							<p className='article-date'>Mar 3, 2022</p>
						</div>
					</div>
					<div className='article-info'>
						<p>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam
							quod quas reprehenderit error sit necessitatibus eaque recusandae
							accusamus ducimus laborum.
						</p>
					</div>
				</div>
			</Carousel.Item>
			<Carousel.Item interval={100000}>
				<div className='article-element '>
					<div className='article-top'>
						<MdOutlineLibraryBooks className='btn-books' />

						<div className='article-right-side'>
							<h3 className='article-header'>Lorem ipsum dolor.</h3>
							<p className='article-date'>Mar 3, 2022</p>
						</div>
					</div>
					<div className='article-info'>
						<p>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam
							quod quas reprehenderit error sit necessitatibus eaque recusandae
							accusamus ducimus laborum.
						</p>
					</div>
				</div>
			</Carousel.Item>
		</Carousel>
	);
	return (
		<div className='article-container'>
			{section_article_1}
			{section_article_2}
		</div>
	);
};

export default CarouselSlider;
