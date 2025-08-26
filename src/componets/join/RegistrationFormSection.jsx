// src/components/join/RegistrationFormSection.js
import React from 'react';

const RegistrationFormSection = () => (
  <section>
    <div className="max-w-lg mx-auto bg-neutral-900/50 p-8 md:p-12 rounded-xl border border-white/10">
      <h2 className="text-2xl font-bold text-center mb-8">Registration Form</h2>
      {/*<form onSubmit={onSubmit} className="w-full flex flex-col gap-8">
        <AnimatedInput id="name" label="Your Name" icon={<FiUser />} value={formData.name} onChange={onInputChange} />
        <AnimatedInput id="email" label="Email Address" type="email" icon={<FiMail />} value={formData.email} onChange={onInputChange} />
        <AnimatedInput id="password" label="Create a Password" type="password" icon={<FiLock />} value={formData.password} onChange={onInputChange} />
        <AnimatedInput id="program" label="Program / Year" icon={<FiAward />} value={formData.program} onChange={onInputChange} />
        <button
          type="submit"
          disabled={formStatus === 'submitting'}
          className="group relative w-full flex justify-center items-center gap-2 py-3 px-5 mt-4 bg-sky-600 rounded-lg text-lg font-semibold hover:bg-sky-500 transition-all duration-300 disabled:cursor-not-allowed disabled:bg-neutral-600"
        >
          {formStatus === 'submitting' ? 'Processing...' : formStatus === 'success' ? 'Welcome!' : 'Submit Application'}
        </button>
      </form>*/}
      <button
          className="group relative w-full flex justify-center items-center gap-2 py-3 px-5 mt-4 bg-sky-600 rounded-lg text-lg font-semibold hover:bg-sky-500 transition-all duration-300 disabled:cursor-not-allowed disabled:bg-neutral-600"
        >
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSfG_bRs3i6En3YK7ML31eWdhtXv29CkXbYAJmZ_fV06cxeCqw/viewform?usp=send_form" target="_blank" rel="noopener noreferrer">Request to Join</a>
        </button>
    </div>
  </section>
);

export default RegistrationFormSection;