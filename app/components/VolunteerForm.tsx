'use client';

import { useState } from 'react';

export default function VolunteerForm() {
    const [formData, setFormData] = useState({
        name: '',
        firstName: '',
        address: '',
        email: '',
        phone: '',
        roles: [] as string[],
        hasExperience: false,
        previousFestival: ''
    });

    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleRoleChange = (value: string) => {
        setFormData(prev => {
            const currentRoles = prev.roles;
            let newRoles: string[];

            if (value === 'any') {
                // If 'any' is selected, it clears everything else and toggles itself
                newRoles = currentRoles.includes('any') ? [] : ['any'];
            } else {
                // If a specific role is selected
                if (currentRoles.includes('any')) {
                    // If 'any' was selected, clear it and add the new one
                    newRoles = [value];
                } else {
                    // Toggle the value
                    newRoles = currentRoles.includes(value)
                        ? currentRoles.filter(r => r !== value)
                        : [...currentRoles, value];
                }
            }

            return { ...prev, roles: newRoles };
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        setErrorMessage('');

        try {
            const res = await fetch('/api/volunteer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message || 'Une erreur est survenue');
            }

            setStatus('success');
            setFormData({
                name: '',
                firstName: '',
                address: '',
                email: '',
                phone: '',
                roles: [],
                hasExperience: false,
                previousFestival: ''
            });
        } catch (error: any) {
            setStatus('error');
            setErrorMessage(error.message);
        }
    };

    if (status === 'success') {
        return (
            <div className="bg-green-900/50 border border-green-500 p-8 rounded-xl text-center backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-green-400 mb-4">Merci ! 🎉</h3>
                <p className="text-gray-200">Ta candidature a bien été reçue. On revient vers toi très vite !</p>
                <button
                    onClick={() => setStatus('idle')}
                    className="mt-6 px-6 py-2 bg-green-600 hover:bg-green-500 rounded-full font-semibold transition-colors"
                >
                    Nouvelle inscription
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-md shadow-2xl">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-6">
                Formulaire d'inscription
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">Nom</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder-gray-600"
                        placeholder="Ton nom"
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">Prénom</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder-gray-600"
                        placeholder="Ton prénom"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder-gray-600"
                    placeholder="exemple@email.com"
                />
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Téléphone</label>
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder-gray-600"
                    placeholder="06 12 34 56 78"
                />
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Adresse</label>
                <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder-gray-600 resize-none"
                    placeholder="Ton adresse complète"
                />
            </div>

            <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-300">Postes souhaités (plusieurs choix possibles)</label>
                <div className="grid grid-cols-2 gap-4">
                    {[
                        { id: 'bar', label: '🍺 Bar' },
                        { id: 'billetterie', label: '🎟️ Billetterie' },
                        { id: 'basss_patrol', label: '🛡️ Basss Patrol' },
                        { id: 'parking', label: '🚗 Parking' },
                    ].map((option) => (
                        <div
                            key={option.id}
                            onClick={() => handleRoleChange(option.id)}
                            className={`cursor-pointer border rounded-xl p-4 transition-all duration-200 flex items-center justify-center text-center font-medium select-none
                                ${formData.roles.includes(option.id)
                                    ? 'bg-primary/20 border-primary text-white shadow-[0_0_15px_rgba(217,70,239,0.3)]'
                                    : 'bg-black/40 border-gray-700 text-gray-400 hover:border-gray-500 hover:bg-white/5'
                                }
                            `}
                        >
                            {option.label}
                        </div>
                    ))}
                    <div
                        onClick={() => handleRoleChange('any')}
                        className={`col-span-2 cursor-pointer border rounded-xl p-4 transition-all duration-200 flex items-center justify-center text-center font-medium select-none
                            ${formData.roles.includes('any')
                                ? 'bg-secondary/20 border-secondary text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                                : 'bg-black/40 border-gray-700 text-gray-400 hover:border-gray-500 hover:bg-white/5'
                            }
                        `}
                    >
                        🤷 Ça m'est égal (j'aide où on a besoin de moi)
                    </div>
                </div>
            </div>

            <div className="space-y-4 pt-2">
                <label className="flex items-center space-x-3 cursor-pointer group">
                    <input
                        type="checkbox"
                        name="hasExperience"
                        checked={formData.hasExperience}
                        onChange={handleChange}
                        className="w-5 h-5 rounded border-gray-600 bg-black/40 text-primary focus:ring-primary focus:ring-offset-0 focus:ring-offset-transparent"
                    />
                    <span className="text-gray-300 group-hover:text-white transition-colors">J'ai déjà été bénévole dans un autre festival</span>
                </label>

                {formData.hasExperience && (
                    <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                        <label className="block text-sm font-medium text-gray-300 mb-2">Lequel ?</label>
                        <input
                            type="text"
                            name="previousFestival"
                            value={formData.previousFestival}
                            onChange={handleChange}
                            className="w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder-gray-600"
                            placeholder="Nom du festival"
                        />
                    </div>
                )}
            </div>

            {status === 'error' && (
                <div className="p-4 bg-red-900/50 border border-red-500 rounded-lg text-red-200 text-sm">
                    {errorMessage}
                </div>
            )}

            <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-4 bg-gradient-to-r from-primary to-blue-600 hover:from-fuchsia-500 hover:to-blue-500 text-white font-bold text-lg rounded-xl shadow-lg shadow-purple-500/20 transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {status === 'submitting' ? 'Envoi en cours...' : 'Je postule ! 🚀'}
            </button>
        </form>
    );
}
