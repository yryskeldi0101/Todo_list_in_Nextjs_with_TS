"use client";
import React, { useState, FormEventHandler } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal";
import { addTodo } from "@/api/api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
const AddTask = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [mewTaskValue, setNewTaskValue] = useState<string>("");
  const hadleSubmitTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const data = {
      id: uuidv4(),
      text: mewTaskValue,
    };
    await addTodo(data);
    setNewTaskValue("");
    setModalOpen(false);
    router.refresh();
  };
  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className="btn btn-primary w-full"
      >
        Add new task <AiOutlinePlus className="ml-3" size={18} />
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={hadleSubmitTodo}>
          <h3 className="font-bold text-lg">Add new task</h3>
          <div className="modal-action">
            <input
              type="text"
              value={mewTaskValue}
              onChange={(e) => setNewTaskValue(e.target.value)}
              placeholder="Type here"
              className="input input-bordered w-full"
            />
            <button type="submit" className="btn">
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddTask;
