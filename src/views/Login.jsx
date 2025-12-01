function Login() {
  return (
    <div className="form-container">
      <h2>Login</h2>

      <form>
        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder="Enter email" required />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" placeholder="Enter password" required />
        </div>

        <button type="submit">Login</button>
      </form>

      <p>
        Don’t have an account? <a href="/signup">Sign up</a>
      </p>
    </div>
  );
}

export default Login;
