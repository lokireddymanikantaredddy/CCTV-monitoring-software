// Converted to CommonJS for compatibility
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Create cameras
  await prisma.camera.createMany({
    data: [
      { name: 'ShopFloor A', location: 'Ground Floor' },
      { name: 'Vault', location: 'Basement' },
      { name: 'Entrance', location: 'Main Gate' },
    ],
  });

  // Get camera IDs
  const cameraList = await prisma.camera.findMany();

  // Incident types and thumbnails
  const incidentTypes = [
    { type: 'Unauthorized Access', thumbnailUrl: '/thumbnails/unauthorized.jpg' },
    { type: 'Gun Threat', thumbnailUrl: '/thumbnails/gun.jpg' },
    { type: 'Face Recognised', thumbnailUrl: '/thumbnails/face.jpg' },
  ];

  // Generate incidents
  const now = new Date();
  const incidents = [];
  for (let i = 0; i < 12; i++) {
    const camera = cameraList[i % cameraList.length];
    const incidentType = incidentTypes[i % incidentTypes.length];
    const tsStart = new Date(now.getTime() - (i + 1) * 60 * 60 * 1000); // 1 hour apart
    const tsEnd = new Date(tsStart.getTime() + 5 * 60 * 1000); // 5 min duration
    incidents.push({
      cameraId: camera.id,
      type: incidentType.type,
      tsStart,
      tsEnd,
      thumbnailUrl: incidentType.thumbnailUrl,
      resolved: false,
    });
  }

  await prisma.incident.createMany({ data: incidents });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 