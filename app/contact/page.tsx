'use client';

import emailjs from 'emailjs-com';
import { useContext, useState } from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import { LanguageContext } from '../contexts/LanguageContext';

const ContactPage = () => {
  const { language } = useContext(LanguageContext);

  const translations = {
    en: {
      title: 'Contact Me',
      subtitle: 'Feel free to contact me for any questions or projects.',
      name: 'Last Name',
      surname: 'First Name',
      email: 'Email',
      phone: 'Phone',
      selectService: 'Select a service',
      webDevelopment: 'Web Development',
      mobileDevelopment: 'Mobile Development',
      softwareDevelopment: 'Software Development',
      uiUxDesign: 'UI/UX Design',
      other: 'Other',
      message: 'Your message',
      send: 'Send',
      phoneLabel: 'Phone',
      emailLabel: 'Email',
      addressLabel: 'Address',
      successMessage: 'Message sent successfully!',
      errorMessage: 'Failed to send the message.',
    },
    fr: {
      title: 'Contactez-moi',
      subtitle: "N'hésitez pas à me contacter pour toute question ou projet.",
      name: 'Nom',
      surname: 'Prénom',
      email: 'Email',
      phone: 'Téléphone',
      selectService: 'Sélectionnez un service',
      webDevelopment: 'Développement Web',
      mobileDevelopment: 'Développement Mobile',
      softwareDevelopment: 'Développement Logiciel',
      uiUxDesign: 'Design UI/UX',
      other: 'Autre',
      message: 'Votre message',
      send: 'Envoyer',
      phoneLabel: 'Téléphone',
      emailLabel: 'Email',
      addressLabel: 'Adresse',
      successMessage: 'Message envoyé avec succès!',
      errorMessage: "Échec de l'envoi du message.",
    },
  };

  const t = translations[language];

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const serviceID = 'service_588fumj';
    const templateID = 'template_tk1wgv7';
    const userID = 'od4fSJW9rW3eOjwy6';

    emailjs.sendForm(serviceID, templateID, '#contact-form', userID).then(
      (response) => {
        console.log('SUCCESS!', response.status, response.text);
        alert('Message envoyé avec succès!');
      },
      (err) => {
        console.log('FAILED...', err);
        alert("Échec de l'envoi du message.");
      }
    );
  };

  return (
    <main className="flex flex-col items-center justify-between p-4 md:p-8 text-gray-200">
      <div className="z-10 w-full max-w-5xl font-mono text-sm flex flex-col lg:flex-row gap-8 space-x-8">
        <div className="lg:w-3/5 space-y-6 bg-gray-800 p-6 rounded-lg shadow-lg bg-opacity-60">
          <h1 className="text-3xl font-bold mb-4 text-blue-800">{t.title}</h1>
          <p className="mb-6">{t.subtitle}</p>

          <form id="contact-form" onSubmit={handleSubmit} className="space-y-4">
            <div className="flex space-x-4">
              <input
                type="text"
                name="name"
                placeholder={t.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-700 rounded bg-gray-700 text-gray-200 placeholder-gray-400"
                required
              />
              <input
                type="text"
                name="surname"
                placeholder={t.surname}
                onChange={handleChange}
                className="w-full p-2 border border-gray-700 rounded bg-gray-700 text-gray-200 placeholder-gray-400"
                required
              />
            </div>
            <div className="flex space-x-4">
              <input
                type="email"
                name="email"
                placeholder={t.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-700 rounded bg-gray-700 text-gray-200 placeholder-gray-400"
                required
              />
              <input
                type="phone"
                name="phone"
                placeholder={t.phone}
                onChange={handleChange}
                className="w-full p-2 border border-gray-700 rounded bg-gray-700 text-gray-200 placeholder-gray-400"
                required
              />
            </div>
            <select
              name="service"
              onChange={handleChange}
              className="w-full p-2 border border-gray-700 rounded bg-gray-700 text-gray-200"
              required
            >
              <option value="" className="text-gray-400">
                {t.selectService}
              </option>
              <option value="Web" className="text-gray-200">
                {t.webDevelopment}
              </option>
              <option value="Mobile" className="text-gray-200">
                {t.mobileDevelopment}
              </option>
              <option value="Software" className="text-gray-200">
                {t.softwareDevelopment}
              </option>
              <option value="Design" className="text-gray-200">
                {t.uiUxDesign}
              </option>
              <option value="Other" className="text-gray-200">
                {t.other}
              </option>
            </select>
            <textarea
              name="message"
              placeholder={t.message}
              onChange={handleChange}
              className="w-full p-2 border border-gray-700 rounded bg-gray-700 text-gray-200 placeholder-gray-400 h-32"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-blue-900 text-white px-4 py-2 hover:bg-blue-800 rounded-full"
            >
              {t.send}
            </button>
          </form>
        </div>

        <div className="lg:w-2/5 space-y-8">
          <div className="flex items-center space-x-4">
            <FaPhone className="text-3xl text-blue-800 rotate-90" />
            <div>
              <h2 className="font-semibold text-gray-400">{t.phoneLabel}</h2>
              <p className="text-lg font-bold text-gray-200">
                +33 6 62 13 55 22
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <FaEnvelope className="text-3xl text-blue-800" />
            <div>
              <h2 className="font-semibold text-gray-400">{t.emailLabel}</h2>
              <p className="text-lg font-bold text-gray-200">
                lucasfabregoule@gmail.com
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <FaMapMarkerAlt className="text-3xl text-blue-800 m-1" size={35} />
            <div>
              <h2 className="font-semibold text-gray-400">{t.addressLabel}</h2>
              <p className="text-lg font-bold text-gray-200">
                39 rue du Mont Pilat, 26600 Granges-les-Beaumont, France
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
