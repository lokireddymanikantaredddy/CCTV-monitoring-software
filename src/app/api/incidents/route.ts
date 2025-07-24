import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/incidents?resolved=false
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const resolved = searchParams.get('resolved');
  const where = resolved === 'false' ? { resolved: false } : {};
  try {
    const incidents = await prisma.incident.findMany({
      where,
      orderBy: { tsStart: 'desc' },
      include: { camera: true },
    });
    return NextResponse.json(incidents);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch incidents' }, { status: 500 });
  }
}

// PATCH /api/incidents/:id/resolve
export async function PATCH(req: NextRequest) {
  try {
    const { id } = await req.json();
    const incident = await prisma.incident.findUnique({ where: { id } });
    if (!incident) {
      return NextResponse.json({ error: 'Incident not found' }, { status: 404 });
    }
    const updated = await prisma.incident.update({
      where: { id },
      data: { resolved: !incident.resolved },
    });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update incident' }, { status: 500 });
  }
} 