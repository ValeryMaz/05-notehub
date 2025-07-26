import axios from "axios";
import type { Note, NewNoteAddData } from "../types/note";

export interface NoteType {
  notes: Note[];
  totalPages: number;
}
interface DeleteNote {
  id: number;
}

export async function fetchNotes(
  page: number,
  perPage: number,
  query: string
): Promise<NoteType> {
  const params: Record<string, string> = {
    page: String(page),
    perPage: String(perPage),
  };

  if (query.trim()) {
    params.search = query.trim();
  }

  const response = await axios.get<NoteType>(
    "https://notehub-public.goit.study/api/notes",
    {
      params,
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
      },
    }
  );
  return response.data;
}

export async function addNote(noteData: NewNoteAddData): Promise<Note> {
  const response = await axios.post<Note>(
    "https://notehub-public.goit.study/api/notes",
    noteData,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
      },
    }
  );
  return response.data;
}

export async function deleteNote(id: DeleteNote): Promise<Note> {
  const response = await axios.delete<Note>(
    `https://notehub-public.goit.study/api/notes/${id}`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
      },
    }
  );
  return response.data;
}
