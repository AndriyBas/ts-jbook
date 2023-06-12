import * as React from "react";
import CodeCell from "./components/code-cell";

const App = () => {
  React.useEffect(() => {
    const handler = (e: ErrorEvent) => {
      if (e.message === "ResizeObserver loop limit exceeded") {
        // ignore it
        e.stopImmediatePropagation();
        e.preventDefault();
      }
    };
    window.addEventListener("error", handler);
    return () => {
      window.removeEventListener("error", handler);
    };
  }, []);
  return <CodeCell />;
};

export default App;
