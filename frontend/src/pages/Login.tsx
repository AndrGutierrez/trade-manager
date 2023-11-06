import React, {useEffect} from 'react';
import { useForm } from 'react-hook-form';
import Input from 'components/utils/Input';
import Button from 'components/utils/Button';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from "store";
import { loginRequest } from 'slices/auth';
import { useNavigate } from 'react-router';

export default function App() {
	const { register, handleSubmit, formState: { errors } } = useForm();
	const dispatch = useDispatch<AppDispatch>();
	const navigate= useNavigate()
	const login = useSelector((state: any) => state.auth);
	
	
	// const onSubmit = handleSubmit((data) => dispatch(loginRequest(data)));
	const onSubmit = handleSubmit(async (data) => {
		await dispatch(loginRequest(data));
	});
	useEffect(() => {
		console.log(login)
		// navigate("/portfolio")

	}, [login]);

	return (
		<div className="w-full flex justify-center p-3">
				<form onSubmit={onSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" >
			{
				/*
      <input type="text" placeholder="First name" {...register("First name", {required: true, maxLength: 80})} />
      <input type="text" placeholder="Last name" {...register("Last name", {required: true, maxLength: 100})} />
      <input type="text" placeholder="Email" {...register("Email", {required: true, pattern: /^\S+@\S+$/i})} />
      <input type="tel" placeholder="Mobile number" {...register("Mobile number", {required: true, minLength: 6, maxLength: 12})} />

      <input {...register("Developer", { required: true })} type="radio" value="Yes" />
      <input {...register("Developer", { required: true })} type="radio" value="No" />
				* */
			}

				<Input placeholder='email' register={register} pattern={/^\S+@\S+$/i} required></Input>
				<Input placeholder='password' register={register} type="password" required></Input>
				<Button action={()=>dispatchEvent(new Event("submit"))} name="Login" type="submit"></Button>
			</form>
		</div>
	);
}
