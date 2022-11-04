import { useState } from "react";

import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  TouchSensor,
  KeyboardSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis, restrictToWindowEdges } from "@dnd-kit/modifiers";

import CountryCard from "../CountryCard/CountryCard";

import styles from "./GroupSortingContainer.module.css";

const GroupSortingContainer = () => {
  const [countriesArr, setCountriesArr] = useState([
    { id: "1", name: "USA" },
    { id: "2", name: "Wales" },
    { id: "3", name: "England" },
    { id: "4", name: "Iran" },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = ({ active, over }) => {
    if (active.id !== over.id) {
      setCountriesArr((prevState) => {
        const oldIndex = prevState.findIndex(
          (country) => country.id === active.id
        );
        const newIndex = prevState.findIndex(
          (country) => country.id === over.id
        );
        return arrayMove(prevState, oldIndex, newIndex); 
      })
    }
  };

  return (
    <div className={styles["group-sorting-container"]}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
      >
        <SortableContext
          items={countriesArr.map((country) => country.id)}
          strategy={verticalListSortingStrategy}
        >
          {countriesArr.map((country) => {
            return <CountryCard {...country} key={country.id} />;
          })}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default GroupSortingContainer;
