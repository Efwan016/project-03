export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-900">
      <div className="max-w-6xl mx-auto p-4 text-sm text-zinc-400">
        © {new Date().getFullYear()} AdzaniMarket. All rights reserved.
      </div>
    </footer>
  );
}
