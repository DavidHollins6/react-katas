// Kata 02: see README.md for what to build.

const defaultUser = { name: 'Ada', plan: 'Pro' };

function Greeting() {
  return <h1>Welcome back, ???!</h1>;
}

function UserBadge() {
  return <div className="card">??? · ??? plan</div>;
}

function Header() {
  return (
    <header>
      <Greeting />
    </header>
  );
}

function Sidebar() {
  return (
    <aside>
      <UserBadge />
    </aside>
  );
}

function Dashboard() {
  return (
    <div>
      <Header />
      <Sidebar />
    </div>
  );
}

// `App` receives the user as a prop (it falls back to `defaultUser`).
export default function App({ user = defaultUser }) {
  return <Dashboard />;
}
