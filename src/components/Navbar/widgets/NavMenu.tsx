import { contacts } from "@/configs";
import { MenuItems, RadiatorItems } from "./config";
import { MobileMenu } from "./MobileMenu";

export function NavMenu() {
  return (
    <>
      <div className="hidden lg:flex flex-col gap-1.5">
        <div className="flex flex-row justify-start align-middle gap-8 text-xs tracking-tight font-semibold">
          <a className="hover:text-primary" href={`tel:${contacts.phone495}`}>
            {contacts.phone495String}
          </a>
          <a className="hover:text-primary" href={`tel:${contacts.phone812}`}>
            {contacts.phone812String}
          </a>
          <a className="hover:text-primary" href={`mailto:${contacts.email}`}>
            {contacts.email}
          </a>
        </div>
        <div className="flex flex-row justify-start align-middle gap-6 tracking-tight font-light text-slate-900 ">
          {MenuItems.map((item, index) => (
            <a
              key={index}
              href={item.url}
              className="flex flex-col justify-center text-sm tracking-tight hover:opacity-70"
            >
              {item.title}
            </a>
          ))}
        </div>
        <div className="flex flex-row justify-start align-middle gap-4 tracking-tight font-semibold text-slate-900">
          {RadiatorItems.map((item, index) => (
            <a
              key={index}
              href={item.url}
              className="flex flex-col justify-center text-sm tracking-tight  hover:opacity-70"
            >
              {item.title}
            </a>
          ))}
        </div>
      </div>

      <div className="lg:hidden">
        <MobileMenu />
      </div>
    </>
  );
}
