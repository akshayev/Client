// hooks/useDownloadFile.js
import { useCallback } from "react";

export default function useDownloadFile() {
  const downloadFile = useCallback((fileUrl, customName) => {
    // Extract base filename from URL (ignores query params)
    const urlParts = fileUrl.split("/");
    let autoFileName = urlParts[urlParts.length - 1].split("?")[0];
    if (!autoFileName) autoFileName = "download";

    fetch(fileUrl, { mode: "cors" })
      .then((res) => {
        // Try to get file extension from Content-Type
        const contentType = res.headers.get("Content-Type") || "";
        let extension = "";

        if (contentType.includes("image/")) {
          extension = "." + contentType.split("/")[1];
        } else if (contentType === "application/pdf") {
          extension = ".pdf";
        } else if (contentType.includes("zip")) {
          extension = ".zip";
        } else if (contentType.includes("json")) {
          extension = ".json";
        } else if (contentType.includes("text/plain")) {
          extension = ".txt";
        }
        // If URL already has extension, don’t override
        if (!/\.[a-zA-Z0-9]+$/.test(autoFileName) && extension) {
          autoFileName += extension;
        }

        const fileName = customName || autoFileName;

        return res.blob().then((blob) => ({ blob, fileName }));
      })
      .then(({ blob, fileName }) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch((err) => {
        console.error("Download failed:", err);

        // ✅ Fallback (direct download if fetch blocked by CORS)
        const link = document.createElement("a");
        link.href = fileUrl;
        link.download = customName || autoFileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  }, []);

  return downloadFile;
}
