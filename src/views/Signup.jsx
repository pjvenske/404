function Signup() {
  return (
    <div className="form-container">
      <h2>Sign Up</h2>

      <form>
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" placeholder="Enter full name" required />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder="Enter email" required />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" placeholder="Enter password" required />
        </div>

        <button type="submit">Create Account</button>
      </form>

      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
}

export default Signup;
