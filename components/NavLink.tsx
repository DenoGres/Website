function NavLink(
  props: { href: string; active: string; svg: Element },
) {
  const { href, active, svg } = props;

  const divStyle: string =
    (href === active ? "bg-gray-500 text-white" : "bg-gray-200") +
    " mb-3 p-2 rounded hover:bg-gray-500 hover:text-white transition-300";

  return (
    <a href={href}>
      <div
        className={divStyle}
      >
        {svg}
      </div>
    </a>
  );
}
export default NavLink;
