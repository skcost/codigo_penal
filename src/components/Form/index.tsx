import React,  {Dispatch, SetStateAction, useState, useEffect } from 'react';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { Crime } from "../../interfaces/crime";

import { allCrimes } from '../../data/allCrimes';

import './style.css';
import CustomAlert from "../Alert";
import {Checkbox, FormControlLabel, FormGroup} from "@mui/material";

interface FormProps {
    setCrimes: Dispatch<SetStateAction<Crime[]>>
    crimes: Crime[]
    setIsFisrtOffender: Dispatch<SetStateAction<boolean>>
    isFisrtOffender: boolean
    setConfessed: Dispatch<SetStateAction<boolean>>
    confessed: boolean
    setColabored: Dispatch<SetStateAction<boolean>>
    colabored: boolean
}

interface AlertType {
    type: 'warning' | 'info' | 'error' | 'success';
    message: string;
    className?: string;
}

const Form = ({
    setCrimes,
    crimes,
    setIsFisrtOffender,
    isFisrtOffender,
    setConfessed,
    confessed,
    setColabored,
    colabored
}: FormProps) => {
    const [crime, setCrime] = useState('');
    const [alert, setAlert] = useState({} as AlertType);

    useEffect(() => {
        if (Object.keys(alert).length > 0) {
            setTimeout(() => {
                setAlert({} as AlertType);
            }, 4000);
        }
    }, [alert]);

    const handleChange = (event: SelectChangeEvent) => {
        setCrime(event.target.value);
        setAlert({} as AlertType);
    };

    const handleSubmit = () => {
        if (!crime) {
            setAlert({
                type: 'warning',
                message: 'Selecione um crime antes de enviar.'
            });
            return;
        }

        setCrimes([...crimes, JSON.parse(crime)]);
        setCrime('');
    };

    const availableCrimes = allCrimes.filter(allCrime => {
        return crimes.every(crime => allCrime.crime !== crime.crime);
    });

    return (
        <>
            {Object.keys(alert).length > 0 && (<CustomAlert type={alert.type} message={alert.message} className="formAlertWarning" />)}
            <form className="form">
                <FormControl className="formControl">
                    <InputLabel id="crimes">Crimes</InputLabel>
                    <Select
                        labelId="crimes"
                        id="crimes"
                        value={crime}
                        label="Crimes"
                        onChange={handleChange}
                    >
                        {availableCrimes.map(crime => (
                            <MenuItem
                                key={crime.crime}
                                value={JSON.stringify(crime)}
                            >
                                {crime.crime}
                            </MenuItem>
                        ))}
                    </Select>

                    <Button
                        onClick={handleSubmit}
                        color="primary"
                        type="button"
                        variant="contained"
                    >
                        Adicionar
                    </Button>
                </FormControl>

                <FormGroup className="formGroupCheckbox">
                    <FormControlLabel
                        control={<Checkbox checked={isFisrtOffender} onChange={() => setIsFisrtOffender(!isFisrtOffender)} />}
                        label="Réu primário? (-50%)"
                    />

                    <FormControlLabel
                        control={<Checkbox checked={confessed} onChange={() => setConfessed(!confessed)} />}
                        label="Confessou? (-30%)"
                    />

                    <FormControlLabel
                        control={<Checkbox checked={colabored} onChange={() => setColabored(!colabored)} />}
                        label="Colaborou? (-10%)"
                    />
                </FormGroup>
            </form>
        </>
    )
};

export default Form;