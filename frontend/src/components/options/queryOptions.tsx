import {
    Card,
    CardContent,
    TextField,
    Typography,
    Button,
    IconButton,
    Box,
    Tabs,
    Tab,
    FormControl, Select, MenuItem
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import theme from "@/theme";
import { ChangeEvent, useState, SyntheticEvent } from "react";

interface QueryOptionsProps {
    queries: string[];
    setQueries: (queries: string[]) => void;
    keyword: string;
    setKeyword: (keyword: string) => void;
    constraints: string[],
    setConstraints: (constraints: string[]) => void;
}

export const QueryOptions = ({ queries, setQueries, keyword, setKeyword, constraints, setConstraints }: QueryOptionsProps) => {
    const [tabValue, setTabValue] = useState(0);

    const handleQueryChange = (index: number, value: string) => {
        const newQueries = [...queries];
        newQueries[index] = value;
        setQueries(newQueries);
        setKeyword("")
    };

    const addQueryField = () => {
        setQueries([...queries, '']);
        setConstraints([...constraints, 'AND']); // Initialize with a default value
    };

    const removeQueryField = (index: number) => {
        const newQueries = queries.filter((_, i) => i !== index);
        const newConstraints = constraints.filter((_, i) => i !== index - 1);
        setQueries(newQueries);
        setConstraints(newConstraints);
    };

    const handleTabChange = (event: SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleBooleanConstraintChange = (index: number, value: string) =>{
        const newConstraints = [...constraints];
        newConstraints[index] = value;
        setConstraints(newConstraints)
    }

    const handleKeywordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setKeyword(event.target.value);
        if (event.target.value) {
            setQueries(['']);
        }
    };

    return (
        <Card sx={{ bgcolor: 'white', borderColor: theme.palette.primary.main, borderWidth: 1, borderStyle: 'solid', mt: 2, boxShadow: 3 }}>
            <CardContent>
                <Typography variant="h6" component="div" sx={{ mt: 2 }}>
                    Search Options
                </Typography>
                <Tabs value={tabValue} onChange={handleTabChange} centered>
                    <Tab label="Query" />
                    <Tab label="Keyword" />
                </Tabs>
                {tabValue === 0 && (
                    <>
                        {queries.map((query, index) => (
                            <Box key={index} sx={{ mt: 2 }}>
                                {index > 0 && queries.length > 1 && (
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <FormControl sx={{ flexGrow: 1}}>
                                            <Select sx={{  width: "15%", margin: 'auto' }}
                                                    labelId="demo-simple-select-standard-label"
                                                    value={constraints[index - 1] || 'AND'} // Ensure value is always defined
                                                    onChange={(e) => handleBooleanConstraintChange(index - 1, e.target.value)}
                                                    displayEmpty
                                            >
                                                <MenuItem value={'AND'}>AND</MenuItem>
                                                <MenuItem value={'OR'}>OR</MenuItem>
                                                <MenuItem value={'NOT'}>NOT</MenuItem>
                                                <MenuItem value={'NEAR'}>NEAR</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                )}
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <TextField
                                        required
                                        label={`Search query ${index + 1}`}
                                        value={query}
                                        onChange={(e) => handleQueryChange(index, e.target.value)}
                                        sx={{ flexGrow: 1 }}
                                    />
                                    <IconButton onClick={() => removeQueryField(index)} sx={{ ml: 2 }}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                        ))}
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddIcon />}
                            onClick={addQueryField}
                            sx={{ mt: 2 }}
                        >
                            Add Query
                        </Button>

                    </>
                )}
                {tabValue === 1 && (
                    <TextField
                        required
                        label="Keyword"
                        value={keyword}
                        onChange={handleKeywordChange}
                        sx={{ mt: 2, ml: 2 , width: '97%' }}
                    />
                )}
            </CardContent>
        </Card>
    );
};
