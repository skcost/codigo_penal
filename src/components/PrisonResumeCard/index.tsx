import React, {Dispatch, SetStateAction, useState, useEffect} from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { Crime } from '../../interfaces/crime';
import { DiscountCalculator } from '../../DiscountsCalculator/DiscountCalculator';
import CustomAlert from '../Alert';

import './styles.css';

interface PrisonResumeCardProps {
    crimes: Crime[]
    isFisrtOffender: boolean
    confessed: boolean
    colabored: boolean
    setCrimes: Dispatch<SetStateAction<Crime[]>>;
    setIsFisrtOffender: Dispatch<SetStateAction<boolean>>;
    setColabored: Dispatch<SetStateAction<boolean>>;
    setConfessed: Dispatch<SetStateAction<boolean>>;
}

const PrisonResumeCard = ({
    crimes,
    isFisrtOffender,
    confessed,
    colabored,
    setCrimes,
    setIsFisrtOffender,
    setConfessed,
    setColabored
}: PrisonResumeCardProps) => {
    const [dioalogOpen, setDialogOpen] = useState<boolean>(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
    const [prisonersName, setPrisonersName] = useState<string>('');
    const [prisonersPassaport, setPrisonersPassaport] = useState<string>('');

	useEffect(() => {
		if (showSuccessAlert) {
			setTimeout(() => {
				setShowSuccessAlert(!showSuccessAlert)
			}, 4000);
		}
	}, [showSuccessAlert]);

    const INITAL_TRAFFIC_TICKET = 20000;

    const handleExportPrisonersData = async () => {
        if (!prisonersName || !prisonersPassaport) {
            return;
        }

        const textToClipboard = `
            Prisioneiro: ${prisonersName},
            Passaporte: ${prisonersPassaport},
            Total da pena: ${resolveMonths()} meses,
            Total de multa: ${(resolveTrafficTicket()! + INITAL_TRAFFIC_TICKET).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})},
            Prisão feita por:
            Policiais envolvidos:
        `;

        await navigator.clipboard.writeText(textToClipboard);

		setShowSuccessAlert(!showSuccessAlert);
        resetAll();
    }

    const resetAll = (): void => {
        setColabored(false);
        setConfessed(false);
        setIsFisrtOffender(false);
        setCrimes([]);
        setDialogOpen(!dioalogOpen);
    }

    const resolveTrafficTicket = (): number | undefined => {
        const totalTrafficTicket = crimes.reduce((acumulador, numero) => acumulador + numero.trafficTicket, 0) + INITAL_TRAFFIC_TICKET;

        const  discountCalulator = new DiscountCalculator();
        return discountCalulator.calculateDiscount(totalTrafficTicket, isFisrtOffender, confessed, colabored);
    }

    const resolveMonths = (): number => crimes.reduce(
			(acumulador, numero) => acumulador + numero.months, 0
	);

    return (
        <>
			{showSuccessAlert && <CustomAlert message="Dados exportados com sucesso!" type="success" className="prisonResumeSuccessAlert"/>}
            <Box className="featherDescriptionCard" sx={{ minWidth: 275 }}>
                <Card variant="outlined">
                    <CardContent>
                        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                            Resumo da prisão
                        </Typography>

                        <Typography variant="h5" component="div">
                            Tempo total da pena: {resolveMonths()} meses
                        </Typography>

                        <Typography variant="h5">
                            Total de multa: {resolveTrafficTicket()!.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
                        </Typography>
                    </CardContent>

                    <CardActions>
                        <Button onClick={() => setDialogOpen(!dioalogOpen)} size="small">Exportar dados</Button>
                    </CardActions>
                </Card>
            </Box>

            <Dialog open={dioalogOpen}>
                <DialogTitle>Exportar dados do réu</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Ao cliar em "EXPORTAR DADOS", os dados do réu será copiado para sua
                        área de transferência. Cole essas informaçoes no e-mail da policia.
                        Parabéns pela prisão, Steve. A prefeitura agradece!
                    </DialogContentText>

                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nome do réu"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={prisonersName}
                        onChange={e => setPrisonersName(e.target.value)}
                        required
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="passaport"
                        label="Passaporte do réu"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={prisonersPassaport}
                        onChange={e => setPrisonersPassaport(e.target.value)}
                        required
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setDialogOpen(!dioalogOpen)}>Fechar</Button>
                    <Button disabled={!prisonersName || !prisonersPassaport} onClick={handleExportPrisonersData}>Exportar dados</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default PrisonResumeCard;