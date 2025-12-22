import { create } from 'zustand'

export const useFavoriteStore = create((set, get, store) => ({
    // State
    favorites: [],

    // Actions.
    addFavorite: (jobId) =>
        set(state => ({
            favorites: state.favorites.includes(jobId)
                ? state.favorites
                : [...state.favorites, jobId]
        })),

    removeFavorite: (jobId) =>
        set(state => ({
            favorites: state.favorites.filter((id) => id !== jobId)
        })),

    isFavorite: (jobId) => get().favorites.includes(jobId),

    toggleFavorite: (jobId) => {
        const { isFavorite, removeFavorite, addFavorite } = get()
        const isFav = isFavorite(jobId)
        isFav ? removeFavorite(jobId) : addFavorite(jobId)
    },

    counterFavorites: () => get().favorites.length,

    clearFavorites: () => {
        set(store.getInitialState())
    },

}))