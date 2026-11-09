import { useState } from 'react';

function validate({ name, email, password }) {
  const errors = {};
  if (name.trim() === '') errors.name = 'Name is required';
  if (!email.includes('@')) errors.email = 'Enter a valid email';
  if (password.length < 8) errors.password = 'Password must be at least 8 characters';
  return errors;
}

export default function App() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [signedUp, setSignedUp] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate(form);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) setSignedUp(true);
  };

  if (signedUp) {
    return (
      <main>
        <h1>Welcome, {form.name}!</h1>
      </main>
    );
  }

  return (
    <main>
      <h1>✍️ Sign up</h1>

      <form className="card" onSubmit={handleSubmit} noValidate>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" value={form.name} onChange={handleChange} />
        {errors.name && <p className="error">{errors.name}</p>}

        <label htmlFor="email">Email</label>
        <input id="email" name="email" value={form.email} onChange={handleChange} />
        {errors.email && <p className="error">{errors.email}</p>}

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
        />
        {errors.password && <p className="error">{errors.password}</p>}

        <p>
          <button type="submit">Sign up</button>
        </p>
      </form>
    </main>
  );
}
