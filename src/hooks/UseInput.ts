import {useState} from "react";
import {useValidation} from "./UseValidation";

export interface IValidation {
    isEmpty?: boolean;
    minLenght?: number;
    maxLenght?: number;
    isEmail?: boolean;
    isPassword?: boolean;
    confirmPassword?: string;
}

export const useInput = (initialValue: string, validations: IValidation) => {
    const [value, setValue] = useState(initialValue)
    const [isDirty, setDirty] = useState(false)
    const valid = useValidation(value, validations)

    const onChange = (event: any) => {
        setValue(event.target.value)
    }

    const onBlur = (event: any) => {
        setDirty(true)
    }

    return {value, isDirty, onChange, onBlur, ...valid}
}