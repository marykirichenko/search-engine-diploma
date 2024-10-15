import { useState } from "react";
import {Box, TextField, Button, Typography, IconButton, Card, CardContent} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import theme from "@/theme";
import {useOptionsError} from "@/contexts/optionsErrorContext";

interface DOIOptionsProps {
    dois: string[];
    setDois: (dois: string[]) => void;
}
export const DOIOptions = ({dois, setDois}: DOIOptionsProps) => {

    const [errors, setErrors] = useState<boolean[]>([false]);
    const {setValidationErrors} = useOptionsError()

    const handleDOIChange = (index: number, value: string) => {
        const newDois = [...dois];
        newDois[index] = value;
        setDois(newDois);

        const newErrors = [...errors];
        newErrors[index] = !validateDOI(value);
        setErrors(newErrors);
        setValidationErrors((prev) => ({...prev, doi: newErrors.some((error) => error) ? "Invalid DOI format" : ""}));
    };

    const addDOIField = () => {
        setDois([...dois, '']);
        setErrors([...errors, false]);
    };

    const removeDOIField = (index: number) => {
        const newDois = dois.filter((_, i) => i !== index);
        const newErrors = errors.filter((_, i) => i !== index);
        setDois(newDois);
        setErrors(newErrors);
    };

    const validateDOI = (doi: string) => {
        const doiRegex = /^10.\d{4,9}\/[-._;()/:A-Z0-9]+$/i;
        return doiRegex.test(doi);
    };

    return (
        <Card sx={{ bgcolor: 'white', borderColor: theme.palette.primary.main, borderWidth: 1, borderStyle: 'solid', mt: 2, boxShadow: 3 }}>
            <CardContent>
                <Typography variant="h6" component="div" sx={{ mt: 2 }}>
                    Filter by DOI&#39;s:
                </Typography>
                {dois.map((doi, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                        <TextField
                            label={`DOI ${index + 1}`}
                            value={doi}
                            onChange={(e) => handleDOIChange(index, e.target.value)}
                            error={errors[index]}
                            helperText={errors[index] ? "Invalid DOI format" : ""}
                            sx={{ flexGrow: 1 }}
                        />
                        <IconButton onClick={() => removeDOIField(index)} sx={{ ml: 2 }}>
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                ))}
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={addDOIField}
                    sx={{ mt: 2 }}
                >
                    Add DOI
                </Button>
            </CardContent>
        </Card>
    );
};

