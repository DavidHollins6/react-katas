const defaultUser = { name: 'Ada', plan: 'Pro' };

function Greeting({ name }) {
  return <h1>Welcome back, {name}!</h1>;
}

function UserBadge({ name, plan }) {
  return (
    <div className="card">
      {name} · {plan} plan
    </div>
  );
}

function Header({ user }) {
  return (
    <header>
      <Greeting name={user.name} />
    </header>
  );
}

function Sidebar({ user }) {
  return (
    <aside>
      <UserBadge name={user.name} plan={user.plan} />
    </aside>
  );
}

function Dashboard({ user }) {
  return (
    <div>
      <Header user={user} />
      <Sidebar user={user} />
    </div>
  );
}

export default function App({ user = defaultUser }) {
  return <Dashboard user={user} />;
}
