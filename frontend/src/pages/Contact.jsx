import Navbar from '../components/Navbar';
import '../Styles/Contact.css';

import React from 'react';
import { useForm, ValidationError } from '@formspree/react';

const Contact = () => {
	const [state, handleSubmit] = useForm('xgedrwjz');
	if (state.succeeded) {
		return window.location.reload(true);
	}

	return (
		<div className='contact-container'>
			<Navbar />
			<main>
				<section className='contact wrapper-contact'>
					<div className='contact-left-side'>
						<div className='top-text-container'>
							<h2 className='header'>NAWIĄŻ RELACJĘ</h2>
							<p className='contact-info'>
								Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
								diam nonumy eirmod tempor invidunt ut labore et dolore magna
								aliquyam erat, sed diam voluptua
							</p>

							<div id='infos-desktop' className='infos'>
								<div className='infos-element'>
									<div className='icon'>
										<i class='far fa-envelope'></i>
									</div>
									<p>BIBLIOTEKAONLINE.PROJEKTZ@GMAIL.COM</p>
								</div>

								<div className='infos-element'>
									<div className='icon'>
										<i class='fa fa-phone'></i>
									</div>
									<p>+48 522-492-990</p>
								</div>

								<div className='infos-element'>
									<div className='icon'>
										<i class='fas fa-map-marker-alt'></i>
									</div>
									<p>WIEJSKA 45A, BIAŁYSTOK</p>
								</div>
							</div>
						</div>
					</div>
					<div className='form-container'>
						<h2>KONTAKT</h2>
						<form className='contact-form' onSubmit={handleSubmit}>
							{/* <label htmlFor='name'>Full Name</label> */}
							<input id='name' type='name' name='name' placeholder='Imię...' />

							{/* <label htmlFor='email'>Email Address</label> */}
							<input
								id='email'
								type='email'
								name='email'
								placeholder='Email...'
							/>

							<textarea
								id='message'
								name='message'
								placeholder='Wiadomość...'
							/>
							<button
								className='btn-send'
								type='submit'
								disabled={state.submitting}
							>
								WYŚLIJ
							</button>
						</form>
					</div>
				</section>

				<section id='infos-mobile' className='infos '>
					<div className='infos-element'>
						<div className='icon'>
							<i class='far fa-envelope'></i>
						</div>
						<p>BIBLIOTEKAONLINE.PROJEKTZ@GMAIL.COM</p>
					</div>

					<div className='infos-element'>
						<div className='icon'>
							<i class='fa fa-phone'></i>
						</div>
						<p>+48 793-546-009</p>
					</div>

					<div className='infos-element'>
						<div className='icon'>
							<i class='fas fa-map-marker-alt'></i>
						</div>
						<p>WIEJSKA 45A, BIAŁYSTOK</p>
					</div>
				</section>
			</main>
			<footer className='footer-contact'>
				<div class='container text-center'>
					<small>Copyright &copy; Biblioteka Projekt</small>
				</div>
			</footer>
		</div>
	);
};

export default Contact;
