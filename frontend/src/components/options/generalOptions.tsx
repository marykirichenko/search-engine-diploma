import {
    Card,
    CardContent,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select, SelectChangeEvent,
    Switch,
    Typography
} from "@mui/material";
import theme from "@/theme";
import {DatePickerOptions} from "@/components/options/datePickerOptions";
import {ChangeEvent} from "react";


interface GeneralOptionsProps {
    literatureType: string;
    handleChange: (event: SelectChangeEvent) => void;
    exclude: boolean;
    handleExcludeChange: (event: ChangeEvent<string>) => void;
    dateRange: [Date | null, Date | null];
    setDateRange: (dateRange: [Date | null, Date | null]) => void;
    openAccess: boolean,
    setOpenAccess: () => void;
}

export const GeneralOptions = ({ literatureType, handleChange, dateRange, setDateRange, exclude, handleExcludeChange, openAccess, setOpenAccess }: GeneralOptionsProps) => {
    return (
        <>
            <FormControlLabel
                value="end"
                control={<Switch color="primary" checked={openAccess} onChange={setOpenAccess} />}
                label="Open Access"
                labelPlacement="end"
                sx={{ mt: 2 }}
            />
            <Card sx={{ bgcolor: 'white', borderColor: theme.palette.primary.main, borderWidth: 1, borderStyle: 'solid', mt: 2, boxShadow: 3 }}>

                <CardContent>
                    <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                        Filter by literature type:
                    </Typography>

                    <FormControl variant={"standard"} sx={{ width: '100%' }}>
                        <InputLabel>Literature type</InputLabel>
                        <br/>
                        <FormControlLabel
                            value="end"
                            control={<Switch color="primary" checked={exclude}
                                             onChange={handleExcludeChange} />}
                            label="Exclude"
                            labelPlacement="end"
                            sx={{ mb: 2 }}
                        />
                        <Select
                            labelId="demo-simple-select-standard-label"
                            value={literatureType}
                            onChange={handleChange}
                            label="Literature type"
                        >
                            {!exclude && <MenuItem value={'Both'}>Both</MenuItem>}
                            <MenuItem value={'Book'}>Book</MenuItem>
                            <MenuItem value={'Journal'}>Journal</MenuItem>
                        </Select>
                    </FormControl>
                </CardContent>
            </Card>
            <DatePickerOptions dateRange={dateRange} setDateRange={setDateRange}/>
        </>
    );
};