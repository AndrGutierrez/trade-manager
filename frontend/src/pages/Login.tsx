import React, { useState} from 'react';
import axios from "axios"
import { useForm } from 'react-hook-form';
import Input from 'components/utils/Input';
import Button from 'components/utils/Button';
import { useDispatch } from 'react-redux';
import { AppDispatch } from "store";
import { useNavigate } from 'react-router';
import { login } from 'slices/auth';
import Alert from 'components/utils/Alert';

export const loginRequest = async (data: Object) => {
	const PATH = `${process.env.REACT_APP_API_PATH}/auth/login`;
	const form = new FormData();
	Object.entries(data).forEach(([key, value]) => {
		form.append(key, value);
	})
	const response = await axios.post(PATH, form);
	return response;
};


export default function App() {
	const { register, handleSubmit, formState: { errors } } = useForm();
	const dispatch = useDispatch<AppDispatch>();
	const navigate= useNavigate()
  const [error, setError] = useState(true)
	
	// const onSubmit = handleSubmit((data) => dispatch(loginRequest(data)));
	const onSubmit = handleSubmit(async (data) => {
		const res = await loginRequest(data)
		if(res.status ==200) {
			dispatch(login(res.data));
			navigate("/portfolio")
		}
	});

	return (
		<div className="w-full flex flex-col items-center p-3">
      <div className="w-full sm:w-1/2 md:w-2/5 lg:w-1/4 xl:w-1/5">
        {error && <Alert type="error" />}
          <form onSubmit={onSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" >
            <Input placeholder='email' register={register} pattern={/^\S+@\S+$/i} required></Input>
            <Input placeholder='password' register={register} type="password" required></Input>
            <Button action={()=>dispatchEvent(new Event("submit"))} name="Login" type="submit"></Button>
          </form>
      </div>
		</div>
	);
}
