export interface Note {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  tag: string;
  content: string;
}

export interface NewNoteAddData {
  title: string;
  content?: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}

export interface DeleteNote {
  id: number;
}
