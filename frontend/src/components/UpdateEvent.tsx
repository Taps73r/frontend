import { Dispatch, SetStateAction } from "react";
import { IEvent } from "../types/Event.interface";
import { UpdateEventContainer } from "../styles/UpdateEvent.styles";
import { useForm } from "react-hook-form";
import { IModal } from "../types/Modal.interface";
import { updateEvent } from "../api/updateEvent";
import {
    ButtonSend,
    Date,
    Header,
    Input,
    ModalBg,
    Select,
    Textarea,
} from "../styles/Modal.styles";
import { InputError } from "./InputError";
import { ICalenderData } from "../types/Calender.interface";

interface UpdateEventProps {
    eventData?: IEvent;
    setUpdateEvent: Dispatch<SetStateAction<boolean>>;
    calenderData: ICalenderData | null;
    setCalenderData: Dispatch<SetStateAction<ICalenderData | null>>;
}

export function UpdateEvent({
    eventData,
    setUpdateEvent,
    calenderData,
    setCalenderData,
}: UpdateEventProps): JSX.Element {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IModal>();

    const onSubmit = (data: IModal) => {
        const updatedEventData: IEvent = {
            id: eventData?.id,
            title: data.name,
            description: data.description,
            color: data.color,
            date: {
                year: eventData?.date.year,
                month: eventData?.date.month,
                day: eventData?.date.day,
                dayOfWeek: eventData?.date.dayOfWeek,
            },
        };
        updateEvent(updatedEventData, setCalenderData, calenderData);
        setUpdateEvent(false);
    };

    return (
        <>
            <UpdateEventContainer onSubmit={handleSubmit(onSubmit)}>
                <Date>
                    <p>{eventData?.date.day}</p>
                    <p>{eventData?.date.month}</p>
                    <p>{eventData?.date.year}</p>
                </Date>
                <Header>
                    <label>Update event</label>
                    <button onClick={() => setUpdateEvent(false)}>X</button>
                </Header>
                <Input
                    {...register("name", { required: "name is required" })}
                    type="text"
                    placeholder="Name"
                />
                {errors.name && (
                    <InputError errorMessage={errors.name.message} />
                )}
                <Select {...register("color")}>
                    <option value="red">Red</option>
                    <option value="blue">Blue</option>
                    <option value="green">Green</option>
                    <option value="yellow">Yellow</option>
                </Select>
                <Textarea
                    {...register("description")}
                    placeholder="Description"
                ></Textarea>
                <ButtonSend type="submit">Submit</ButtonSend>
            </UpdateEventContainer>
            <ModalBg onClick={() => setUpdateEvent(false)}></ModalBg>
        </>
    );
}
