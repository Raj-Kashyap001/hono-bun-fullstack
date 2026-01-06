const Navbar = () => {
  return (
    <nav class="navbar">
      <div className="left">
        <a href="/" class="nav-logo">
          MyApp
        </a>
      </div>
      <div className="right">
        <a href="/" class="nav-link">
          Home
        </a>
        <a href="/about" class="nav-link">
          About
        </a>
        <a href="/contact" class="nav-link">
          Contact
        </a>
      </div>
    </nav>
  );
};
export default Navbar;
