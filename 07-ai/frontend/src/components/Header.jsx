import { NavLink } from "react-router"
import { useAuthStore } from "../store/authStore"
import { Link } from "./Link.jsx"
import { useFavoriteStore } from "../store/favoriteStore"

export function Header() {
    const { isLoggedIn } = useAuthStore()
    const { counterFavorites } = useFavoriteStore()

    const numberOfFavorites = counterFavorites()

    return (
        <header>
            <Link href='/' style={{ textDecoration: 'none' }}>
                <h1 style={{ color: 'white' }}>
                    DevJobs
                    <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <polyline points="16 18 22 12 16 6"></polyline>
                        <polyline points="8 6 2 12 8 18"></polyline>
                    </svg>
                </h1>
            </Link>
            <nav>
                <NavLink
                    className={({ isActive }) => isActive ? 'nav-link-active' : ''}
                    to="/search"
                >
                    Empleos
                </NavLink>
                {
                    isLoggedIn && (
                        <NavLink
                            className={({ isActive }) => isActive ? 'nav-link-active' : ''}
                            to="/profile"
                        >
                            Profile ❤️ {numberOfFavorites}
                        </NavLink>
                    )}
            </nav>

            <HeaderUserButton />
        </header>
    )
}

const HeaderUserButton = () => {
    const { isLoggedIn, login, logout } = useAuthStore()
    const { clearFavorites } = useFavoriteStore()

    const handleLogout = () => {
        logout()
        clearFavorites()
    }

    return (
        <div>
            {isLoggedIn ?
                <button onClick={handleLogout}>Cerrar sesión</button>
                :
                <button onClick={login}>Iniciar sesión</button>
            }
        </div>
    )
}