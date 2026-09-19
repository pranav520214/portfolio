import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface NoteMetadata {
  slug: string;
  title: string;
  date: string;
  domain: string;
  status: string;
  question: string;
  observation: string;
  resolution: string;
}

export interface Note extends NoteMetadata {
  content: string;
}

const notesDirectory = path.join(process.cwd(), 'content/notes');

export function getAllNotes(): Note[] {
  if (!fs.existsSync(notesDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(notesDirectory);
  const notes = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(notesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);

      const lines = fileContents.split('\n');
      
      let title = '';
      let date = '';
      let domain = '';
      let status = '';
      let question = '';
      let observation = '';
      let resolution = '';

      let currentSection = '';

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.startsWith('# ')) {
          title = line.substring(2).trim();
        } else if (line.startsWith('- **Date**:')) {
          date = line.replace('- **Date**:', '').trim();
        } else if (line.startsWith('- **Domain**:')) {
          domain = line.replace('- **Domain**:', '').trim();
        } else if (line.startsWith('- **Status**:')) {
          status = line.replace('- **Status**:', '').trim();
        } else if (line.startsWith('## Question')) {
          currentSection = 'question';
        } else if (line.startsWith('## Observation')) {
          currentSection = 'observation';
        } else if (line.startsWith('## What Changed')) {
          currentSection = 'resolution';
        } else if (line && !line.startsWith('## ')) {
          if (currentSection === 'question') question += (question ? '\n' : '') + line;
          else if (currentSection === 'observation') observation += (observation ? '\n' : '') + line;
          else if (currentSection === 'resolution') resolution += (resolution ? '\n' : '') + line;
        }
      }
      
      return {
        slug,
        title,
        date,
        domain,
        status,
        question,
        observation,
        resolution,
        content: fileContents
      };
    });

  return notes;
}

export function getNoteBySlug(slug: string): Note | undefined {
  const notes = getAllNotes();
  return notes.find(note => note.slug === slug);
}
