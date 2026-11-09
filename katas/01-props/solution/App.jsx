const team = [
  { name: 'Ada Lovelace', role: 'Mathematician', emoji: '🧮' },
  { name: 'Grace Hopper', role: 'Computer Scientist', emoji: '🐛' },
  { name: 'Alan Turing', role: 'Codebreaker', emoji: '🔐' },
];

function ProfileCard({ name, role, emoji }) {
  return (
    <article className="card">
      <h2>
        <span>{emoji}</span> {name}
      </h2>
      <p className="muted">{role}</p>
    </article>
  );
}

export default function App() {
  return (
    <main>
      <h1>Meet the team</h1>
      <ProfileCard name={team[0].name} role={team[0].role} emoji={team[0].emoji} />
      <ProfileCard name={team[1].name} role={team[1].role} emoji={team[1].emoji} />
      <ProfileCard name={team[2].name} role={team[2].role} emoji={team[2].emoji} />
    </main>
  );
}
