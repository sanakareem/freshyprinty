import fs from 'fs/promises';
import path from 'path';

class FileUtils {
  private static dataPath = path.join(__dirname, '../data/inventory.json');

  static async readInventory(): Promise<Record<string, any>> {
    try {
      const data = await fs.readFile(this.dataPath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      // If file doesn't exist, return empty inventory
      return {};
    }
  }

  static async writeInventory(data: Record<string, any>): Promise<void> {
    // Ensure directory exists
    await fs.mkdir(path.dirname(this.dataPath), { recursive: true });
    await fs.writeFile(this.dataPath, JSON.stringify(data, null, 2));
  }
}

export default FileUtils;