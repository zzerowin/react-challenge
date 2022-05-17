import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ModalActive, SelectedId, toDoState } from "../atoms";

interface IModalProps {
	visible: boolean;
}

const ModalContainer = styled.div<IModalProps>`
	box-sizing: border-box;
	display: ${(props) => (props.visible ? "block" : "none")};
	position: fixed;
	top: 0px;
	left: 0px;
	width: 100%;
	height: 100%;
	z-index: 1000;
`;

const ModalOverlay = styled.div<IModalProps>`
	box-sizing: border-box;
	position: fixed;
	top: 0px;
	left: 0px;
	width: 100%;
	height: 100%;
	display: ${(props) => (props.visible ? "block" : "none")};
	background-color: rgba(0, 0, 0, 0.4);
	z-index: 999;
`;

const ModalContent = styled.div`
	position: relative;
	box-sizing: border-box;
	box-shadow: 0px 0px 12px 8px rbga(0, 0, 0, 0.4);
	border-radius: 8px;
	width: 480px;
	max-width: 480px;
	height: 320px;
	top: 50%;
	left: 50%;
	transform: translateY(-50%) translateX(-50%);
	padding: 32px 16px;
	background-color: white;
`;

const CloseButton = styled.button`
	position: absolute;
	top: 8px;
	right: 8px;
	width: 32px;
	height: 32px;
	border: none;
	font-size: 20px;
	background-color: transparent;
`;

const Warning = styled.div`
	padding-top: 64px;
	font-size: 24px;
	fonw-weignt: bold;
	text-align: center;
`;

const Yes = styled.button`
	width: 160px;
	height: 64px;
	border-radius: 24px;
	font-size: 24px;
	background-color: #39e37c;
	color: white;
	border: none;
	position: absolute;
	bottom: 32px;
	left: 64px;
`;

const No = styled(Yes)`
	background-color: #ff4d4d;
	left: unset;
	right: 64px;
`;

interface IModal {
	visible: boolean;
}

function Modal({ visible }: IModal) {
	const setToDos = useSetRecoilState(toDoState);
	const setModalActive = useSetRecoilState(ModalActive);
	const [DroppbleId, SetDroppableId] = useRecoilState(SelectedId);

	const clickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
		if (event.target === event.currentTarget) {
			SetDroppableId("");
			setModalActive(false);
		}
	};
	const clickYesButton = () => {
		setToDos((oldToDos) => {
			let copiedToDos = JSON.parse(JSON.stringify(oldToDos));
			delete copiedToDos[DroppbleId];
			return copiedToDos;
		});
		SetDroppableId("");
		setModalActive(false);
	};

	const clickXButton = () => {
		SetDroppableId("");
		setModalActive(false);
	};

	useEffect(() => {
		if (visible) {
			document.body.style.overflow = "hidden";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [visible]);

	return (
		<>
			<ModalOverlay visible={visible} />
			<ModalContainer
				onClick={clickOutside}
				tabIndex={-1}
				visible={visible}
			>
				<ModalContent>
					<CloseButton onClick={clickXButton}>X</CloseButton>
					<Warning>
						This category contains one or more items. Are you sure
						you want to delete it?
					</Warning>
					<Yes onClick={clickYesButton}>Yes</Yes>
					<No onClick={clickXButton}>No</No>
				</ModalContent>
			</ModalContainer>
		</>
	);
}

export default Modal;
