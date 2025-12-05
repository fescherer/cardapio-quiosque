export function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer>
            copyright © {year} Quiosque do Parque
        </footer>
    )
}