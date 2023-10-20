export default function Header({
  user,
  setUser,
  setLoginForm,
}: {
  user: null | string;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
  setLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="h-12 bg-violet-600 text-white text-xl shadow flex justify-between items-center mb-16 rounded-b-2xl">
      <div className="ml-5 text-2xl">Tic-Tac-Toe</div>
      {user ? (
        <button className="mr-6" onClick={() => setUser(null)}>
          Log out
        </button>
      ) : (
        <button className="mr-6" onClick={() => setLoginForm(true)}>
          Login
        </button>
      )}
    </div>
  );
}
