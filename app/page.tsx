import VolunteerForm from './components/VolunteerForm';

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden text-white selection:bg-primary selection:text-white">
      {/* Background Elements */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-[#050510] to-[#050510] -z-10" />
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl -z-10 animate-pulse delay-1000" />

      <div className="max-w-6xl mx-auto px-4 py-12 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">

          {/* Left Column: Content */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm font-semibold tracking-wide uppercase text-accent">
                Rejoins l'aventure 2026
              </span>
              <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none">
                BASS<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">STIVAL</span>
              </h1>
              <p className="text-xl md:text-2xl font-light text-gray-300 max-w-2xl">
                Deviens acteur d'un festival de musique local au coeur des Hautes-Alpes
              </p>
              <p className="text-xl md:text-2xl font-semibold text-center text-gray-100 max-w-2xl">
                Du Vendredi 29 Mai 2026 au Dimanche 31 Mai 2026
              </p>
            </div>

            <div className="prose prose-invert prose-lg text-gray-400 leading-relaxed">
              <p>
                Le BASSSTIVAL recherche ses héros de l'ombre ! Si tu aimes la musique qui fait vibrer les murs et l'ambiance festival, cette mission est faite pour toi.
              </p>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6 my-8">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-2xl">🤝</span> Ton engagement
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">✓</span>
                    <span>Au minimum <strong>2 créneaux</strong> de 2h ou 3h sur le weekend.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">✓</span>
                    <span>Possibilité d'en faire plus (3 ou 4) si tu es motivé(e) !</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">✓</span>
                    <span>Accès au festival en dehors de tes créneaux.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">✓</span>
                    <span>2 Boissons et un repas offert par jour de bénévolat</span>
                  </li>
                </ul>
              </div>

              <p>
                Choisis ton poste de prédilection, rencontre des gens incroyables et vis le festival de l'intérieur. Que tu sois au bar pour hydrater les foules ou à la Basss Patrouille pour veiller sur les gens, on a besoin de toi.
              </p>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-5 sticky top-8">
            <VolunteerForm />
          </div>

        </div>
      </div>

      <footer className="text-center py-8 text-gray-600 text-sm">
        <p>© 2026 BASSSTIVAL. Fait avec 💜 par l'équipe bénévole.</p>
      </footer>
    </main>
  );
}
