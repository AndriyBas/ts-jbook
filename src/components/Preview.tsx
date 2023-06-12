import * as React from "react";
import "./preview.css";

interface PreviewProps {
  code: string;
}

const Preview: React.FC<PreviewProps> = ({ code }) => {
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
      window.addEventListener(
        "message",
        (event) => {
          try {
            eval(event.data);
          } catch (error) {
            console.error(error);
            const rootEl = document.getElementById("errorRoot");
            rootEl.innerHTML = "<div><h4>Runtime Error</h4>" + error + "</div>";
          }
        },
        false
      );
    </script>
  </body>
</html>

  `;

export default Preview;
