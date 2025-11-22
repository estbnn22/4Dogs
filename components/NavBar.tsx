import Link from "next/link";
import Image from "next/image";
import { stackServerApp } from "@/stack/server";
import { UserButton } from "@stackframe/stack";
import { isAdminEmail } from "@/lib/admin";

export default async function NavBar() {
  const user = await stackServerApp.getUser();
  return (
    <div className="navbar bg-base-100 shadow-sm h-20 sticky top-0 z-999">
      <div className="navbar-start flex items-center">
        <Link href="/" className="pl-2 md:pl-5">
          <Image src="/LOGO.png" alt="4Dogs Logo" width={250} height={250} />
        </Link>
      </div>
      <div className="navbar-end">
        <div className="hidden md:flex gap-5 items-center mr-5">
          <Link
            href="/about"
            className="hover:text-accent text-2xl font-semibold uppercase"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="hover:text-accent text-2xl font-semibold  uppercase "
          >
            Contact
          </Link>
          <Link
            href="/services"
            className="hover:text-accent text-2xl font-semibold uppercase"
          >
            Services
          </Link>

          <Link
            href="/booking"
            className="btn btn-primary px-6 font-semibold text-xl uppercase"
          >
            BOOK
          </Link>

          {user ? (
            isAdminEmail(user.primaryEmail) ? (
              <Link
                href="/admin"
                className="btn btn-accent px-6 font-semibold text-xl uppercase"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/myAppts"
                className="btn btn-accent px-6 font-semibold text-xl uppercase"
              >
                My Appointments
              </Link>
            )
          ) : (
            <Link
              href="/logIn"
              className="btn btn-accent px-6 font-semibold text-xl uppercase"
            >
              Sign In
            </Link>
          )}
        </div>
        <div className="dropdown dropdown-end md:hidden">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost rounded-field"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-8 w-8 stroke-current"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>{" "}
            </svg>
          </div>
          <ul className="menu dropdown-content bg-base-200 rounded-box z-1 mt-4 w-52 p-2 shadow-sm">
            <li>
              <Link
                href="/about"
                className="hover:text-accent text-xl uppercase"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-accent text-xl uppercase"
              >
                contact
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className="hover:text-accent text-xl uppercase"
              >
                services
              </Link>
            </li>
            <div className="flex flex-col gap-2 mt-2">
              <li>
                <Link href="/booking" className="btn btn-primary ">
                  BOOK
                </Link>
              </li>
              <li>
                {user ? (
                  isAdminEmail(user.primaryEmail) ? (
                    <Link
                      href="/admin"
                      className="btn btn-accent px-6 font-semibold text-xl uppercase"
                    >
                      Dashboard
                    </Link>
                  ) : (
                    <Link
                      href="/myAppts"
                      className="btn btn-accent px-6 font-semibold text-sm uppercase"
                    >
                      My Appointments
                    </Link>
                  )
                ) : (
                  <Link
                    href="/logIn"
                    className="btn btn-accent px-6 font-semibold text-xl uppercase"
                  >
                    Sign In
                  </Link>
                )}
              </li>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}
