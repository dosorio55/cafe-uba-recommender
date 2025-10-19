// Do not import env.config here to keep this logger usable in client components.
// Read NODE_ENV directly to avoid triggering server-only env validation in the browser.
const RUNTIME_NODE_ENV =
  (typeof process !== 'undefined' && process.env && process.env.NODE_ENV) ||
  'production'

const C = {
  reset: '\x1b[0m',
  dim: '\x1b[2m',
  white: '\x1b[97m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  green: '\x1b[32m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
}

type Level = 'debug' | 'info' | 'warn' | 'error'

const levelOrder: Record<Level, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
}

const levelColors: Record<Level, string> = {
  debug: C.cyan,
  info: C.green,
  warn: C.yellow,
  error: C.red,
}

function now() {
  try {
    const date = new Date()
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0')
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`
  } catch {
    return new Date().toISOString()
  }
}

function safeStringify(v: any) {
  try {
    if (typeof v === 'string') return v
    return JSON.stringify(v)
  } catch {
    return String(v)
  }
}

function format(level: Level, msg: string, meta: any[]) {
  const color = levelColors[level]
  const parts: string[] = []

  parts.push(C.white + now() + C.reset)
  parts.push(color + level.toUpperCase() + C.reset)
  parts.push(msg)

  if (meta.length) {
    const tail = meta.map((m) => safeStringify(m)).join(' ')
    parts.push(C.dim + tail + C.reset)
  }
  return parts.join(' ')
}

function makeLogger(minLevel: Level, context?: Record<string, string>) {
  const min = levelOrder[minLevel]

  function withCtx(msg: string, callCtx?: Record<string, string>) {
    const merged = {
      ...(context || {}),
      ...(callCtx || {}),
    }
    const entries = Object.entries(merged)
    const primaryKeys = new Set(['scope', 'method'])
    const primary = entries
      .filter(([k]) => primaryKeys.has(k))
      .map(([k, v]) => `${C.magenta}${k}${C.reset}=${C.cyan}${v}${C.reset}`)
    const others = entries
      .filter(([k]) => !primaryKeys.has(k))
      .map(([k, v]) => `${C.magenta}${k}${C.reset}=${C.dim}${v}${C.reset}`)
    const ctx = [...primary, ...others].join(' ')
    return ctx ? `${msg} ${ctx}` : msg
  }

  const api = {
    debug: (msg: string, ...meta: any[]) => {
      if (levelOrder.debug < min) return
      const idx = meta.findIndex(
        (m) => m && typeof m === 'object' && m.__ctx === true
      )
      let callCtx: Record<string, string> | undefined
      if (idx >= 0) {
        const m = meta[idx] as any
        const c: Record<string, string> = {}
        if (typeof m.scope === 'string') c.scope = m.scope
        if (typeof m.method === 'string') c.method = m.method
        callCtx = Object.keys(c).length ? c : undefined
      }
      const rest =
        idx >= 0 ? [...meta.slice(0, idx), ...meta.slice(idx + 1)] : meta
      console.debug(format('debug', withCtx(msg, callCtx), rest))
    },
    info: (msg: string, ...meta: any[]) => {
      if (levelOrder.info < min) return
      const idx = meta.findIndex(
        (m) => m && typeof m === 'object' && m.__ctx === true
      )
      let callCtx: Record<string, string> | undefined
      if (idx >= 0) {
        const m = meta[idx] as any
        const c: Record<string, string> = {}
        if (typeof m.scope === 'string' && m.scope !== undefined)
          c.scope = m.scope
        if (typeof m.method === 'string' && m.method !== undefined)
          c.method = m.method
        callCtx = Object.keys(c).length ? c : undefined
      }
      const rest =
        idx >= 0 ? [...meta.slice(0, idx), ...meta.slice(idx + 1)] : meta
      console.info(format('info', withCtx(msg, callCtx), rest))
    },
    warn: (msg: string, ...meta: any[]) => {
      if (levelOrder.warn < min) return
      const idx = meta.findIndex(
        (m) => m && typeof m === 'object' && m.__ctx === true
      )
      let callCtx: Record<string, string> | undefined
      if (idx >= 0) {
        const m = meta[idx] as any
        const c: Record<string, string> = {}
        if (typeof m.scope === 'string') c.scope = m.scope
        if (typeof m.method === 'string') c.method = m.method
        callCtx = Object.keys(c).length ? c : undefined
      }
      const rest =
        idx >= 0 ? [...meta.slice(0, idx), ...meta.slice(idx + 1)] : meta
      console.warn(format('warn', withCtx(msg, callCtx), rest))
    },
    error: (msg: string, ...meta: any[]) => {
      if (levelOrder.error < min) return
      const idx = meta.findIndex(
        (m) => m && typeof m === 'object' && m.__ctx === true
      )
      let callCtx: Record<string, string> | undefined
      if (idx >= 0) {
        const m = meta[idx] as any
        const c: Record<string, string> = {}
        if (typeof m.scope === 'string') c.scope = m.scope
        if (typeof m.method === 'string') c.method = m.method
        callCtx = Object.keys(c).length ? c : undefined
      }
      const rest =
        idx >= 0 ? [...meta.slice(0, idx), ...meta.slice(idx + 1)] : meta
      console.error(format('error', withCtx(msg, callCtx), rest))
    },
    child: (ctx: Record<string, string>) =>
      makeLogger(minLevel, {
        ...(context || {}),
        ...ctx,
      }),
  }
  return api
}

const defaultMinLevel: Level =
  RUNTIME_NODE_ENV === 'development' ? 'debug' : 'info'

export const logger = makeLogger(defaultMinLevel)
