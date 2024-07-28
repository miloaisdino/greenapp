import UserDropdown from "@/app/component/UserDropdown";
import GreenAppIcon from "@/public/greenAppIcon.svg";

const Header = (props) => {
  const navigation = [
    { name: "Home", href: "/dashboard" },
    { name: "Redeem Rewards", href: "/redemption" },
    { name: "Contact", href: "mailto:greenapp.orbital@gmail.com" },
  ];

  return (
    <header className="absolute inset-x-0 top-0 z-50 flex h-16 border-b border-gray-900/10">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex flex-1 items-center gap-x-6">
          <GreenAppIcon className="h-16 w-32" />
        </div>
        <nav className="hidden md:flex md:gap-x-11 md:text-sm md:font-semibold md:leading-6 md:text-gray-700">
          {navigation.map((item, itemIdx) => (
            <a key={itemIdx} href={item.href}>
              {item.name}
            </a>
          ))}
        </nav>
        <UserDropdown auth={props.auth} />
      </div>
    </header>
  );
};

export default Header;
