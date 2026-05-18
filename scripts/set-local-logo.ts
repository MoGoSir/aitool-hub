import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

const LOGO_DIR = path.join(__dirname, '../public/logos');

async function main() {
  if (!fs.existsSync(LOGO_DIR)) {
    fs.mkdirSync(LOGO_DIR, { recursive: true });
  }

  const logoFiles = fs.readdirSync(LOGO_DIR).filter(f => f.endsWith('.png'));
  
  console.log(`📁 Found ${logoFiles.length} logo files in ${LOGO_DIR}`);

  for (const file of logoFiles) {
    const toolName = file.replace('.png', '').replace(/-/g, ' ');
    
    const tools = await prisma.tools.findMany({
      where: {
        name: { contains: toolName.split(' ')[0] },
      },
    });

    if (tools.length === 1) {
      const tool = tools[0];
      await prisma.tools.update({
        where: { id: tool.id },
        data: { logoUrl: `/logos/${file}` },
      });
      console.log(`✅ Updated logo for "${tool.name}" -> /logos/${file}`);
    } else if (tools.length > 1) {
      console.log(`⚠️  Multiple matches for "${toolName}": ${tools.map(t => t.name).join(', ')}`);
    } else {
      console.log(`❌ No tool found for "${toolName}"`);
    }
  }

  await prisma.$disconnect();
}

main().catch(async (error) => {
  console.error('❌ Error:', error.message);
  await prisma.$disconnect();
});