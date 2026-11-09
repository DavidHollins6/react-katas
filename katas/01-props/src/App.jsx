const team = [
  { name: 'Ada Lovelace', role: 'Mathematician', emoji: '🧮' },
  { name: 'Grace Hopper', role: 'Computer Scientist', emoji: '🐛' },
  { name: 'Alan Turing', role: 'Codebreaker', emoji: '🔐' },
];

// TODO: make ProfileCard accept `name`, `role` and `emoji` props
// and show them instead of the placeholder text.
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
      {/* TODO: render one ProfileCard per person in `team`, passing their details as props */}
      <ProfileCard />
    </main>
  );
}
