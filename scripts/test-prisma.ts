import { PrismaClient } from '@prisma/client';
import path from 'path';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: `file:${path.join(process.cwd(), 'prisma', 'dev.db')}`
    }
  }
});

async function test() {
  try {
    console.log('Testing prisma.tools.findMany...');
    const tools = await prisma.tools.findMany({ take: 3 });
    console.log('✅ Success! Found tools:', tools.length);
    tools.forEach(t => console.log('  -', t.name, `(${t.slug})`));
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

test();