import Navbar from "../components/Navbar";
import "../Styles/Contact.css"

const Contact = () => {
    return ( 
        <div class = "contact-container">
            <Navbar/>
            <div className="contact-form-container">
                <h1>KONTAKT</h1>
                <div className="form">
                    <input type="text" className="firstName" placeholder="Imię..."/>
                    <input type="text" className="mail" placeholder="E-mail..."/>
                    <textarea className="message" placeholder="Wiadomość.."  rows="5"></textarea>
                </div>
                <button>WYŚLIJ</button>
            </div>
            <div className="top">
                <div className="top-text-container">
                    <h1 className = "header">NAWIĄŻ RELACJĘ</h1>
                    <div className="text">
                        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua</p>
                    </div>
                    <div className="infos">

                        <div className="infos-element">
                            <div className="icon">
                                <i class="far fa-envelope"></i>
                            </div>
                            <div className="info">
                                <h1>BIBLIOTEKA@GMAIL.COM</h1>
                            </div>
                        </div>

                        <div className="infos-element">
                            <div className="icon">
                                <i class="fa fa-phone"></i>
                            </div>
                            <div className="info">
                                <h1>+48 522-492-990</h1>
                            </div>
                        </div>

                        <div className="infos-element">
                            <div className="icon">
                                <i class="fas fa-map-marker-alt"></i>
                            </div>
                            <div className="info">
                                <h1>WIEJSKA 45A, BIAŁYSTOK</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bottom">
                <div className="background"></div>
            </div>
        </div>
     );
}
 
export default Contact;