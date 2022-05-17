import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";

const DeleteButton = styled.div`
	width: 24px;
	height: 24px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
	font-size: 20px;
	color: white;
	background-color: #ff4d4d;
`;

const ToDo = styled.div<{ isDragging: boolean }>`
	background-color: ${(props) => (props.isDragging ? "#18A3EA" : "white")};
	min-height: 30px;
	border-radius: 5px;
	padding: 0 12px;
	margin-bottom: 5px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-shadow: ${(props) =>
		props.isDragging ? "3px 3px 5px rgba(0, 0, 0, 0.3)" : "none"};
`;

interface IToDoDrag {
	toDo: string;
	index: number;
	droppableId: string;
}

function ToDoDrag({ toDo, index, droppableId }: IToDoDrag) {
	const [isMouseEnter, setIsMouseEnter] = useState(false);
	const [toDos, setToDos] = useRecoilState(toDoState);

	const mouseEnterHandler = () => {
		setIsMouseEnter(true);
	};

	const mouseLeaveHandler = () => {
		setIsMouseEnter(false);
	};

	const onClick = () => {
		let copiedToDos = JSON.parse(JSON.stringify(toDos[droppableId]));
		copiedToDos.splice(index, 1);
		setToDos((oldToDos) => ({
			...oldToDos,
			[droppableId]: copiedToDos,
		}));
	};

	return (
		<Draggable key={toDo} draggableId={toDo} index={index}>
			{(provided, snapshot) => (
				<ToDo
					isDragging={snapshot.isDragging}
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					onMouseEnter={mouseEnterHandler}
					onMouseLeave={mouseLeaveHandler}
				>
					{toDo}
					{isMouseEnter ? (
						<DeleteButton onClick={onClick}>-</DeleteButton>
					) : null}
				</ToDo>
			)}
		</Draggable>
	);
}

export default React.memo(ToDoDrag);
