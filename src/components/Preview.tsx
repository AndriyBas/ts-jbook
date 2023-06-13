import * as React from "react";
import "./preview.css";

interface PreviewProps {
  code: string;
  error: string;
}

const Preview: React.FC<PreviewProps> = ({ code, error }) => {
  const iframeRef = React.useRef<HTMLIFrameElement | null>(null);

  React.useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.srcdoc = previewIframeCode;
      setTimeout(() => {
        iframeRef.current?.contentWindow?.postMessage(code, "*");
      }, 50);
    }
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe
        ref={iframeRef}
        srcDoc={previewIframeCode}
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-scripts allow-downloads allow-pointer-lock"
        title="Code Preview"
      />
      {error && <div className="preview-error">{error}</div>}
    </div>
  );
};

const previewIframeCode = `
<html>
  <head>
    <style>
      html {
        background-color: white;
      }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <div id="errorRoot" style="color: red"></div>
    <script>
      const handleError = (error) => {
        console.error(error);
        const rootEl = document.getElementById("errorRoot");
        rootEl.innerHTML = "<div><h4>Runtime Error</h4>" + error + "</div>";
      };
      window.addEventListener("error", (event) => {
        event.preventDefault();
        handleError(event.error);
      });
      window.addEventListener(
        "message",
        (event) => {
          try {
            eval(event.data);
          } catch (error) {
            handleError(error);
          }
        },
        false
      );
    </script>
  </body>
</html>
  `;

export default Preview;
