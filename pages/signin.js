const signin = () => {
    return (
        <div>
          <button onClick={() => signIn("google", { callbackUrl: process.env.NEXTAUTH_URL })}>
            Sign in with google
          </button>
          <h1>Unauthenticated user</h1> 
      </div>)
};

export default signin;