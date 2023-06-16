import {useContext} from "react";
import {Context} from "../Context/index.jsx";

export const useLogin = () => {
    const {IsAuth} = useContext(Context)
    const [user, setUser] = IsAuth;
    const auth = (name, password) => {
        if (!name || !password)
            return false
        const account = [
            {name: "Dima", password: "0000"},
            {name: "Taya", password: "1111"}
        ];
        for (let val of account) {
            if (name === val.name && password === val.password) {
                setUser({person: name, auth: true})
                if (!localStorage.getItem('auth'))
                    localStorage.setItem('auth', JSON.stringify({name: name, password: password}));
                return true
            }
        }
        return false
    }
    return [auth]
}