import { useForm } from "react-hook-form";
import { CreateCategory, toDoState } from "../atoms";
import styled from "styled-components";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useEffect, useRef } from "react";

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	border-radius: 6px;
	background-color: ${(props) => props.theme.bgColor};
`;

const Form = styled.form`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const Input = styled.input`
	width: 80%;
	height: 24px;
`;

const Button = styled.button`
	width: 48px;
	height: 48px;
	border-radius: 50%;
	font-size: 24px;
	border: 1px solid;
	color: ${({ theme }) => theme.dominantColor};
	background-color: white;
`;

interface ICategory {
	category: string;
}

function AddCategory() {
	const setToDo = useSetRecoilState(toDoState);
	const [createCategory, SetCreateCategory] = useRecoilState(CreateCategory);
	const categoryRef = useRef<HTMLInputElement | null>(null);
	const onValid: React.FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();
		const category = event.currentTarget.category.value;
		setToDo((oldToDo) => {
			return {
				...oldToDo,
				[category]: [],
			};
		});
		event.currentTarget.category.value = "";
		SetCreateCategory(false);
	};
	useEffect(() => {
		categoryRef.current?.focus();
	}, [createCategory]);
	const onClick = () => {
		SetCreateCategory(true);
	};
	return (
		<Wrapper>
			{createCategory ? (
				<Form onSubmit={onValid}>
					<Input
						name="category"
						required
						type="text"
						placeholder="Create Category"
						onBlur={() => SetCreateCategory(false)}
						ref={categoryRef}
					/>
				</Form>
			) : (
				<Button onClick={onClick}>+</Button>
			)}
		</Wrapper>
	);
}

export default AddCategory;
