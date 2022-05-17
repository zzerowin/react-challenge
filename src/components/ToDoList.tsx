import { useRecoilState, useRecoilValue } from "recoil";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { ModalActive, toDoState } from "../atoms";
import ToDoBoard from "./ToDoBoard";
import styled from "styled-components";
import AddToDo from "./AddToDo";
import AddCategory from "./AddCategory";
import Modal from "./Modal";

const Title = styled.div`
	width: 100%;
	height: 48px;
	font-size: 32px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 32px 0px 32px 0px;
	color: ${({ theme }) => theme.textColor};
`;

const Window = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
`;

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	margin: 48px auto;
	max-width: 720px;
`;

const Board = styled.div`
	display: grid;
	width: 100%;
	gap: 32px;
	grid-template-columns: repeat(3, 1fr);
	border-radius: 8px;
	justify-items: center;
`;

function ToDoList() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const modalActive = useRecoilValue(ModalActive);

  const onDragEnd = ({ destination, draggableId, source }: DropResult) => {
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      setToDos((oldToDos) => {
        let copiedToDos = JSON.parse(
          JSON.stringify(oldToDos[source.droppableId])
        );
        let tempSave = copiedToDos[source.index];
        copiedToDos.splice(source.index, 1);
        copiedToDos.splice(destination.index, 0, tempSave);
        return {
          ...oldToDos,
          [source.droppableId]: copiedToDos,
        };
      });
    }
    if (destination?.droppableId !== source.droppableId) {
      setToDos((oldToDos) => {
        let desCopy = JSON.parse(
          JSON.stringify(oldToDos[destination.droppableId])
        );
        let sourceCopy = JSON.parse(
          JSON.stringify(oldToDos[source.droppableId])
        );
        let tempSave = sourceCopy[source.index];
        sourceCopy.splice(source.index, 1);
        desCopy.splice(destination.index, 0, tempSave);
        return {
          ...oldToDos,
          [destination.droppableId]: desCopy,
          [source.droppableId]: sourceCopy,
        };
      });
    }
  };
  return (
    <Window>
      {modalActive && <Modal visible={modalActive} />}
      <Title>ToDoList</Title>
      <AddToDo />
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Board>
            {Object.entries(toDos).map(([key, value]) => (
              <ToDoBoard
                key={key}
                toDos={value}
                droppableId={key}
              />
            ))}
            <AddCategory />
          </Board>
        </Wrapper>
      </DragDropContext>
    </Window>
  );
}

export default ToDoList;
