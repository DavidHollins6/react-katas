const defaultUser = { name: 'Ada', plan: 'Pro' };

// TODO: Greeting should say "Welcome back, <name>!"
function Greeting() {
  return <h1>Welcome back, ???!</h1>;
}

// TODO: UserBadge should say "<name> · <plan> plan"
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
// TODO: pass `user` down through Dashboard → Header/Sidebar → Greeting/UserBadge.
export default function App({ user = defaultUser }) {
  return <Dashboard />;
}
