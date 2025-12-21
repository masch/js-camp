import { createContext, use, useState } from "react";

export const FavoritesContext = createContext(null)

export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState([])

    const addFavorite = (job) => {
        setFavorites([...favorites, job])
    }

    const removeFavorite = (jobId) => {
        setFavorites(favorites.filter((job) => job.id !== jobId))
    }

    const isFavorite = (jobId) => {
        return favorites.some((job) => job.id === jobId)
    }

    const value = {
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite
    }

    return (
        <FavoritesContext value={value}>
            {children}
        </FavoritesContext>
    )
}

export function useFavorites() {
    const context = use(FavoritesContext)

    if (context === undefined) {
        throw new Error('useFavorites must be used within a FavoritesProvider')
    }

    return context
}
