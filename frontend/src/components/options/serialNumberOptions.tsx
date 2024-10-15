import { useState } from "react";
import { TextField, Typography, Card, CardContent } from "@mui/material";
import theme from "@/theme";
import { useOptionsError } from "@/contexts/optionsErrorContext";

interface SearchOptionsProps {
    serialNumberType: string,
    serialNumber: string,
    setSerialNumber: (value: string) => void
}

export const SerialNumberOptions = ({ serialNumberType, serialNumber, setSerialNumber }: SearchOptionsProps) => {
    const [error, setError] = useState(false);
    const { validationErrors, setValidationErrors } = useOptionsError();

    const handleSerialNumberChange = (value: string) => {
        setSerialNumber(value);
        let isValid = false;

        if (serialNumberType === 'ISSN') {
            isValid = validateISSN(value);
            setError(!isValid);
            setValidationErrors((prev) => ({ ...prev, issn: isValid ? "" : "Error" }));
        } else if (serialNumberType === 'ISBN') {
            isValid = validateISBN(value);
            setError(!isValid);
            setValidationErrors((prev) => ({ ...prev, isbn: isValid ? "" : "Error" }));
        }

    };

    const validateISSN = (issn: string) => {
        const issnRegex = /^\d{4}-\d{3}[\dX]$/;
        return issnRegex.test(issn);
    };

    const validateISBN = (isbn: string) => {
        const isbnRegex = /^(978-)?[\d-]{10,13}$/;
        return isbnRegex.test(isbn);
    };


    return (
        <Card sx={{ bgcolor: 'white', borderColor: theme.palette.primary.main, borderWidth: 1, borderStyle: 'solid', mt: 2, boxShadow: 3 }}>
            <CardContent>
                <Typography variant="h6" component="div" sx={{ mt: 1, mb: 1 }}>
                    Filter by {serialNumberType}:
                </Typography>
                <TextField
                    label={`Set ${serialNumberType}`}
                    value={serialNumber}
                    onChange={(e) => handleSerialNumberChange(e.target.value)}
                    error={error}
                    helperText={error ? `Invalid ${serialNumberType} format` : ""}
                    sx={{ flexGrow: 1, width: '100%' }}
                />
            </CardContent>
        </Card>
    );
};
