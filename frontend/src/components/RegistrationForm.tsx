import styled from "styled-components";
import { useForm } from "react-hook-form";
import { IRegisterFields } from "../types/Register.interface";
import { Link } from "react-router-dom";
import { fetchRegister } from "../api/fetchRegister";

const RegistrationFormContainer = styled.form`
    display: flex;
    flex-direction: column;
    width: 400px;
    height: 500px;
    padding: 10px;
    border-radius: 6px;
    overlow: hidden;
    background-color: gray;
    gap: 10px;

    h1 {
        text-align: center;
    }
`;

const Input = styled.input`
    border-radius: 4px;
    border: 1px solid black;
    margin: 20px;
    padding: 4px;
    cursor: pointer;
`;

const Error = styled.span`
    color: red;
`;

export function RegistrationForm(): JSX.Element {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IRegisterFields>();

    const onSubmit = (data: IRegisterFields) => {
        fetchRegister(data);
    };

    return (
        <RegistrationFormContainer onSubmit={handleSubmit(onSubmit)}>
            <h1>Registration</h1>
            <label htmlFor="email">Email:</label>
            <Input
                type="email"
                id="email"
                {...register("email", {
                    required: "Email is required",
                    minLength: {
                        value: 7,
                        message: "Email must be at least 7 characters long",
                    },
                    pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email format",
                    },
                })}
            />
            {errors.email && <Error>{errors.email.message}</Error>}

            <label htmlFor="password">Password:</label>
            <Input
                type="password"
                id="password"
                {...register("password", {
                    required: "Password is required",
                    minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters long",
                    },
                })}
            />
            {errors.password && <Error>{errors.password.message}</Error>}

            <Input type="submit" value="Register" />
            <Link to="/login">Go to Login</Link>
        </RegistrationFormContainer>
    );
}