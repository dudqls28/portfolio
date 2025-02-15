"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "../styles/navigation.module.css"
export default function Navigation(){   
    const path = usePathname();
    return(
        <header className={styles.header}>
        <nav className={styles.nav}>
            <a>Been</a>
            <ul>
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/about-us">About</Link>
                </li>
                <li>
                    <Link href="/skils">Skils</Link>
                </li>
                <li>
                    <Link href="/services">Services</Link>
                </li>
                <li>
                    <Link href="/portfolio">Portfolio</Link>
                </li>
                <li>
                    <Link href="/conatct">Contact Me!</Link>
                </li>
            </ul>
        </nav>
        </header>
    )
}