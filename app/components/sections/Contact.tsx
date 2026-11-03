'use client';

import emailjs from 'emailjs-com';
import { useContext, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { content } from '../../data/content';
import { LanguageContext } from '../../contexts/LanguageContext';
import Build from '../build/Build';
import SectionHeader from './SectionHeader';

const inputClass =
  'w-full border-b border-white/15 bg-transparent py-3 text-base text-white placeholder-white/30 outline-none transition-colors focus:border-accent';

export default function Contact() {
  const { language } = useContext(LanguageContext);
  const t = content[language].contact;
  const ui = content[language].ui;
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>(
    'idle',
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    const serviceID = 'service_588fumj';
    const templateID = 'template_tk1wgv7';
    const userID = 'od4fSJW9rW3eOjwy6';

    emailjs.sendForm(serviceID, templateID, '#contact-form', userID).then(
      () => setStatus('sent'),
      () => setStatus('error'),
    );
  };

  const infos = [
    { label: t.emailLabel, value: 'lucasfabregoule@gmail.com', href: 'mailto:lucasfabregoule@gmail.com' },
    { label: t.phoneLabel, value: '+33 6 62 13 55 22', href: 'tel:+33662135522' },
    { label: t.addressLabel, value: t.address },
  ];

  return (
    <section id="contact" className="relative px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeader index="04" eyebrow={ui.contactEyebrow} lines={ui.contactTitle} />

        <div className="grid gap-16 lg:grid-cols-12">
          <Build label="Form / Contact" className="lg:col-span-7">
            <form id="contact-form" onSubmit={handleSubmit} className="space-y-6">
              <p className="text-white/50">{t.subtitle}</p>
              <div className="grid gap-6 sm:grid-cols-2">
                <input type="text" name="name" placeholder={t.name} className={inputClass} required />
                <input type="text" name="surname" placeholder={t.surname} className={inputClass} required />
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <input type="email" name="email" placeholder={t.email} className={inputClass} required />
                <input type="tel" name="phone" placeholder={t.phone} className={inputClass} />
              </div>
              <select name="service" className={`${inputClass} [&:invalid]:text-white/30`} required>
                <option value="" className="bg-ink-900">
                  {t.selectService}
                </option>
                {t.services.map((s) => (
                  <option key={s} value={s} className="bg-ink-900 text-white">
                    {s}
                  </option>
                ))}
              </select>
              <textarea
                name="message"
                placeholder={t.message}
                className={`${inputClass} h-32 resize-none`}
                required
              />
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  id="send-message"
                  type="submit"
                  disabled={status === 'sending'}
                  className="group flex items-center gap-3 bg-accent px-6 py-4 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-white hover:text-ink disabled:opacity-60"
                >
                  {status === 'sending' ? t.sending : t.send}
                  <FaArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                </button>
                {status === 'sent' && <p className="text-sm text-emerald-400">{t.successMessage}</p>}
                {status === 'error' && <p className="text-sm text-accent-soft">{t.errorMessage}</p>}
              </div>
            </form>
          </Build>

          <div className="lg:col-span-5">
            <div className="border-t border-white/[0.08]">
              {infos.map((info, i) => (
                <Build key={info.label} label={`Row / ${info.label}`} delay={i * 0.15}>
                  <div className="border-b border-white/[0.08] py-6">
                    <p className="font-mono text-[11px] uppercase tracking-wider text-white/40">
                      {info.label}
                    </p>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="mt-2 block break-all text-lg text-white transition-colors hover:text-accent md:text-xl"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="mt-2 text-lg text-white md:text-xl">{info.value}</p>
                    )}
                  </div>
                </Build>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
