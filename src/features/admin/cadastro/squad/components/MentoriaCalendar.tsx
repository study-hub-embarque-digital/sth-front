import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import axios from "axios";
import { EncontroModal } from "./EncontroModal";

type Encontro = {
  id: string;
  data: string; // ISO format
  horario?: string;
  linkReuniao?: string;
  plataforma?: string;
};

type Props = {
  mentoriaId: string;
};

export const MentoriaCalendar: React.FC<Props> = ({ mentoriaId }) => {
  const [encontros, setEncontros] = useState<Encontro[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    axios.get(`/api/mentorias/${mentoriaId}`)
      .then(res => setEncontros(res.data.encontros))
      .catch(err => console.error(err));
  }, [mentoriaId]);

  const today = new Date();
  const start = startOfMonth(today);
  const end = endOfMonth(today);

  const daysInMonth = eachDayOfInterval({ start, end });

  const handleDayClick = (date: Date) => {
    const isoDate = format(date, "yyyy-MM-dd");
    setSelectedDate(isoDate);
    setModalOpen(true);
  };

  const isEncontro = (date: Date) => {
    return encontros.some(encontro => isSameDay(new Date(encontro.data), date));
  };

  return (
    <div>
      <h2 className="text-xl mb-4">Encontros de Mentoria</h2>
      <div className="grid grid-cols-7 gap-2 text-center">
        {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map(dia => (
          <div key={dia} className="font-bold text-purple-700">{dia}</div>
        ))}

        {daysInMonth.map(date => {
          const isMarked = isEncontro(date);
          return (
            <div
              key={date.toString()}
              className={`rounded-full p-2 cursor-pointer ${
                isMarked ? "bg-purple-700 text-white" : "hover:bg-purple-100"
              }`}
              onClick={() => handleDayClick(date)}
            >
              {date.getDate()}
            </div>
          );
        })}
      </div>

      {modalOpen && selectedDate && (
        <EncontroModal
          date={selectedDate}
          onClose={() => {
            setModalOpen(false);
            setSelectedDate(null);
          }}
          mentoriaId={mentoriaId}
        />
      )}
    </div>
  );
};
