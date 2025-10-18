export const runtime = 'nodejs'

import { scrapeCafeUbaCollection } from '../../core/landing.core'

export async function GET() {
  const data = await scrapeCafeUbaCollection()
  return Response.json(data)
}
