import { Link } from "react-router-dom";

export const AnclaNav = ({ link }) => {
  return (
    <Link
      key={link.name}
      to={link.to}
      state={link.scrollTo ? { scrollTo: link.scrollTo } : undefined}
      className="relative px-3 lg:px-4 xl:px-5 py-2 lg:py-2.5 text-sm lg:text-base xl:text-lg font-semibold text-primary-primary hover:text-primary-light transition-all duration-300 rounded-lg group hover:bg-primary-primary/5"
    >
      {link.name}
      <span className="absolute left-3 lg:left-4 xl:left-5 right-3 lg:right-4 xl:right-5 bottom-1 lg:bottom-1.5 h-0.5 bg-primary-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </Link>
  );
};
