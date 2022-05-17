import { useForm, SubmitHandler } from "react-hook-form";
import { toDoState, ToDo } from "../atoms";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
`;

const Form = styled.form`
	width: 360px;
`;
const Input = styled.input`
	width: 100%;
	height: 24px;
`;

interface IForm {
	toDo: string;
}

function AddToDo() {
	const setToDo = useSetRecoilState(toDoState);
	const { register, setValue, handleSubmit } = useForm<IForm>();
	const onValid = ({ toDo }: IForm) => {
		const newToDo = {
			id: Date.now(),
			text: toDo,
		};
		setToDo((oldToDo) => {
			return {
				...oldToDo,
				ToDo: [...oldToDo["ToDo"], newToDo],
			};
		});
		setValue("toDo", "");
	};
	return (
		<Wrapper>
			<Form onSubmit={handleSubmit(onValid)}>
				<Input
					{...register("toDo", { required: true })}
					type="text"
					placeholder={"Add ToDo"}
				/>
			</Form>
		</Wrapper>
	);
}

export default AddToDo;
