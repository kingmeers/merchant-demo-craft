/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

// Define navigation links
const navLinks = [
  { href: "/", title: "Home" },
  { href: "/about", title: "About" },
  { href: "/services", title: "Services" },
  { href: "/pricing", title: "Pricing" },
  { href: "/contact", title: "Contact" }
];

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white border-gray-200 w-full">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 md:py-4">
          <Link href="/" passHref>
            <span className="flex items-center space-x-3 cursor-pointer">
              <img src="https://cdn.dollchest.com/dollchest/95cb6808-00d0-41dc-a5fa-636b32e00827-737w.webp" className="h-8 rounded-md" alt="Flowbite Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-black">Merchant</span>
            </span>
          </Link>
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} passHref>
                <span className="cursor-pointer py-2 px-3 text-black hover:bg-gray-100 rounded md:p-0">{link.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
