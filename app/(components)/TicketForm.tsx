"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { TicketType } from "../(types)/type";

interface TicketFormProps {
  ticket: TicketType;
}

const TicketForm = ({ ticket }: TicketFormProps) => {
  const EDITMODE = ticket._id === "new" ? false : true;
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { value, name } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (EDITMODE) {
      const res = await fetch(`/api/Tickets/${ticket._id}`, {
        method: "PUT",
        body: JSON.stringify({ formData }),
      });

      if (!res.ok) throw new Error("Failed to Update Ticket.");
    } else {
      const res = await fetch("/api/Tickets", {
        method: "POST",
        body: JSON.stringify({ formData }),
      });

      if (!res.ok) throw new Error("Failed to create Ticket.");
    }

    router.refresh();
    router.push("/");
  };

  const startingTicketData = {
    title: "",
    description: "",
    priority: 1,
    progress: 0,
    status: "not started",
    category: "하드웨어 문제",
  };

  if (EDITMODE) {
    startingTicketData["title"] = ticket.title;
    startingTicketData["description"] = ticket.description;
    startingTicketData["priority"] = ticket.priority;
    startingTicketData["progress"] = ticket.progress;
    startingTicketData["status"] = ticket.status;
    startingTicketData["category"] = ticket.category;
  }

  const [formData, setFormData] = useState(startingTicketData);

  return (
    <div className="flex justify-center">
      <form
        className="flex flex-col gap-3 w-1/2"
        method="post"
        onSubmit={handleSubmit}
      >
        <h3 className="">
          {EDITMODE ? "티켓을 수정해주세요" : "티켓을 생성해주세요"}😁
        </h3>
        <label>티켓명</label>
        <input
          type="text"
          id="title"
          name="title"
          onChange={handleChange}
          required={true}
          value={formData.title}
        />
        <label>티켓설명</label>
        <textarea
          id="description"
          name="description"
          onChange={handleChange}
          required={true}
          value={formData.description}
          rows={5}
        />

        <label>카테고리</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="하드웨어 문제">하드웨어 문제</option>
          <option value="소프트웨어 문제">소프트웨어 문제</option>
          <option value="프로젝트 문제">프로젝트 문제</option>
        </select>

        <label>우선순위</label>
        <div>
          <input
            type="radio"
            id="riority-1"
            name="priority"
            onChange={handleChange}
            value={1}
            checked={formData.priority == 1}
          />
          <label htmlFor="">1</label>
          <input
            type="radio"
            id="riority-2"
            name="priority"
            onChange={handleChange}
            value={2}
            checked={formData.priority == 2}
          />
          <label htmlFor="">2</label>
          <input
            type="radio"
            id="riority-3"
            name="priority"
            onChange={handleChange}
            value={3}
            checked={formData.priority == 3}
          />
          <label htmlFor="">3</label>
          <input
            type="radio"
            id="riority-4"
            name="priority"
            onChange={handleChange}
            value={4}
            checked={formData.priority == 4}
          />
          <label htmlFor="">4</label>
          <input
            type="radio"
            id="riority-5"
            name="priority"
            onChange={handleChange}
            value={5}
            checked={formData.priority == 5}
          />
          <label htmlFor="">5</label>
        </div>
        <label htmlFor="">진행도</label>
        <input
          type="range"
          id="progress"
          name="progress"
          value={formData.progress}
          min={0}
          max={100}
          onChange={handleChange}
        />
        <label>진행상태</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="작업 전">작업 전</option>
          <option value="작업 진행">작업 진행</option>
          <option value="작업 완료">작업 완료</option>
        </select>
        <input
          type="submit"
          className="btn text-white"
          value={EDITMODE ? "티켓 수정하기" : "티켓 생성하기"}
        />
      </form>
    </div>
  );
};

export default TicketForm;
