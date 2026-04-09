

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

          {/* Right Column: Form / Closed Message */}
          <div className="lg:col-span-5 sticky top-8">
            <div className="p-8 md:p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 space-y-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 text-xl font-bold border border-white/20">
                  🎉
                </div>
                
                <h2 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                  L'équipe est au complet !
                </h2>
                
                <p className="text-lg text-gray-300 leading-relaxed font-light">
                  Un immense merci à toutes celles et ceux qui ont postulé. Les inscriptions bénévoles sont maintenant <strong className="text-white font-semibold">fermées</strong> pour cette édition.
                </p>

                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent my-6" />

                <p className="text-sm text-gray-400 font-light">
                  <span className="block mb-2 text-primary">👉 Pour les inscrits :</span>
                  Vous allez recevoir très prochainement toutes les informations par email concernant les plannings et l'organisation du festival. Préparez-vous !
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <footer className="text-center py-8 text-gray-600 text-sm">
        <p>© 2026 BASSSTIVAL. Fait avec 💜 par l'équipe bénévole.</p>
      </footer>
    </main>
  );
}
