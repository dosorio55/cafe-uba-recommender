import chromium from "@sparticuz/chromium-min";

declare global {
  var __chromiumExecPathPromise: Promise<string> | undefined;
}

const downloadUrl =
  "https://21dnqu8tjluawlfr.public.blob.vercel-storage.com/chromium-v141.0.0-pack.x64.tar";

export function getChromiumArgs() {
  return chromium.args;
}

export async function getChromiumExecutablePath() {
  if (!globalThis.__chromiumExecPathPromise) {
    globalThis.__chromiumExecPathPromise = chromium.executablePath(downloadUrl);
  }
  return globalThis.__chromiumExecPathPromise;
}
