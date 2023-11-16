import React, {useEffect} from 'react';
import axios from "axios"
import { useForm } from 'react-hook-form';
import Input from 'components/utils/Input';
import Button from 'components/utils/Button';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from "store";
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

export const signupRequest = async (data: Object) => {
	const PATH = `${process.env.REACT_APP_API_PATH}/auth/register`;
	const form = new FormData();
	Object.entries(data).forEach(([key, value]) => {
		form.append(key, value);
	})
	const response = await axios.post(PATH, form);
	return response;
};


export default function App() {
	const { register, handleSubmit, formState: { errors } } = useForm();
	const navigate= useNavigate()
	
	
	const onSubmit = handleSubmit(async (data) => {
		const res = await signupRequest(data)
		if(res.status ==200) {
			navigate("/register/success")
		}
	});
	return (
		<div className="w-full flex flex-col sm:flex-row justify-center items-center p-3 min-h-">
			<div className="p-3 w-full sm:w-1/2 lg:w-1/3 xl:w-1/5 flex items-center">
				<div className='h-fit'>

					<h1 className="text-2xl sm:text-4xl md:text-5xl h-fit font-bold">
						Let's get started! 
						<div className='hidden sm:block h-0'>
							<br/>
						</div><br/>
					</h1>
					<h2 className='sm:text-2xl md:text-3xl font-light'>
						Create your account to access trademanager
					</h2>
				</div>
			</div>
			<form onSubmit={onSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full sm:w-1/2 lg:w-1/3 xl:w-1/5" >
				<Input placeholder='email' register={register} pattern={/^\S+@\S+$/i} required></Input>
				<Input placeholder='username' register={register} required></Input>
				<Input placeholder='password' register={register} type="password" required></Input>
				<Input placeholder='passwordConfirmation' register={register} type="password" required label="Password Confirmation"></Input>
				<Button action={()=>dispatchEvent(new Event("submit"))} name="Create account" type="submit"></Button>
				<div className='w-full'> Already have an account? <Link to="/login" className="underline text-cyan-500">Login</Link></div>
			</form>
		</div>
	);
}
