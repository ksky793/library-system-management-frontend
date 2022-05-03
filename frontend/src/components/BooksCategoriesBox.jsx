import { useHistory } from 'react-router-dom';

const BooksCategoriesBox = () => {
	let history = useHistory();

	function redirectToCategory(destination) {
		history.push('/książki/kategoria/' + destination);
	}

	return (
		<section className=' wrapper books-section'>
			<div className='text-section'>
				<h1>Kategorie Książek</h1>
				<h2>Wybieraj według własnego upodobania</h2>
			</div>

			<div className='wrapper categories-row'>
				<div
					className='categories-element'
					onClick={() => redirectToCategory('horror')}
				>
					<div className='img'></div>

					<h1 className='categories-name'>Horror</h1>
				</div>
				<div
					className='categories-element'
					onClick={() => redirectToCategory('fantastyka')}
				>
					<div className='img'></div>

					<h1 className='categories-name'>Fantastyka</h1>
				</div>
				<div
					className='categories-element'
					onClick={() => redirectToCategory('romans')}
				>
					<div className='img'></div>

					<h1 className='categories-name'>Romans</h1>
				</div>
				<div
					className='categories-element'
					onClick={() => redirectToCategory('przygoda')}
				>
					<div className='img'></div>

					<h1 className='categories-name'>Przygoda</h1>
				</div>
			</div>
		</section>
	);
};

export default BooksCategoriesBox;