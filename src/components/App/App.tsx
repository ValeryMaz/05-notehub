import css from "./App.module.css";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchNotes } from "../../services/noteService";
import type { NoteType } from "../../services/noteService";
import type { Note } from "../../types/note";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import { useState } from "react";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import SearchBox from "../SearchBox/SearchBox";
import { useDebounce } from "use-debounce";

function App() {
  const [currentPage, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState<string>("");
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const perPage = 10;
  const [debouncedSearchText] = useDebounce(searchText, 300);
  const { data, isSuccess, isLoading, error } = useQuery<NoteType>({
    queryKey: ["notes", perPage, currentPage, debouncedSearchText],
    queryFn: () => fetchNotes(currentPage, perPage, debouncedSearchText),
    placeholderData: keepPreviousData,
  });

  const handleSearchText = (newNote: string) => {
    setPage(1);
    setSearchText(newNote);
  };
  const notes: Note[] = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* Компонент SearchBox */}
        <SearchBox value={searchText} onSearch={handleSearchText} />
        {isSuccess && totalPages > 1 && (
          <Pagination
            total={totalPages}
            onChange={setPage}
            current={currentPage}
          />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>
      {isLoading && <p>Загрузка...</p>}
      {error && <p>Ошибка: {error.message}</p>}
      {isSuccess && notes.length === 0 && <p>Нет заметок</p>}
      {isSuccess && notes?.length > 0 && <NoteList notes={notes} />}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}

export default App;
