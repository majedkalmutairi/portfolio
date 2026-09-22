// Runs inline in <head>, before anything paints. Reads the saved choice and sets the `dark`
// class on <html> so the first frame is already the right theme. Default is dark.
// It is a plain string (not React code) because it must run before React loads.
const script = `
(function () {
  try {
    var saved = localStorage.getItem("theme");
    var dark = saved ? saved === "dark" : true;
    var root = document.documentElement;
    root.classList.toggle("dark", dark);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", dark ? "#121212" : "#ffffff");
  } catch (e) {}
})();
`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
