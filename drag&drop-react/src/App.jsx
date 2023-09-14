import { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import User from "./user";

function App() {
  const [people, setPeople] = useState([
    { name: "Max", id: 1 },
    { name: "Manu", id: 2 },
    { name: "Stephanie", id: 3 },
  ]);
  const handleEndDrag = (e) => {
    const { active, over } = e;
    console.log(active.id, over.id);
    /* const newOrder = arrayMove(people,oldIndex,newIndex); */
    setPeople((people) => {
      const oldIndex = people.findIndex((person) => person.id === active.id);
      const newIndex = people.findIndex((person) => person.id === over.id);
      return arrayMove(people, oldIndex, newIndex);
    });
  };
  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleEndDrag}>
      <main className="bg-slate-700 text-white h-screen flex justify-center items-center">
        <div className="p-8 border rounded-md bg-slate-200 text-black w-1/2 max-w-[600px]">
          <h1 className="text-2xl font-bold border-b-2 border-black">
            Users List
          </h1>
          <SortableContext
            items={people}
            strategy={verticalListSortingStrategy}
          >
            {people.map((user) => (
              <User key={user.id} user={user} />
            ))}
          </SortableContext>
        </div>
      </main>
    </DndContext>
  );
}

export default App;
