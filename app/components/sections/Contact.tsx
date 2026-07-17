'use client';

import emailjs from 'emailjs-com';
import { useContext, useState } from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import { content } from '../../data/content';
import { LanguageContext } from '../../contexts/LanguageContext';
import Reveal from '../Reveal';

const inputClass =
  'w-full rounded-xl border border-white/10 bg-white/[0.04] p-3 text-sm text-gray-200 placeholder-gray-500 outline-none transition-all focus:border-cyan-400/60 focus:shadow-[0_0_15px_rgba(34,211,238,0.15)]';

export default function Contact() {
  const { language } = useContext(LanguageContext);
  const t = content[language].contact;
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>(
    'idle'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    const serviceID = 'service_588fumj';
    const templateID = 'template_tk1wgv7';
    const userID = 'od4fSJW9rW3eOjwy6';

    emailjs.sendForm(serviceID, templateID, '#contact-form', userID).then(
      () => setStatus('sent'),
      () => setStatus('error')
    );
  };

  const infos = [
    { icon: FaPhone, label: t.phoneLabel, value: '+33 6 62 13 55 22' },
    { icon: FaEnvelope, label: t.emailLabel, value: 'lucasfabregoule@gmail.com' },
    { icon: FaMapMarkerAlt, label: t.addressLabel, value: t.address },
  ];

  return (
    <section id="contact" className="relative px-4 py-24 md:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <Reveal>
          <h2 className="section-title">
            <span className="text-gradient">{t.title}</span>
          </h2>
          <p className="mt-3 text-sm text-gray-400 md:text-base">
            {t.subtitle}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-5">
          <Reveal direction="left" className="lg:col-span-3">
            <form
              id="contact-form"
              onSubmit={handleSubmit}
              className="glass space-y-4 rounded-2xl p-6 md:p-8"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  name="name"
                  placeholder={t.name}
                  className={inputClass}
                  required
                />
                <input
                  type="text"
                  name="surname"
                  placeholder={t.surname}
                  className={inputClass}
                  required
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="email"
                  name="email"
                  placeholder={t.email}
                  className={inputClass}
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder={t.phone}
                  className={inputClass}
                />
              </div>
              <select name="service" className={inputClass} required>
                <option value="" className="bg-[#0a0514]">
                  {t.selectService}
                </option>
                {t.services.map((s) => (
                  <option key={s} value={s} className="bg-[#0a0514]">
                    {s}
                  </option>
                ))}
              </select>
              <textarea
                name="message"
                placeholder={t.message}
                className={`${inputClass} h-36 resize-none`}
                required
              />
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 px-6 py-3 font-semibold text-white shadow-[0_0_25px_rgba(34,211,238,0.25)] transition-transform hover:scale-[1.01] disabled:opacity-60 sm:w-auto"
              >
                {status === 'sending' ? t.sending : t.send}
              </button>
              {status === 'sent' && (
                <p className="text-sm text-emerald-400">{t.successMessage}</p>
              )}
              {status === 'error' && (
                <p className="text-sm text-red-400">{t.errorMessage}</p>
              )}
            </form>
          </Reveal>

          <Reveal direction="right" delay={0.15} className="lg:col-span-2">
            <div className="flex h-full flex-col justify-center gap-6">
              {infos.map((info) => (
                <div
                  key={info.label}
                  className="glass glass-hover flex items-center gap-4 rounded-2xl p-5"
                >
                  <span className="rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-600/20 p-3 text-cyan-400">
                    <info.icon size={20} />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-500">
                      {info.label}
                    </p>
                    <p className="text-sm font-semibold text-gray-200 md:text-base">
                      {info.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
