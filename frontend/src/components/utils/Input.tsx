import React from "react"

type InputProps={
	placeholder:string,
	register:Function,
	type?:string,
	id?:string,
	required?:boolean,
	pattern?:RegExp

}
const capitalize=(word:string)=>{
	return word.charAt(0).toUpperCase() + word.slice(1);
}

const Input=({placeholder, register, type, id, required, pattern}:InputProps)=>(
		<>
			<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={placeholder}>{placeholder}</label>
			<input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type={type} {...register(placeholder, {required, pattern})} name={placeholder} placeholder={capitalize(placeholder)}/>

		</>
)

export default Input
