const script = `
(function () {
  try {
    if (location.pathname !== "/") return;
    var force = location.search.indexOf("intro") !== -1;
    if (!force && location.hash) return;
    if (!force && sessionStorage.getItem("intro")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.documentElement.setAttribute("data-intro", "play");
  } catch (e) {}
})();
`;

export function IntroScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
