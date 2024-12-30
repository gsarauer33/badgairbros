import Link from 'next/link';

export default function Navbar() {
    return (
        <nav style={{ background: '#ccc', padding: '1rem' }}>
            <Link href="/">Home</Link> |{' '}
            <Link href="/auth/login">Login</Link> |{' '}
            <Link href="/auth/register">Register</Link> |{' '}
            <Link href="/dashboard">Dashboard</Link> |{' '}
            <Link href="/dashboard/upload">Upload CSV</Link> |{' '}
            <Link href="/dashboard/profit-map">Profit Map</Link>
        </nav>
    );
}