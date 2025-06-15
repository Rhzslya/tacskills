function App() {
  return (
    <section className="app relative min-h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="absolute h-full inset-0 bg-grid-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_80%)] pointer-events-none"></div>

      <h1 className="title-main text-5xl font-extrabold text-center z-10 mb-4">
        Tic Tac Toe
      </h1>

      <p className="text-lg max-w-xl z-10">
        Classic rules, modern skills. Tic Tac Toe has evolved.
      </p>
    </section>
  );
}

export default App;
