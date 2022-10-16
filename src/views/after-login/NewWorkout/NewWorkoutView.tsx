import CheckBox from "@/components/InputComponents/CheckBox/CheckBox";
import SingleInputField from "@/components/InputComponents/SingleInputField/SingleInputField";
import SubmitButton from "@/components/InputComponents/SubmitButton/SubmitButton";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Calendar from "@/components/Calendar/Calendar";

type Intensity = {
    hard: string,
    medium: string,
    easy: string,
};

type NewWorkoutPlanValues = {
    intensity: Intensity,
    excersise: string,
    muscleGroup: string,
    sets: number,
    rest: number,
    reps: number,
};

const NewWorkoutView = () => {
    const {
        formState,
        control,
        reset,
        handleSubmit
    } = useForm<NewWorkoutPlanValues>({
        mode: 'onChange',
        defaultValues:{
            
        }
    });

    
    const onSubmit: SubmitHandler<NewWorkoutPlanValues> = async (data, event) => {
        event?.preventDefault();
        console.log('submit fired');
        console.log(data);
    }
    
    return (
        <div>
            <form 
                onSubmit={handleSubmit(onSubmit)}
            >
                <p>when:</p>
                <Calendar 
                    isOpen={true}
                />
                <h1>Workout Plan:</h1>

                <SingleInputField<NewWorkoutPlanValues>
                    title="What day is it?"
                    placeholder="General Muscle group"
                    name="muscleGroup"
                    control={control}
                />
                <div>
                    <SingleInputField<NewWorkoutPlanValues>
                        placeholder="Excersise"
                        name="excersise"
                        control={control}
                    />
                    <div>
                        <h3>
                            Intensity
                        </h3>

                        <CheckBox
                            title="Hard"
                            control={control}
                            name="intensity"
                            type="radio"
                            value="hard"
                        />
                        <CheckBox
                            title="Medium"
                            control={control}
                            name="intensity"
                            type="radio"
                            value="medium"
                        />
                        <CheckBox
                            title="Easy"
                            control={control}
                            name="intensity"
                            type="radio"
                            value="easy"
                        />
                        {/* <label htmlFor="">
                        Hard
                        <input type="checkbox" placeholder="Hard" />
                    </label>

                    <label htmlFor="">
                        Medium
                        <input type="checkbox" placeholder="Medium" />
                    </label>

                    <label htmlFor="Easy">
                        Easy
                        <input id="Easy" type="checkbox" placeholder="Easy" />
                    </label> */}
                    </div>
                    <SingleInputField<NewWorkoutPlanValues>
                        placeholder="Sets"
                        name="sets"
                        control={control}
                    />
                    <SingleInputField<NewWorkoutPlanValues>
                        placeholder="Reps"
                        name="reps"
                        control={control}
                    />
                    <SingleInputField<NewWorkoutPlanValues>
                        placeholder="Rest in between sets"
                        name="rest"
                        control={control}
                    />
                    <button type="button">Add Excercise + </button>
                </div>

                <SubmitButton />

            </form>
            <div>display workout plan</div>

        </div>
    );
};

export default NewWorkoutView;