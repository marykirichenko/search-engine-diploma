import { Card, CardContent, TextField, Typography } from "@mui/material";
import theme from "@/theme";
import { ChangeEvent } from "react";

interface DatePickerOptionsProps {
    dateRange: [Date | null, Date | null];
    setDateRange: (dateRange: [Date | null, Date | null]) => void;
}

export const DatePickerOptions = ({ dateRange, setDateRange }: DatePickerOptionsProps) => {
    const [startDate, endDate] = dateRange;

    const handleStartDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newStartDate = event.target.value ? new Date(event.target.value) : null;
        setDateRange([newStartDate, endDate]);
    };

    const handleEndDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newEndDate = event.target.value ? new Date(event.target.value) : null;
        setDateRange([startDate, newEndDate]);
    };

    return (
        <Card sx={{ bgcolor: 'white', borderColor: theme.palette.primary.main, borderWidth: 1, borderStyle: 'solid', mt: 2, boxShadow: 3 }}>
            <CardContent>
                <Typography variant="h6" component="div" sx={{ mt: 2 }}>
                    Filter by publishing date:
                </Typography>
                <TextField
                    id="start-date"
                    label="From"
                    type="date"
                    value={startDate ? startDate.toISOString().split('T')[0] : ''}
                    onChange={handleStartDateChange}
                    sx={{ mt: 2, width: '48%' }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    id="end-date"
                    label="To"
                    type="date"
                    value={endDate ? endDate.toISOString().split('T')[0] : ''}
                    onChange={handleEndDateChange}
                    sx={{ mt: 2, width: '48%', ml: '4%' }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </CardContent>
        </Card>
    );
};
