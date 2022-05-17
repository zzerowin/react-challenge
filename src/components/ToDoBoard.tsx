import { Droppable } from "react-beautiful-dnd";
import ToDoDrag from "./ToDoDrag";
import styled from "styled-components";
import { ModalActive, SelectedId, ToDo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";
import { useState } from "react";

interface IToDoWrapper {
	isDraggingOver: boolean;
	draggingFromThisWith: boolean;
}

const ToDoWrapper = styled.div<IToDoWrapper>`
	border-radius: 5px;
	margin: 12px 10px;
	text-color: ${(props) => props.theme.textColor};
	background-color: ${(props) => {
		return props.isDraggingOver
			? "#F88100"
			: props.draggingFromThisWith
			? "#2441B1"
			: "transparent";
	}};
	flex-grow: 1;
	transition: background-color 0.2s ease-in-out;
`;

const BoardWrapper = styled.div`
	width: 100%;
	background-color: ${(props) => props.theme.bgColor};
	border-radius: 6px;
	display: flex;
	flex-direction: column;
	position: relative;
`;

const Title = styled.div`
	margin: 12px 8px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-weight: bold;
	font-size: 18px;
	color: ${(props) => props.theme.textColor};
`;

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
	position: absolute;
	top: 8px;
	right: 8px;
`;

interface IToDoBoard {
	toDos: ToDo[];
	droppableId: string;
}

function ToDoBoard({ toDos, droppableId }: IToDoBoard) {
	const setToDos = useSetRecoilState(toDoState);
	const setModalActive = useSetRecoilState(ModalActive);
	const SetDroppableId = useSetRecoilState(SelectedId);
	const [isMouseEnter, setIsMouseEnter] = useState(false);

	const mouseEnterHandler = () => {
		setIsMouseEnter(true);
	};

	const mouseLeaveHandler = () => {
		setIsMouseEnter(false);
	};
	const onClick = () => {
		if (toDos.length > 0) {
			SetDroppableId(droppableId);
			setModalActive(true);
		} else {
			setToDos((oldToDos) => {
				let copiedToDos = JSON.parse(JSON.stringify(oldToDos));
				delete copiedToDos[droppableId];
				return copiedToDos;
			});
		}
	};

	return (
		<BoardWrapper
			onMouseEnter={mouseEnterHandler}
			onMouseLeave={mouseLeaveHandler}
		>
			<Title>{droppableId}</Title>
			{isMouseEnter && droppableId !== "ToDo" && (
				<DeleteButton onClick={onClick}>-</DeleteButton>
			)}
			<Droppable droppableId={droppableId}>
				{(provided, snapshot) => (
					<ToDoWrapper
						ref={provided.innerRef}
						{...provided.droppableProps}
						isDraggingOver={snapshot.isDraggingOver}
						draggingFromThisWith={Boolean(
							snapshot.draggingFromThisWith
						)}
					>
						{toDos.map((toDo, index) => (
							<ToDoDrag
								key={toDo.id}
								index={index}
								toDo={toDo.text}
								droppableId={droppableId}
							/>
						))}
						{provided.placeholder}
					</ToDoWrapper>
				)}
			</Droppable>
		</BoardWrapper>
	);
}

export default ToDoBoard;
