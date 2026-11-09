// Kata 01: see README.md for what to build.

const team = [
  { name: 'Ada Lovelace', role: 'Mathematician', emoji: '🧮' },
  { name: 'Grace Hopper', role: 'Computer Scientist', emoji: '🐛' },
  { name: 'Alan Turing', role: 'Codebreaker', emoji: '🔐' },
];

function ProfileCard() {
  return (
    <article className="card">
      <h2>
        <span>❓</span> Name goes here
      </h2>
      <p className="muted">Role goes here</p>
    </article>
  );
}

export default function App() {
  return (
    <main>
      <h1>Meet the team</h1>
      <ProfileCard />
    </main>
  );
}
