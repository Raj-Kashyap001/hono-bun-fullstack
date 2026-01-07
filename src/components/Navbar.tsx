type NavbarProps = {
  isLoggedIn?: boolean;
  username?: string;
};

const Navbar = ({ isLoggedIn = false, username = "" }: NavbarProps) => {
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
        {isLoggedIn ? (
          <>
            <a href="/profile" class="nav-link">
              Profile ({username})
            </a>
            <form
              method="post"
              action="/api/logout"
              style={{ display: "inline" }}
            >
              <button type="submit" class="logout-btn">
                Logout
              </button>
            </form>
          </>
        ) : (
          <>
            <a href="/login" class="nav-link">
              Login
            </a>
            <a href="/signup" class="nav-link">
              Sign Up
            </a>
          </>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
