import '../Styles/About.css';

import { FaBars, IoIosArrowForward } from 'react-icons/all';
import { Link } from 'react-router-dom';
import CarouselSlider from '../components/CarouselSlider';
import Navbar from '../components/Navbar';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
const About = () => {
	useEffect(() => {
		AOS.init({
			duration: 1000,
		});
	}, []);
	return (
		<div className='about-container'>
			<Navbar />
			<main>
				<section className='wrapper about-section'>
					<div className='left-side'>
						<h2 className='about-header'>O Bibliotece</h2>
						<p className='about-info'>
							Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos eum
							veritatis praesentium maxime, quisquam doloremque consequatur
							debitis, architecto voluptatibus ab perspiciatis tenetur, est
							laboriosam excepturi eaque deserunt nemo cupiditate. Porro!
						</p>
						<button className='btn-more'>
							<h4>Więcej</h4>
							<IoIosArrowForward className='btn-right-arrow-angle'></IoIosArrowForward>
						</button>
					</div>
					<div className='right-side'></div>
				</section>

				<section id='newest-articles' className='newest-articles-section'>
					<h2 className='newest-articles-header'>Najnowsze Artykuły</h2>
					<CarouselSlider />
				</section>

				<div className='events-news'>
					<section data-aos='fade-right' className='wrapper events-section'>
						<h2 className='events-header'>Wydarzenia</h2>
						<div className='events'>
							<div className='event-element'>
								<h3>Mar 23, 2022</h3>
								<p>Lorem, ipsum dolor sit amet.</p>
							</div>
							<div className='event-element'>
								<h3>Mar 23, 2022</h3>
								<p>Lorem, ipsum dolor sit amet.</p>
							</div>
							<div className='event-element'>
								<h3>Mar 23, 2022</h3>
								<p>Lorem, ipsum dolor sit amet.</p>
							</div>
							<div className='event-element'>
								<h3>Mar 23, 2022</h3>
								<p>Lorem, ipsum dolor sit amet.</p>
							</div>
						</div>
						<button className='btn-more'>
							<h4>Zobacz Więcej</h4>
							<IoIosArrowForward className='btn-right-arrow-angle'></IoIosArrowForward>
						</button>
					</section>

					<section data-aos='fade-left' className='wrapper news-section'>
						<h2 className='events-header'>Aktualności</h2>
						<div className='events'>
							<div className='event-element'>
								<h3>Mar 23, 2022</h3>
								<p>Lorem, ipsum dolor sit amet.</p>
							</div>
							<div className='event-element'>
								<h3>Mar 23, 2022</h3>
								<p>Lorem, ipsum dolor sit amet.</p>
							</div>
							<div className='event-element'>
								<h3>Mar 23, 2022</h3>
								<p>Lorem, ipsum dolor sit amet.</p>
							</div>
							<div className='event-element'>
								<h3>Mar 23, 2022</h3>
								<p>Lorem, ipsum dolor sit amet.</p>
							</div>
						</div>
						<button className='btn-more'>
							<h4>Zobacz Więcej</h4>
							<IoIosArrowForward className='btn-right-arrow-angle'></IoIosArrowForward>
						</button>
					</section>
				</div>
			</main>
			<footer>
				<div className='footer-left-side'>
					<h5>2022 Projekt Biblioteka</h5>
				</div>
				<div className='footer-right-side'>
					<h5>Privacy Policy</h5>
					<h5>Terms Of Use</h5>
					<h5>Contact Us</h5>
				</div>
			</footer>
		</div>
	);
};

export default About;
