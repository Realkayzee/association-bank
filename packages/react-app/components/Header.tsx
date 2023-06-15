import Link from "next/link";
import { CustomConnector } from "./customConnector";
import { customTheme } from "./customTheme";


export default function Header() {

  // Interface for the navigation items

  interface navType {
    name: string;
    link: string;
  }

  // List of nav items
  const navItems:navType[] = [
    {
      name: "Home",
      link: "/"
    },
    {
      name: "Banks",
      link: "/#account-list"
    },
    {
      name: "Check Deposit",
      link: "/#account-list"
    }
  ]
    return (
      <>
      {/* This navbar is only displayed on large screen */}
        <div className="fixed bg-black lg:px-12 xl:px-56 w-full p-4 z-40 hidden md:block text-white font-lato">
          <div className="flex flex-row w-full justify-between">
            <div className="base-1/4">
              <p className={`${customTheme.text_gradient} font-bold text-2xl font-fira-mono cursor-pointer`}>
                AssociationBank
              </p>
            </div>
            <div className="base-2/4 mt-1">
                <ul className="flex flex-row gap-1">
                  {/* Displaying the nav items */}
                  {
                    navItems.map((navs, id) => (
                      <li key={id}>
                        <Link href={navs.link} className={customTheme.link}>
                          {navs.name}
                        </Link>
                      </li>
                    ))
                  }
                </ul>
            </div>
            <div className="base-1/4">
              <CustomConnector color="bg-goldenyellow" text="text-black" />
            </div>
          </div>
        </div>
      </>
    )
  }