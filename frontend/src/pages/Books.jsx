import BooksCategoriesBox from '../components/BooksCategoriesBox';
import Navbar from '../components/Navbar';

const Books = () => {
	return (
		<div className='books-container'>
			<Navbar />
			{/* <div className="books-header"></div> */}
			<BooksCategoriesBox />
		</div>
	);
};

export default Books;
