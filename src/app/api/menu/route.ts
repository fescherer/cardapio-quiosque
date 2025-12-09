import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'src', 'data', 'db.json');

function readDB() {
  const data = fs.readFileSync(dbPath, 'utf-8');
  return JSON.parse(data);
}

function writeDB(data: string) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

export async function GET() {
  const db = readDB();
  return Response.json(db);
}

export async function POST(request: Request): Promise<Response> {
  const body = await request.json();
  const db = readDB();

  db.items.push(body);

  writeDB(db);

  return Response.json({ success: true });
}
