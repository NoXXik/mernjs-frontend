import {useEffect, useState} from "react";

export const useValidation = (value: string, validations: any) => {
    const [error, setError] = useState('')
    const [isError, setIsError] = useState(false)
    const [isActiveInput, setIsActiveInput] = useState(false)

    useEffect(() => {
        for (const validation in validations) {
            if (validation === 'isEmpty') {
                if (!value) {
                    setError('Поле не может быть пустым')
                    setIsError(true)
                    break
                } else {
                    setError('')
                    setIsError(false)
                }
            }
            if (validation === 'minLenght') {
                if (value.length < validations[validation]) {
                    setError('Поле недостаточной длины')
                    setIsError(true)
                    break
                } else {
                    setError('')
                    setIsError(false)
                }
            }
            if (validation === 'isEmail') {
                const re = /[a-z0-9!#$%&*/?^]+(?:\.[a-z0-9!#$%&*/?^]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
                if (!re.test(value.toLowerCase())) {
                    setError('Почта не действительна')
                    setIsError(true)
                    break
                } else {
                    setError('')
                    setIsError(false)
                }
            }
            if (validation === 'isPassword') {
                console.log("isPassword")
                // const re = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&?"])[a-zA-Z0-9!#$%&?]$/;
                const re = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z!#$%&?]).*$/
                if (!re.test(value)) {
                    setError(`Пороль должен содержать:\n - не менее ${validations['minLenght']} символов;\n - не более ${validations['maxLenght']} символов\n - хотябы одну заглавную букву (A-Z)\n - хотябы один специальный символ (!#$%&*/?^)`)
                    setIsError(true)
                    console.log("password error")
                    break
                } else {
                    setError('')
                    setIsError(false)
                }

            }
            if (validation === 'maxLenght') {
                if (value.length > validations[validation]) {
                    setError('Поле недостаточной длины')
                    setIsError(true)
                    break
                } else {
                    setError('')
                    setIsError(false)
                }
            }
            if (validation === 'confirmPassword') {
                console.log("confpass", validations[validation])
                if (!(value === validations[validation])) {
                    setError('Пороли не совпадают')
                    setIsError(true)
                    break
                } else {
                    setError('')
                    setIsError(false)
                }
            }
        }
    }, [value])

    useEffect(() => {
        if (isError) {
            setIsActiveInput(false)
        } else {
            setIsActiveInput(true)
        }
    }, [isError])

    return {isError, error, isActiveInput}
}
